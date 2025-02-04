"use strict";

module.exports =
{
  schema: {
    definitions: {
      markdown: {
        $ref: "files/README.md"
      },
      html: {
        $ref: "files/page.html"
      },
      css: {
        $ref: "files/style.css"
      },
      unknown: {
        $ref: "files/unknown.foo"
      },
      empty: {
        $ref: "files/empty"
      }
    }
  },
};
