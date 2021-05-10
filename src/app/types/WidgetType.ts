import { HMRel } from "./HMRel";

export interface WidgetType {
    widgetType: string; 
    typeName: string;
    defaultValue: string;
    _links: HMRel;
}