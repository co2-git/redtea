'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function it(label, story, options, id) {
  if (story === undefined) story = function () {};
  if (options === undefined) options = {};

  if (typeof label === 'function') {
    label()(it);
  } else {
    this.stories.push({ label: label, tell: story, options: options, id: id, parent: options.parent });
  }
}

it.pause = function (milliseconds) {
  return function () {
    return new Promise(function (ok) {
      return setTimeout(ok, milliseconds);
    });
  };
};

function describe(label, story) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var stories = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

  return new Promise(function (ok, ko) {
    var tab = options.tab || '';

    if (!('nested' in options)) {
      options.nested = true;
    }

    if (!('tab' in options)) {
      options.tab = '';
    }

    var tea = {
      label: label,
      options: options,
      stories: stories,
      tab: tab,
      tell: story,
      children: [],
      parent: options.parent,
      id: 0
    };

    stories.push(tea);

    // story((label, story, options = {}) => it(label, story, options, stories));

    run(stories).then(function (results) {
      ok(results);
    }, ko);
  });
}

function run(stories) {
  var id = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
  var stats = arguments.length <= 2 || arguments[2] === undefined ? { tests: 0, passed: 0, failed: 0, time: 0 } : arguments[2];

  return new Promise(function (ok, ko) {
    var index = undefined;

    var story = stories.reduce(function (nextInQueue, story, storyIndex) {
      if (!('status' in story) && !nextInQueue) {
        nextInQueue = story;
        index = storyIndex;
      }
      return nextInQueue;
    }, null);

    if (story) {
      new Promise(function (ok, ko) {
        try {
          // Suporting old array syntax
          if (Array.isArray(story.tell)) {
            story.tell = story.tell[0];
          }

          story.starts = Date.now();

          if (typeof story.tell !== 'function') {
            throw new Error('Story should be a function');
          }

          var test = story.tell(function (labelChild, storyChild) {
            var optionsChild = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            // console.log(`nesting "${story.id} ${story.label}"`.grey.italic);

            story.options.nested = true;

            return it.apply({ stories: stories }, [labelChild, storyChild, Object.assign({}, optionsChild, { tab: (story.tab || story.options.tab) + '|_'.grey }, { parent: story.id }), id++]);
          });

          if (test && test.then) {
            // console.log(`story "${story.label}" is a promise`.grey.italic);

            test.then(ok, ko);
          } else {
            ok();
          }
        } catch (error) {
          ko(error);
        }
      }).then(function () {

        story.ends = Date.now();

        var storiesBefore = undefined,
            storiesAfter = undefined,
            nestedStories = undefined;

        var end = Date.now() - story.starts;

        var time = undefined;

        if (end < 50) {
          time = ('(' + end.toString() + ' ms)').white;
        } else if (end < 250) {
          time = ('(' + end.toString() + ' ms)').yellow;
        } else {
          time = ('(' + end.toString() + ' ms)').red;
        }

        stats.time += end;

        if (!story.options.nested) {

          console.log('  ' + (story.tab || story.options.tab) + '✔'.green.bold + ' ' + story.label.grey + ' ' + time);
        } else {
          (function () {

            var pos = stories.reduce(function (pos, _story, index) {
              if (_story.id === story.id) {
                pos = index;
              }
              return pos;
            }, 0);

            storiesBefore = stories.filter(function (s, i) {
              return i <= pos;
            }), storiesAfter = stories.filter(function (s, i) {
              return i > pos;
            }).filter(function (_story) {
              return _story.parent !== story.id;
            }), nestedStories = stories.filter(function (_story) {
              return _story.parent === story.id;
            });

            var name = story.label.bold,
                arrow = '↘ '.grey;

            if (!story.options.tab) {
              name = name.bold.blue;
              arrow = '↘ '.bold.blue;
            }

            console.log('  ' + story.options.tab + arrow + '' + name);
          })();
        }

        stats.tests++;
        stats.passed++;

        story.status = true;

        if (Array.isArray(nestedStories)) {
          stories = storiesBefore.concat(nestedStories).concat(storiesAfter);
        }

        run(stories, id, stats).then(ok, ko);
      }, function (error) {
        var end = Date.now() - story.starts;

        var time = undefined;

        if (end < 50) {
          time = ('(' + end.toString() + ' ms)').white;
        } else if (end < 250) {
          time = ('(' + end.toString() + ' ms)').yellow;
        } else {
          time = ('(' + end.toString() + ' ms)').red;
        }

        if (!story.options.nested) {

          console.log('  ' + (story.tab || story.options.tab) + '✖'.red.bold + ' ' + story.label.red + ' ' + time);
        } else {
          console.log(' ', story.options.tab, story.label.bgRed.bold);
        }

        if (error.stack) {
          console.log(error.stack.yellow);
        } else {
          console.log(error);
        }

        stats.tests++;
        stats.failed++;
        stats.time += end;

        story.status = false;

        run(stories, id, stats).then(ok, ko);;
      });
    } else {
      ok(stats);
    }
  });
}

describe.use = function (fn) {
  return function (it) {
    return fn()(it);
  };
};

it.use = function (fn) {
  return function (it) {
    return fn()(it);
  };
};

describe.pause = function (ms) {
  return function (it) {
    return it('should pause', function () {
      return new Promise(function (ok) {
        return setTimeout(ok, ms);
      });
    });
  };
};

exports['default'] = describe;
module.exports = exports['default'];