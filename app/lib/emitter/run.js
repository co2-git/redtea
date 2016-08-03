// @flow
import {EventEmitter} from 'events';
import Emitter from './is';
import * as EVENTS from './events';
import walk from '../walk';
import type {REPORT} from '../../config/types';

function assertEvent(
    emitter: Emitter,
    watcher: EventEmitter,
    observer: EventEmitter,
    event: string,
    eventsTriggered: string[],
    eventsNotTriggered: string[],
    done: Function,
  ) {
  const wait = ('wait' in emitter.assertions.emits[event])
    ? emitter.assertions.emits[event].wait : 2500;
  let timeout = setTimeout(() => {
    try {
      observer.emit(EVENTS.RESULT, emitter, {
        type: 'event',
        expected: event,
        that: null,
        valid: false,
        message:
          `event "${event}" never triggered after ${wait} milliseconds`,
      });
      eventsNotTriggered.push(event);
      done();
    } catch (error) {
      observer.emit(EVENTS.ERROR, emitter, error);
    }
  }, wait);
  watcher.on(event, (...messages: any[]) => {
    clearTimeout(timeout);
    observer.emit(EVENTS.START_EVENT, event, ...messages);
    if (Array.isArray(emitter.assertions.emits[event].messages)) {
      emitter.assertions.emits[event].messages
        .forEach((message: any, index: number) => {
          observer.emit(EVENTS.EVENT_MESSAGE, messages[index]);
          walk({
            that: messages[index],
            assertions: message,
            report: (report: REPORT) => {
              observer.emit(EVENTS.RESULT, emitter, report);
            },
          });
        });
    } else {
      messages.forEach((message: any) => {
        observer.emit(EVENTS.EVENT_MESSAGE, message);
        walk({
          that: message,
          assertions: emitter.assertions.emits[event].messages,
          report: (report: REPORT) => {
            observer.emit(EVENTS.RESULT, emitter, report);
          },
        });
      });
    }
    observer.emit(EVENTS.END_EVENT, event, ...messages);
    eventsTriggered.push(event);
    done();
  });
}

export default function runEmitter(
    emitter: Emitter,
    observer: EventEmitter
  ): Promise<void> {
  return new Promise((resolve: Function) => {
    try {
      const watcher = emitter.that();
      observer.emit(EVENTS.START, {
        ...emitter,
        that: watcher,
      });
      if (emitter.assertions.emits) {
        const expectedNumberOfEvents: number =
          Object.keys(emitter.assertions.emits).length;
        const eventsTriggered: string[] = [];
        const eventsNotTriggered: string[] = [];
        const done: Function = () => {
          if (
            (eventsTriggered.length + eventsNotTriggered.length)
              === expectedNumberOfEvents
          ) {
            observer.emit(EVENTS.END, emitter);
            resolve();
          }
        };
        for (const event in emitter.assertions.emits) {
          assertEvent(
            emitter,
            watcher,
            observer,
            event,
            eventsTriggered,
            eventsNotTriggered,
            done,
          );
        }
      }
    } catch (error) {
      console.log(error);
      observer.emit(EVENTS.ERROR, emitter, error);
    }
  });
}
