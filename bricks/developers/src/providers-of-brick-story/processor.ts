import i18next from "i18next";
import { cloneDeep } from "lodash";
import { i18nText } from "@next-core/brick-kit";
import {
  SidebarMenuItem,
  SidebarMenuGroup,
  SidebarMenu,
  Story,
  Chapter,
  CategoryGroup,
  StoryDoc,
} from "@next-core/brick-types";
import { atomBook } from "../stories/chapters/atom-bricks";
import { businessBook } from "../stories/chapters/business-bricks";
import { K, NS_DEVELOPERS } from "../i18n/constants";
import {
  BrickRecord,
  DEFAULT_DESCRIPTION,
  searchByQ,
  searchByCategory,
  getAllStoryListV2,
} from "../share/processor";

export const ALL_BOOKS = [].concat(atomBook, businessBook).map((book) => ({
  ...book,
  stories: book.stories.map((story: Story) => ({
    ...story,
    category: book.category,
  })),
}));

export function findStoryById(
  id: string,
  storyType: "brick" | "template",
  stories: Story[] = []
): Story {
  const story = ALL_BOOKS.reduce<Story[]>(
    (acc, chapter) => acc.concat(chapter.stories),
    []
  )
    .filter((story) => !stories.find((s) => s.storyId === story.storyId))
    .concat(stories)
    .find((story) => story.storyId === id && story.type === storyType);
  return story;
}

export const listBrickStoryV2 = (
  categoryGroups: CategoryGroup[],
  stories: Story[],
  storyType?: string,
  q?: string,
  categories?: string | string[],
  page?: number,
  pageSize?: number,
  fields?: Record<string, boolean>
): Promise<{
  list: BrickRecord[];
  total: number;
  page: number;
  pageSize: number;
}> => {
  page = page || 1;
  pageSize = pageSize || 20;

  const storyList = getAllStoryListV2(
    categoryGroups,
    stories,
    q,
    categories,
    fields
  );

  return Promise.resolve({
    total: storyList.length,
    list: storyList.slice((page - 1) * pageSize, page * pageSize),
    page,
    pageSize,
  });
};

export const listBrickStory = (
  storyType?: string,
  q?: string,
  categories?: string | string[],
  page?: number,
  pageSize?: number,
  fields?: Record<string, boolean>
): Promise<{
  list: BrickRecord[];
  total: number;
  page: number;
  pageSize: number;
}> => {
  const storyList: BrickRecord[] = [];
  let books: Chapter[] = [];
  page = page || 1;
  pageSize = pageSize || 20;
  fields = fields || {};
  if (storyType === "atom") {
    books = atomBook;
  } else if (storyType === "business") {
    books = businessBook;
  } else {
    books = [...atomBook, ...businessBook];
  }
  books.forEach((chapter) => {
    chapter.stories.forEach((story) => {
      const description = i18nText(story.description) || DEFAULT_DESCRIPTION;
      const title = i18nText(story.text);
      const category = i18nText(chapter.title);
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
          title: title,
          subTitle: story.author,
          description: description,
          tags: tags.map(i18nText),
          icon: story.icon,
          category: category,
        };
        if (fields.doc) {
          item.doc = story.doc;
        }
        storyList.push(item);
      }
    });
  });
  return Promise.resolve({
    total: storyList.length,
    list: storyList.slice((page - 1) * pageSize, page * pageSize),
    page,
    pageSize,
  });
};

export const categoryList = (storyType: string): Promise<string[]> => {
  let books: Chapter[] = [];
  if (storyType === "atom") {
    books = atomBook;
  } else if (storyType === "business") {
    books = businessBook;
  }
  const categoryList = books.map((book: Chapter) => i18nText(book.title));
  return Promise.resolve(categoryList);
};

export const categoryMenu = (): Promise<SidebarMenu> => {
  const menuItems: SidebarMenuItem[] = [
    {
      text: i18next.t(`${NS_DEVELOPERS}:${K.ALL}`),
      to: "/developers/brick-book?category=",
      exact: true,
      activeMatchSearch: true,
    },
    {
      type: "group",
      title: i18next.t(`${NS_DEVELOPERS}:${K.ATOM}`),
      items: [],
    },
    {
      type: "group",
      title: i18next.t(`${NS_DEVELOPERS}:${K.BUSINESS}`),
      items: [],
    },
  ];
  let i = 1;
  [atomBook, businessBook].forEach((books) => {
    books.forEach((book: Chapter) => {
      const title = i18nText(book.title);
      (menuItems[i] as SidebarMenuGroup).items.push({
        text: title,
        to: `/developers/brick-book?category=${title}`,
        exact: true,
        activeMatchSearch: true,
      });
    });
    i += 1;
  });
  return Promise.resolve({
    title: "",
    menuItems: menuItems,
  });
};

export const categoryMenuV2 = (
  categoryGroups: CategoryGroup[]
): Promise<SidebarMenu> => {
  const groups = cloneDeep(categoryGroups);
  const menuItems: SidebarMenuItem[] = [
    {
      text: i18next.t(`${NS_DEVELOPERS}:${K.ALL}`),
      to: "/developers/brick-book?category=",
      exact: true,
      activeMatchSearch: true,
    },
  ];
  let i = 1;
  groups.forEach((menu) => {
    menuItems.push({
      title: i18nText(menu.title),
      type: "group",
      items: [],
    });

    menu.items.forEach((book: Chapter) => {
      (menuItems[i] as SidebarMenuGroup).items.push({
        text: i18nText(book.title),
        to: `/developers/brick-book?category=${book.category}`,
        exact: true,
        activeMatchSearch: true,
      });
    });
    i += 1;
  });

  return Promise.resolve({
    title: "",
    menuItems: menuItems,
  });
};

export const getBrickDocs = (): Promise<{
  [brickId: string]: string | StoryDoc;
}> => {
  const docs: { [brickId: string]: string | StoryDoc } = {};

  ALL_BOOKS.reduce<Story[]>(
    (acc, chapter) => acc.concat(chapter.stories),
    []
  ).forEach((story) => (docs[story.storyId as string] = story.doc));

  return Promise.resolve(docs);
};
