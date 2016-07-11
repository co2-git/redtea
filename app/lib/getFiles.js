// @flow
import path from 'path';
import fs from 'fs-extra';
import sequencer from 'promise-sequencer';

function flattenArray(arr: Array<any>): Array<any> {
  return arr.reduce(
    (reduced: Array<any>, item: any): Array<any> => {
      if (Array.isArray(item)) {
        reduced.push(...flattenArray(item));
      } else {
        reduced.push(item);
      }
      return reduced;
    },
    []
  );
}

function scandir(dir: string): Promise<Array<string>> {
  return new Promise((resolve: Function, reject: Function) => {
    const files = [];
    fs.walk(dir)
      .on('error', reject)
      .on('data', (file: Object) => {
        if (file.path.replace(/\/$/, '') !== dir.replace(/\/$/, '')) {
          files.push(file.path);
        }
      })
      .on('end', (): void => resolve(files));
  });
}

function getFile(file: string): Promise<string|Array<string>> {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const is_absolute = /^\//.test(file);
      const absolute = path.join(process.cwd(), file);
      const formatted_file = is_absolute ? file : absolute;

      const stat = await sequencer.promisify(fs.stat, [formatted_file]);

      if (stat.isDirectory()) {
        const files = await scandir(file);
        const _files = await getFiles(...files);
        resolve(_files);
      } else {
        resolve(file);
      }
    } catch (error) {
      console.log('getFile', error);
      reject(error);
    }
  });
}

export default function getFiles(...files: Array<any>): Promise<Array<string>> {
  return new Promise(async (resolve: Function, reject: Function) => {
    try {
      const results = [];
      for (const file of files) {
        const result = await getFile(file);
        results.push(result);
      }
      resolve(flattenArray(results).reduce(
        (unique: Array<string>, result: string): Array<string> => {
          if (unique.indexOf(result) === -1) {
            unique.push(result);
          }
          return unique;
        },
        []
      ));
    } catch (error) {
      console.log('getFiles', error);
      reject(error);
    }
  });
}
