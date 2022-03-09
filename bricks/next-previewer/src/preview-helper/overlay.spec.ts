import { showOverlay, dismissExistedOverlays } from "./overlay";

jest.spyOn(window, "getComputedStyle").mockImplementation(
  () =>
    ({
      borderLeftWidth: "1px",
      borderRightWidth: "2px",
      borderTopWidth: "3px",
      borderBottomWidth: "4px",
      marginLeft: "5px",
      marginRight: "6px",
      marginTop: "7px",
      marginBottom: "8px",
      paddingLeft: "9px",
      paddingRight: "10px",
      paddingTop: "11px",
      paddingBottom: "12px",
    } as any)
);

describe("overlay", () => {
  it("should work", () => {
    const span = {
      getBoundingClientRect: () => ({
        top: 50,
        left: 60,
        width: 200,
        height: 100,
      }),
    } as any;

    showOverlay([span]);
    expect(document.body.children.length).toBe(1);

    const node = document.body.firstChild as HTMLElement;
    expect(node.style).toMatchObject({
      position: "absolute",
      top: "43px",
      left: "55px",
      borderLeftWidth: "5px",
      borderRightWidth: "6px",
      borderTopWidth: "7px",
      borderBottomWidth: "8px",
    });

    const border = node.firstChild as HTMLElement;
    expect(border.style).toMatchObject({
      borderLeftWidth: "1px",
      borderRightWidth: "2px",
      borderTopWidth: "3px",
      borderBottomWidth: "4px",
    });

    const padding = border.firstChild as HTMLElement;
    expect(padding.style).toMatchObject({
      borderLeftWidth: "9px",
      borderRightWidth: "10px",
      borderTopWidth: "11px",
      borderBottomWidth: "12px",
    });

    const content = padding.firstChild as HTMLElement;
    expect(content.style).toMatchObject({
      width: "178px",
      height: "70px",
    });

    showOverlay([]);
    expect(document.body.children.length).toBe(0);

    const anotherSpan = {
      getBoundingClientRect: () => ({
        top: 350,
        left: 360,
        width: 200,
        height: 100,
      }),
    } as any;
    showOverlay([span, anotherSpan]);
    expect(document.body.children.length).toBe(2);

    dismissExistedOverlays();
    expect(document.body.firstChild as HTMLElement).toBe(null);
  });
});
