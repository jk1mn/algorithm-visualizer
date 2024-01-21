import type { ZodIssue } from 'zod';

enum Scope {
  DEBUG = 'DEBUG',
  USER = 'USER',
}

export class ApplicationException extends Error {
  private readonly scope: Scope;

  constructor (message: string, scope: Scope = Scope.DEBUG, options?: ErrorOptions) {
    super(message, options);
    this.scope = scope;
  }

  isUserError () {
    return this.scope === Scope.USER;
  }
}

export class UserException extends ApplicationException {
  constructor (message: string, options?: ErrorOptions) {
    super(message, Scope.USER, options);
  }
}

export class SchemaValidationException extends ApplicationException {
  // todo: it must not depend on Zod
  issues: ZodIssue[];

  constructor (message: string, issues: ZodIssue[]) {
    super(message);
    this.issues = issues;
  }
}
