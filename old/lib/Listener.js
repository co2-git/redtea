export default class Listener {
  event: string;
  checkers: Array<Function> = [];
  not: boolean = false;

  constructor(event: string, checkers: Array<Function>, not: boolean = false) {
    this.event = event;
    this.checkers = checkers;
    this.not = not;
  }
}
