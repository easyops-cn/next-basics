import { createProviderClass } from "@next-core/brick-utils";
import { illustrationsByCategory } from "@next-core/illustrations";
import { PresetColorTypes } from "antd/lib/_util/colors";

const COLORS = PresetColorTypes;

export function getRandomNumber(): number {
  const length = COLORS.length + 1;
  return ~~(Math.random() * length);
}

export function GetIllustrations(): { name: string; category: string }[] {
  const illustrations = illustrationsByCategory as Record<string, string[]>;
  const categories = Object.keys(illustrations);
  return categories.reduce((prev, next, index) => {
    const illustrationList = illustrations[next];
    const result = illustrationList.map((v) => ({
      name: v,
      category: next,
      color: COLORS[index] || COLORS[getRandomNumber()],
    }));
    prev = [...prev, ...result];
    return prev;
  }, []);
}

customElements.define(
  "developers.provider-get-illustrations",
  createProviderClass(GetIllustrations)
);
