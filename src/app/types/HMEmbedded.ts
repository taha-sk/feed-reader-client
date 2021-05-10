import { Widget } from "./Widget";
import { WidgetType } from "./WidgetType";

export interface HMEmbedded {
    widgets: Widget[];
    widgetTypes: WidgetType[];
}