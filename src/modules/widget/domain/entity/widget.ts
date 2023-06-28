import { Entity } from '../../../../shared/entity';
import { objectSchema, intInRangeSchema, enumSchema } from '../../../../shared/validation-rules';
import { WidgetType } from '../../constants';

export class Widget extends Entity {
  x: number;
  y: number;
  w: number;
  h: number;
  id: WidgetType;

  constructor (data: {
    x: number;
    y: number;
    w: number;
    h: number;
    id: WidgetType;
  }) {
    super();
    this.x = data.x;
    this.y = data.y;
    this.w = data.w;
    this.h = data.h;
    this.id = data.id;
    this.validate();
  }

  protected getSchema() {
    return objectSchema({
      x: intInRangeSchema(0, 12),
      y: intInRangeSchema(0, 12),
      w: intInRangeSchema(1, 12),
      h: intInRangeSchema(1, 12),
      id: enumSchema(WidgetType),
    });
  }
}
