import colors from 'colors';
import _ from 'lodash';

function pad(character: string, times: number): string {
  return _.range(times).map((): string => character).join('');
}

export default function chalk(message, type = 'success') {
  const width = 52;
  const color = type === 'success' ? 'bgGreen' : 'bgRed';
  const margin = width - message.length;
  console.log('  ', colors[color](pad(' ', width)));
  console.log('  ', colors[color](
    pad(' ', (margin / 2) - 1),
    message,
    pad(' ', (margin / 2) - 1),
  ));
  console.log('  ', colors[color](pad(' ', width)));
}
