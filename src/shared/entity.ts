import type { ZodType } from 'zod';

import { SchemaValidationException } from './exceptions';

export abstract class Entity {
  protected validate(): void {
    const result = this.getSchema().safeParse(this);

    if (result.success === false) {
      throw new SchemaValidationException(result.error.issues);
    }
  }

  protected abstract getSchema(): ZodType;
}
