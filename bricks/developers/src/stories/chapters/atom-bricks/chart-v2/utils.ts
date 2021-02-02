import commonProperties from "../../../docs/chart-v2/common-properties.md";
import commonEvents from "../../../docs/chart-v2/common-events.md";

export const mergeCommon = (originDoc: string): string => {
  // for development mode
  let doc = originDoc.replace(
    `<h1 id="common-inputs">COMMON INPUTS</h1>`,
    commonProperties
  );
  doc = doc.replace(`<h1 id="events">EVENTS</h1>`, commonEvents);

  if (doc.length === originDoc.length) {
    // for production mode
    doc = originDoc.replace(
      `<h1 id=common-inputs>COMMON INPUTS</h1>`,
      commonProperties
    );
    doc = doc.replace(`<h1 id=events>EVENTS</h1>`, commonEvents);
  }
  return doc;
};
