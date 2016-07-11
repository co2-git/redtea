import colors from 'colors';

export default function overthrow(error: Error) {
  console.log(colors.yellow(error.stack));
  process.exit(8);
}
