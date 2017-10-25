/* globals bench suite */
'use strict';

var ukkonen = require('./');
var leven = require('leven');

suite('Edit distance one word', function () {
  function run(fn) {
    fn('a', 'b');
    fn('ab', 'ac');
    fn('ac', 'bc');
    fn('abc', 'axc');
    fn('kitten', 'sitting');
    fn('xabxcdxxefxgx', '1ab2cd34ef5g6');
    fn('cat', 'cow');
    fn('xabxcdxxefxgx', 'abcdefg');
    fn('javawasneat', 'scalaisgreat');
    fn('example', 'samples');
    fn('sturgeon', 'urgently');
    fn('levenshtein', 'frankenstein');
    fn('distance', 'difference');
    fn('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文');
  }

	bench('ukkonen', function () {
		run(ukkonen);
	});

	bench('leven', function () {
		run(leven);
	});
})

suite('Edit distance on sentence with small differences', function () {
  function run(fn) {
    fn(
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      'Lorem Ipsum is simply clever text of the printing and typesetting industries.'
    )
  }

	bench('ukkonen', function () {
		run(ukkonen);
	});

	bench('leven', function () {
		run(leven);
	});
})

suite('Edit distance on paragraphs with small differences', function () {
  function run(fn) {
    fn(
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1600s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1970s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker excluding versions of Lorem Ipsum.'
    )
  }

	bench('ukkonen', function () {
		run(ukkonen);
	});

	bench('leven', function () {
		run(leven);
	});
})

suite('Edit distance on longer texts with small differences', function () {
  function run(fn) {
    fn(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, eu placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Etiam lacinia pretium luctus. Mauris nulla turpis, suscipit vitae lobortis quis, tempor sed ex. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.',
      'Lorem Ipsum dolor sit amet, consectetur elit adipiscing. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Etiam lacinia pretium luctus. Mauris nulla turpis, suscipit vitae lobortis quis, tempor sed ex. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis Vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.'
    )
  }

	bench('ukkonen', function () {
		run(ukkonen);
	});

	bench('leven', function () {
		run(leven);
	});
})

suite('Edit distance on longer texts with many differences', function () {
  function run(fn) {
    fn(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, eu placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Etiam lacinia pretium luctus. Mauris nulla turpis, suscipit vitae lobortis quis, tempor sed ex. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.',
      'Curabitur fringilla eros lacus, et placerat magna pretium in. Suspendisse ut egestas dui. Nam quis sapien eget enim interdum interdum. Phasellus metus ligula, lacinia at tellus eu, iaculis blandit libero. Proin risus sem, ornare a orci et, aliquam rutrum elit. Aenean ac posuere justo, a maximus orci. In molestie nibh quis libero elementum, vel pellentesque metus volutpat. Maecenas non quam felis. Proin congue aliquet mauris laoreet viverra. Fusce auctor sapien a neque varius pellentesque. Nam ut sem neque. Pellentesque bibendum aliquet consectetur. Nam finibus diam non vestibulum maximus. Integer aliquet mattis elit, vitae vehicula erat pulvinar at. Ut placerat viverra aliquam. Nulla vehicula hendrerit justo.'
    )
  }

	bench('ukkonen', function () {
		run(ukkonen);
	});

	bench('leven', function () {
		run(leven);
	});
})

suite('Edit distance on longer texts with small differences and a threshold of 10', function () {
  function run(fn) {
    fn(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, eu placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Etiam lacinia pretium luctus. Mauris nulla turpis, suscipit vitae lobortis quis, tempor sed ex. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.',
      'Lorem Ipsum dolor sit amet, consectetur elit adipiscing. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Etiam lacinia pretium luctus. Mauris nulla turpis, suscipit vitae lobortis quis, tempor sed ex. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis Vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.',
      20
    )
  }

	bench('ukkonen', function () {
		run(ukkonen);
	});

	bench('leven', function () {
		run(leven);
	});
})

suite('Edit distance on longer texts with many differences and a threshold of 40', function () {
  function run(fn) {
    fn(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus sapien, rhoncus sed bibendum in, facilisis non urna. Cras non mattis tellus, nec facilisis nisi. Proin vel purus eros. Morbi ultrices egestas mi vitae laoreet. Ut feugiat est lorem, a rhoncus mi lacinia vel. Aenean et velit neque. Quisque accumsan mi ligula, eu placerat lorem elementum ac. Nunc congue, eros eu aliquam commodo, leo orci tristique nulla, eu tempus quam justo eu neque. Nulla purus elit, porttitor ut sollicitudin sed, dictum vel justo. Mauris orci nisi, lacinia dictum augue nec, condimentum suscipit metus. Sed elementum enim eget venenatis mollis. Etiam sed congue neque, id tristique ex. Duis vitae ipsum nec ligula vulputate ullamcorper. Phasellus fringilla odio turpis, eu condimentum turpis scelerisque quis.',
      'Curabitur fringilla eros lacus, et placerat magna pretium in. Suspendisse ut egestas dui. Nam quis sapien eget enim interdum interdum. Phasellus metus ligula, lacinia at tellus eu, iaculis blandit libero. Proin risus sem, ornare a orci et, aliquam rutrum elit. Aenean ac posuere justo, a maximus orci. In molestie nibh quis libero elementum, vel pellentesque metus volutpat. Maecenas non quam felis. Proin congue aliquet mauris laoreet viverra. Fusce auctor sapien a neque varius pellentesque. Nam ut sem neque. Pellentesque bibendum aliquet consectetur. Nam finibus diam non vestibulum maximus. Integer aliquet mattis elit, vitae vehicula erat pulvinar at. Ut placerat viverra aliquam. Nulla vehicula hendrerit justo. Contrary to popular belief, Lorem Ipsum is not simply random text.',
      40
    )
  }

	bench('ukkonen', function () {
		run(ukkonen);
	});

	bench('leven', function () {
		run(leven);
	});
})
