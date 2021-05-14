import { HMRel } from "./HMRel";

export interface Widget {
    id: number;
    widgetTitle: string;
    widgetValue: string;
    _links: HMRel;
}