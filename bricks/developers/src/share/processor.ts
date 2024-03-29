import { cloneDeep } from "lodash";
import i18next from "i18next";
import { i18nText, getRuntime } from "@next-core/brick-kit";
import {
  Story,
  Chapter,
  CategoryGroup,
  StoryDoc,
  MenuIcon,
  StoryConf,
  SnippetConf,
  SrcIcon,
} from "@next-core/brick-types";
import { atomBook } from "../stories/chapters/atom-bricks";
import { businessBook } from "../stories/chapters/business-bricks";
import { DemoConf } from "../interfaces";
import { K, NS_DEVELOPERS } from "../i18n/constants";

type MixedIconType = MenuIcon | SrcIcon;
export interface BrickRecord {
  id: string;
  type: "brick" | "template";
  title: string;
  subTitle?: string;
  description: string;
  category?: string;
  icon?: MixedIconType;
  tags?: string[];
  doc?: string | StoryDoc;
  v3Brick?: boolean;
}

export const DEFAULT_DESCRIPTION = "~";

export function searchByQ(q: string, matchStringList: string[]): boolean {
  if (!q) {
    return true;
  }
  const qList = q
    .toLowerCase()
    .split(" ")
    .map((i) => i.trim());
  const macthStringGroup = matchStringList.join(" ").toLowerCase();
  return !qList.find((i) => !macthStringGroup.includes(i));
}

export function searchByCategory(
  categories: string | string[],
  currCategory: string
): boolean {
  if (!categories || categories.length == 0) {
    return true;
  }
  if (Array.isArray(categories)) {
    return categories.includes(currCategory);
  } else {
    return categories === currCategory;
  }
}

export const getStoryTitle = (story: Story): string => {
  const text = i18nText(story.text);
  return story.deprecated
    ? `（${i18next.t(K.DEPRECATED, { ns: NS_DEVELOPERS })}）${text}`
    : text;
};

export function processIconInPreview(icon: MixedIconType): MixedIconType {
  const imgSrc = (icon as SrcIcon)?.imgSrc;
  if (imgSrc) {
    return {
      ...icon,
      imgSrc: /^(?:data):|^\//.test(imgSrc)
        ? imgSrc
        : `${location.origin}${getRuntime().getBasePath()}${imgSrc}`,
    } as SrcIcon;
  }

  return icon;
}

export const getAllStoryListV2 = (
  categoryGroups: CategoryGroup[],
  stories: Story[],
  q?: string,
  categories?: string | string[],
  fields?: Record<string, boolean>
): BrickRecord[] => {
  const storyList: BrickRecord[] = [];
  let books: Array<Chapter & { v3Brick?: boolean }> = [];
  fields = fields || {};
  const externalBook: Chapter[] = [];
  const groups = cloneDeep(categoryGroups);
  groups.forEach((menu) => {
    if (menu.group === "atom") {
      menu.items.forEach((item) => {
        if (!atomBook.some((book) => book.category === item.category)) {
          atomBook.push({ ...item, stories: [] });
        }
      });

      return;
    }

    if (menu.group === "business") {
      menu.items.forEach((item) => {
        if (!businessBook.some((book) => book.category === item.category)) {
          businessBook.push({ ...item, stories: [] });
        }
      });

      return;
    }

    externalBook.push(...menu.items);
  });

  books = [
    ...atomBook,
    ...businessBook,
    ...externalBook,
    {
      title: { en: "no-match-category", zh: "未匹配分类" },
      category: "no-match-category",
      stories: [],
    },
  ];

  stories.forEach((story) => {
    let finder = books.find((book) =>
      story.layerType === "widget"
        ? book.category === story.storyId.split(".")[0]
        : book.category === story.category
    );
    !finder &&
      (finder = books.find((book) => book.category === "no-match-category"));
    !finder.stories && (finder.stories = []);
    const index = finder.stories.findIndex((v) => v.storyId === story.storyId);
    if (index === -1) {
      finder.stories.push(story);
    } else {
      finder.stories[index] = story;
    }
    if (finder.category === "no-match-category") {
      // eslint-disable-next-line no-console
      console.warn(
        "Cannot match category  `%s` of `%s`  with any existed category. %o",
        story.category,
        story.storyId,
        story
      );
    }
  });
  books.forEach((chapter) => {
    chapter.stories?.forEach((story) => {
      if (story.deprecated) {
        return;
      }

      if (story?.originData?.isExport === false) {
        return;
      }

      const description = story.description
        ? i18nText(story.description) || DEFAULT_DESCRIPTION
        : DEFAULT_DESCRIPTION;
      const title = i18nText(story.text);
      const category = chapter.category;
      const author = story.author || "";
      if (
        searchByQ(q, [description, title, author, story.storyId]) &&
        searchByCategory(categories, category)
      ) {
        const tags = [chapter.title];
        if (story.tags) {
          tags.push(...story.tags);
        }
        const item: BrickRecord = {
          id: story.storyId,
          type: story.type,
          title: getStoryTitle(story),
          subTitle: story.author,
          description: description,
          tags: tags.map(i18nText),
          icon: processIconInPreview(story.icon),
          category: category,
          v3Brick: (story as Story & { v3Brick: boolean }).v3Brick,
        };
        if (fields.doc) {
          item.doc = story.doc;
        }
        storyList.push(item);
      }
    });
  });
  return storyList;
};

// 兼容新的SnippetConf格式
export function getAdjustedConf(
  defaultConf: StoryConf | SnippetConf
): DemoConf {
  let adjustedConf: DemoConf;
  // 新格式里必须有bricks
  if ((defaultConf as SnippetConf).bricks) {
    const snippetConf = defaultConf as SnippetConf;
    const bricks = [].concat(snippetConf.bricks).filter(Boolean);
    adjustedConf = {
      previewConf: bricks,
      description: {
        title: i18nText(snippetConf.title),
        message: i18nText(snippetConf.message),
      },
      actions: snippetConf.actions,
    };
  } else {
    const storyConf = { ...(defaultConf as StoryConf) };
    const description = storyConf.description;
    delete storyConf.description;
    adjustedConf = {
      previewConf: storyConf,
      description,
    };
  }
  return adjustedConf;
}
