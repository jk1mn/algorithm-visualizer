import type { ZodIssue } from 'zod';

export class AppException extends Error {}

export class SchemaValidationException extends Error {
  issues: ZodIssue[];

  constructor (issues: ZodIssue[]) {
    super();
    this.issues = issues;
  }
}
