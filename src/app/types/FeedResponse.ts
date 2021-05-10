import { FeedItem } from "./FeedItem";

export interface FeedResponse {
    feedTitle: string;
    feedItems: FeedItem[];
}