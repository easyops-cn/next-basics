import { CustomTemplate, StoryboardFunction } from "@next-core/brick-types";

export const getBrickPackageIndexJs = ({
  appId,
  templates,
  functions,
}: {
  appId: string;
  templates: CustomTemplate[];
  functions: StoryboardFunction[];
}): string => `!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="bricks/test-tpl/dist/",r(r.s="8GPE")}({"8GPE":function(t,e,r){"use strict";r.r(e);var n=r("AARu");
${templates
  .map(
    (tpl) =>
      `Object(n.getRuntime)().registerCustomTemplate(${JSON.stringify(
        tpl.name,
        null,
        2
      )}, ${JSON.stringify({ proxy: tpl.proxy, bricks: tpl.bricks }, null, 2)})`
  )
  .concat(
    Array.isArray(functions) && functions.length > 0
      ? `Object(n.getRuntime)().registerWidgetFunctions(${JSON.stringify(
          appId
        )}, ${JSON.stringify(
          functions.map(({ name, source, typescript }) => ({
            name,
            source,
            typescript,
          })),
          null,
          2
        )})`
      : []
  )
  .join(",\n")}
},AARu:function(t,e,r){t.exports=r("XuQu")("tYg3")},XuQu:function(t,e){t.exports=dll}});
`;
