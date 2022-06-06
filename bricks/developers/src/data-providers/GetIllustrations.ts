import { createProviderClass } from "@next-core/brick-utils";
import { illustrationsByCategory } from "@next-core/illustrations";
import { PresetColorTypes } from "antd/lib/_util/colors";

const COLORS = PresetColorTypes;

export function getRandomNumber(): number {
  const length = COLORS.length + 1;
  return ~~(Math.random() * length);
}

export function GetIllustrations(
  category: string = undefined
): { name: string; category: string }[] {
  const illustrations = illustrationsByCategory as Record<string, string[]>;
  const categories = Object.keys(illustrations);
  if (category === "all" || !category) {
    return categories.reduce((prev, next, index) => {
      const illustrationList = illustrations[next];
      const result = illustrationList
        .map((v) => ({
          name: v,
          category: next,
          color: COLORS[index] || COLORS[getRandomNumber()],
        }))
        .filter((v) => !/-dark$/g.test(v.name));
      prev = [...prev, ...result];
      return prev;
    }, []);
  } else {
    const categoryIllustrations = illustrations[category];
    return categoryIllustrations
      .map((v) => ({
        name: v,
        category: category,
        color: COLORS[0],
      }))
      .filter((v) => !/-dark$/g.test(v.name));
  }
}

customElements.define(
  "developers.provider-get-illustrations",
  createProviderClass(GetIllustrations)
);
