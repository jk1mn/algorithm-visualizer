import { Entity } from '../../../../shared/entity';
import { objectSchema, intInRangeSchema } from '../../../../shared/validation-rules';

export class Widget extends Entity {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor (data: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    super();
    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.validate();
  }

  protected getSchema() {
    return objectSchema({
      x: intInRangeSchema(0, 12),
      y: intInRangeSchema(0, 12),
      width: intInRangeSchema(1, 12),
      height: intInRangeSchema(1, 12),
    });
  }
}
