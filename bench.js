const bench = require("nanobench");

const ukkonen = require("./");
const leven = require("leven");

const iterations = parseInt(process.env.ITERATIONS || 1000);

console.log(`Running benchmarks with ${iterations} iterations\n`);

const suite = (name, examples) => {
  const exampleString =
    examples.length > 1 ? ` (${examples.length} examples)` : "";

  bench(`ukkonen: ${name}${exampleString}`, (b) => {
    b.start();
    for (let i = 0; i < iterations; i++) {
      for (const example of examples) {
        ukkonen(example.from, example.to, example.threshold);
      }
    }
    b.end();
  });

  bench(`leven: ${name}${exampleString}`, (b) => {
    b.start();
    for (let i = 0; i < iterations; i++) {
      for (const example of examples) {
        leven(example.from, example.to);
      }
    }
    b.end();
  });
};

suite("Edit distance one word", [
  { from: "a", to: "b" },
  { from: "ab", to: "ac" },
  { from: "ac", to: "bc" },
  { from: "abc", to: "axc" },
  { from: "kitten", to: "sitting" },
  { from: "xabxcdxxefxgx", to: "1ab2cd34ef5g6" },
  { from: "cat", to: "cow" },
  { from: "xabxcdxxefxgx", to: "abcdefg" },
  { from: "javawasneat", to: "scalaisgreat" },
  { from: "example", to: "samples" },
  { from: "sturgeon", to: "urgently" },
  { from: "levenshtein", to: "frankenstein" },
  { from: "distance", to: "difference" },
  { from: "因為我是中國人所以我會說中文", to: "因為我是英國人所以我會說英文" },
]);

suite("Edit distance on sentence with small differences", [
  {
    from: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    to: "Lorem Ipsum is simply clever text of the printing and typesetting industries.",
  },
]);

suite("Edit distance on paragraphs with small differences", [
  {
    from: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    to: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1600s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1970s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker excluding versions of Lorem Ipsum.",
  },
]);

suite("Edit distance on longer texts with small differences", [
  {
    from: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, eu placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Etiam lacinia pretium luctus. Mauris nulla turpis, suscipit vitae lobortis quis, tempor sed ex. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.",
    to: "Lorem Ipsum dolor sit amet, consectetur elit adipiscing. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Etiam lacinia pretium luctus. Mauris nulla turpis, suscipit vitae lobortis quis, tempor sed ex. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis Vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.",
  },
]);

suite("Edit distance on longer texts with many differences", [
  {
    from: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, eu placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Etiam lacinia pretium luctus. Mauris nulla turpis, suscipit vitae lobortis quis, tempor sed ex. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.",
    to: "Curabitur fringilla eros lacus, et placerat magna pretium in. Suspendisse ut egestas dui. Nam quis sapien eget enim interdum interdum. Phasellus metus ligula, lacinia at tellus eu, iaculis blandit libero. Proin risus sem, ornare a orci et, aliquam rutrum elit. Aenean ac posuere justo, a maximus orci. In molestie nibh quis libero elementum, vel pellentesque metus volutpat. Maecenas non quam felis. Proin congue aliquet mauris laoreet viverra. Fusce auctor sapien a neque varius pellentesque. Nam ut sem neque. Pellentesque bibendum aliquet consectetur. Nam finibus diam non vestibulum maximus. Integer aliquet mattis elit, vitae vehicula erat pulvinar at. Ut placerat viverra aliquam. Nulla vehicula hendrerit justo.",
  },
]);

suite(
  "Edit distance on longer texts with small differences and a threshold of 20",
  [
    {
      from: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, eu placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Etiam lacinia pretium luctus. Mauris nulla turpis, suscipit vitae lobortis quis, tempor sed ex. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.",
      to: "Lorem Ipsum dolor sit amet, consectetur elit adipiscing. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Etiam lacinia pretium luctus. Mauris nulla turpis, suscipit vitae lobortis quis, tempor sed ex. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis Vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.",
      threshold: 20,
    },
  ]
);

suite(
  "Edit distance on longer texts with many differences and a threshold of 40",
  [
    {
      from: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, eu placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.",
      to: "Curabitur fringilla eros lacus, et placerat magna pretium in. Suspendisse ut egestas dui. Nam quis sapien eget enim interdum interdum. Phasellus metus ligula, lacinia at tellus eu, iaculis blandit libero. Proin risus sem, ornare a orci et, aliquam rutrum elit. Aenean ac posuere justo, a maximus orci. In molestie nibh quis libero elementum, vel pellentesque metus volutpat. Maecenas non quam felis. Proin congue aliquet mauris laoreet viverra. Fusce auctor sapien a neque varius pellentesque. Nam ut sem neque. Pellentesque bibendum aliquet consectetur. Nam finibus diam non vestibulum maximus. Integer aliquet mattis elit, vitae vehicula erat pulvinar at. Ut placerat viverra aliquam. Nulla vehicula hendrerit justo. Contrary to popular belief, Lorem Ipsum is not simply random text.",
      threshold: 40,
    },
  ]
);
