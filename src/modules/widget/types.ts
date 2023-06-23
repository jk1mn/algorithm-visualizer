import type { WidgetType } from "./constants";
import type { Widget } from "./domain/entity/widget";

export type Widgets = Record<WidgetType, Widget>;
