# Ukkonen - Approximate String Matching

[![npm version](https://badge.fury.io/js/ukkonen.svg)](https://badge.fury.io/js/ukkonen)
[![Build Status](https://travis-ci.org/sunesimonsen/ukkonen.svg?branch=master)](https://travis-ci.org/sunesimonsen/ukkonen)

This project implements the [Approximate String Matching algorithm by Esko Ukkonen](https://www.sciencedirect.com/science/article/pii/S0019995885800462) extended with ideas from [An Extension of Ukkonen's Enhanced Dynamic Programming ASM Algorith by Hal Berghel and David Roach](http://berghel.net/publications/asm/asm.pdf).

Ukkonen's algorithm is very competitive with the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) and for longer strings it is much more performant than Levenshtein distance.

In addition to being a competitive alternative to Levenshtein distance, Ukkonen's algorithm also allows you to provide a threshold for the distance which increases the performance even more for texts that are longer than the threshold.

<img src="./images/leven-for-tree-matching.gif" alt="HTML diffing using Levenshtein" height="200"> <img src="./images/ukkonen-for-tree-matching.gif" alt="HTML diffing using Ukkonen's algorithm" height="200">

Above you can see the different of using Levenshtein distance and Ukkonen's algorithm for matching sub-trees when diffing HTML.

## Install

```sh
npm install --save ukkonen
```

## Usage

You can find the distance between the strings `Ukkonen` and `Levenshtein` the following way:

```js
var ukkonen = require("ukkonen");

assert.equal(ukkonen("Ukkonen", "Levenshtein"), 8);
```

If you want to limit the distance by a given threshold:

```js
var ukkonen = require("ukkonen");

assert.equal(ukkonen("Ukkonen", "Levenshtein", 6), 6);
assert.equal(ukkonen("Ukkonen", "Levenshtein", 10), 8);
```

## Platform support

The library is ES5 and will work with any JavaScript bundler in the browser as well as Node versions with ES5 support.

## Benchmark

I have benchmarked the library against [the fastest Levenshtein distance implementation on NPM](https://github.com/sindresorhus/leven).

```
# ukkonen: Edit distance one word (examples:14,iterations:100000)
ok ~436 ms (0 s + 436153865 ns)

# leven: Edit distance one word (examples:14,iterations:100000)
ok ~302 ms (0 s + 301616371 ns)

# ukkonen: Edit distance on sentence with small differences (examples:1,iterations:1000)
ok ~1.79 ms (0 s + 1790152 ns)

# leven: Edit distance on sentence with small differences (examples:1,iterations:1000)
ok ~6.3 ms (0 s + 6299536 ns)

# ukkonen: Edit distance on paragraphs with small differences (examples:1,iterations:1000)
ok ~5 ms (0 s + 4998844 ns)

# leven: Edit distance on paragraphs with small differences (examples:1,iterations:1000)
ok ~370 ms (0 s + 370318109 ns)

# ukkonen: Edit distance on longer texts with small differences (examples:1,iterations:1000)
ok ~11 ms (0 s + 11247544 ns)

# leven: Edit distance on longer texts with small differences (examples:1,iterations:1000)
ok ~1.45 s (1 s + 452042903 ns)

# ukkonen: Edit distance on longer texts with many differences (examples:1,iterations:1000)
ok ~3.25 s (3 s + 246384120 ns)

# leven: Edit distance on longer texts with many differences (examples:1,iterations:1000)
ok ~2.34 s (2 s + 340836783 ns)

# ukkonen: Edit distance on longer texts with small differences and a threshold of 20 (examples:1,iterations:1000)
ok ~9.08 ms (0 s + 9078081 ns)

# leven: Edit distance on longer texts with small differences and a threshold of 20 (examples:1,iterations:1000)
ok ~1.49 s (1 s + 492442893 ns)

# ukkonen: Edit distance on longer texts with many differences and a threshold of 40 (examples:1,iterations:1000)
ok ~16 ms (0 s + 16197361 ns)

# leven: Edit distance on longer texts with many differences and a threshold of 40 (examples:1,iterations:1000)
ok ~2.31 s (2 s + 313343513 ns)
```

## Acknowledgements

Obviously the authors of the papers describing the algorithm Esko Ukkonen, Hal Berghel and David Roach.

I stole a lot of ideas from [Sindre Sorhus](https://github.com/sindresorhus)'s [leven](https://github.com/sindresorhus/leven) library and I also used it to test my implementation against.

## License

[MIT © Sune Simonsen](./LICENSE)
