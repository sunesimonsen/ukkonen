"use strict";

var expect = require("unexpected").clone().use(require("unexpected-check"));

var ukkonen = require("..");
var leven = require("leven");

var Generators = require("chance-generators");

var levenshtein = function levenshtein(a, b, threshold) {
  threshold = typeof threshold === "number" ? threshold : Infinity;

  var distance = leven(a, b);
  return Math.min(threshold, distance);
};

var g = new Generators(42);

var edit = g.pickone(["replace", "delete", "insert", "transpose"]);
var strings = g.string({ length: g.natural({ max: 100 }) });

var editedTexts = g
  .shape({
    editCount: g.natural({ max: 100 }),
    text: g.paragraph()
  })
  .map(function(args) {
    var editCount = args.editCount;
    var text = args.text;

    var edits = g.array(edit, editCount);

    var characters = Array.prototype.slice(text);

    edits().forEach(function(edit) {
      var position = g.natural() % characters.length;
      switch (edit) {
        case "replace":
          characters[position] = g.character();
        case "delete":
          characters.splice(position, 1);
        case "insert":
          characters.splice(position, 0, g.character());
        case "transpose":
          if (position + 1 < characters.length) {
            var tmp = characters[position];
            characters[position] = characters[position + 1];
            characters[position + 1] = tmp;
          }
      }
    });

    return {
      text: text,
      editedText: characters.join("")
    };
  });

describe("ukkonen", function() {
  it("computes distance correctly for control group", function() {
    [
      { name1: "ABCDE", name2: "FGHIJ", distance: 5 },
      { name1: "AVERY", name2: "GARVEY", distance: 3 },
      { name1: "ADCROFT", name2: "ADDESSI", distance: 5 },
      { name1: "BAIRD", name2: "BAISDEN", distance: 3 },
      { name1: "BOGGAN", name2: "BOGGS", distance: 2 },
      { name1: "CLAYTON", name2: "CLEARY", distance: 5 },
      { name1: "DYBAS", name2: "DYCKMAN", distance: 4 },
      { name1: "EMINETH", name2: "EMMERT", distance: 4 },
      { name1: "GALANTE", name2: "GALICKI", distance: 4 },
      { name1: "HARDIN", name2: "HARDING", distance: 1 },
      { name1: "KEHOE", name2: "KEHR", distance: 2 },
      { name1: "LOWRY", name2: "LUBARSK", distance: 5 },
      { name1: "MAGALLAN", name2: "MAGANA", distance: 3 },
      { name1: "MAYO", name2: "MAYS", distance: 1 },
      { name1: "MOENY", name2: "MOFFETT", distance: 4 },
      { name1: "PARE", name2: "PARENT", distance: 2 },
      { name1: "RAMEY", name2: "RAMFREY", distance: 2 },
      { name1: "ofosid", name2: "daej", distance: 6 },
      { name1: "of", name2: "lisib", distance: 5 },
      { name1: "nuhijoow", name2: "ru", distance: 7 },
      { name1: "w", name2: "4", distance: 1 },
      { name1: "", name2: "", distance: 0 },
      { name1: "", name2: "wat", distance: 3 },
      { name1: "wat", name2: "", distance: 3 },
      { name1: "wat", name2: "wat", distance: 0 },
      { name1: "Ukkonen", name2: "Levenshtein", distance: 8 }
    ].forEach(function(example) {
      expect(
        ukkonen,
        "when called with",
        [example.name1, example.name2],
        "to equal",
        example.distance
      );
    });
  });

  it("produces same result as Levenshtein", function() {
    expect(
      function(a, b) {
        expect(ukkonen(a, b), "to equal", levenshtein(a, b));
      },
      "to be valid for all",
      strings,
      strings
    );
  });

  it("produces same result as Levenshtein for random edits", function() {
    expect(
      function(args) {
        var text = args.text;
        var editedText = args.editedText;

        expect(
          ukkonen(text, editedText),
          "to equal",
          levenshtein(text, editedText)
        );
      },
      "to be valid for all",
      editedTexts
    );
  });

  describe("when given a threshold", function() {
    it("produces same result as Levenshtein or the given threshold", function() {
      expect(
        function(a, b, threshold) {
          expect(
            ukkonen(a, b, threshold),
            "to equal",
            levenshtein(a, b, threshold)
          );
        },
        "to be valid for all",
        strings,
        strings,
        g.natural({ min: 10, max: 30 })
      );
    });

    it("produces same result as Levenshtein for random edits or the given threshold", function() {
      expect(
        function(args, threshold) {
          var text = args.text;
          var editedText = args.editedText;

          expect(
            ukkonen(text, editedText, threshold),
            "to equal",
            levenshtein(text, editedText, threshold)
          );
        },
        "to be valid for all",
        editedTexts,
        g.natural({ min: 10, max: 30 })
      );
    });
  });
});
