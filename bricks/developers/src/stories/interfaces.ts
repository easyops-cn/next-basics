import {
  Story as LegacyStory,
  Chapter as StoryChapter
} from "@next-core/brick-types";

// 由于在stories中有很多构建story引用了下面的类型，所以先暂不处理

export interface Chapter extends StoryChapter {}

export interface Story extends Partial<LegacyStory> {
  category?: string;
}
