import { showOverlay, dismissExistedOverlays } from "./overlay";

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
      top: "50px",
      left: "60px",
      width: "200px",
      height: "100px",
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
