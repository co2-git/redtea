class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

export default class AssertionError extends ExtendableError {
  constructor (message, subject, value, type) {
    super(message);
    this.subject = subject;
    this.value = value;
    this.type = type;
    this.name = AssertionError.name;
  }

}
