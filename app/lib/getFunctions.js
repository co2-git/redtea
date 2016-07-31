// @flow
import path from 'path';

export default function getFunctions(files: string[]): Function[] {
  return files.map((file: string): Function => {
    let absoluteFile;

    if (/^\//.test(file)) {
      absoluteFile = file;
    } else {
      absoluteFile = path.join(process.cwd(), file);
    }

    let fn = require(absoluteFile);

    if (typeof fn.default === 'function') {
      fn = fn.default;
    }

    if (typeof fn !== 'function') {
      throw new Error('You need to expose a function in file ' + file);
    }
    return fn;
  });
}
