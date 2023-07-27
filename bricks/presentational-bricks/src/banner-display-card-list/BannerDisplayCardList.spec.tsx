import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BannerDisplayCardList } from "./BannerDisplayCardList";

describe("BannerDisplayCardList", () => {
  it("should work", () => {
    render(
      <BannerDisplayCardList
        cardList={[{ title: "title1", content: "content1" }]}
      />
    );
    expect(screen.getByTestId("card-wrapper").childNodes.length).toBe(1);
  });
});
