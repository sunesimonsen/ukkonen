var ukkonen = require('./')


for (var i = 0; i < 10000; i += 1) {
  ukkonen('a', 'b');
  ukkonen('ab', 'ac');
  ukkonen('ac', 'bc');
  ukkonen('abc', 'axc');
  ukkonen('kitten', 'sitting');
  ukkonen('xabxcdxxefxgx', '1ab2cd34ef5g6');
  ukkonen('cat', 'cow');
  ukkonen('xabxcdxxefxgx', 'abcdefg');
  ukkonen('javawasneat', 'scalaisgreat');
  ukkonen('example', 'samples');
  ukkonen('sturgeon', 'urgently');
  ukkonen('levenshtein', 'frankenstein');
  ukkonen('distance', 'difference');
  ukkonen('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文');
}
