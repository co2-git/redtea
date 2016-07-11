export default function *runAll(subject, ...describers) {
  let cursor = 0;
  while (describers[cursor]) {
    yield describers[cursor](subject);
    cursor++;
  }
  return true;
}
