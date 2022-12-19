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

The library is ES6 and will work with any JavaScript bundler in the browser as well as Node versions with ES6 support.

## Benchmark

I have benchmarked the library against [the fastest Levenshtein distance implementation on NPM](https://github.com/sindresorhus/leven).

```
Running benchmarks with 1000 iterations

# ukkonen: Edit distance one word (14 examples)
ok ~18 ms (0 s + 17993165 ns)

# leven: Edit distance one word (14 examples)
ok ~13 ms (0 s + 13155407 ns)

# ukkonen: Edit distance on sentence with small differences
ok ~1.66 ms (0 s + 1656841 ns)

# leven: Edit distance on sentence with small differences
ok ~7.23 ms (0 s + 7233814 ns)

# ukkonen: Edit distance on paragraphs with small differences
ok ~5.37 ms (0 s + 5367561 ns)

# leven: Edit distance on paragraphs with small differences
ok ~416 ms (0 s + 416468504 ns)

# ukkonen: Edit distance on longer texts with small differences
ok ~10 ms (0 s + 10305586 ns)

# leven: Edit distance on longer texts with small differences
ok ~1.7 s (1 s + 703731130 ns)

# ukkonen: Edit distance on longer texts with many differences
ok ~3.28 s (3 s + 280166305 ns)

# leven: Edit distance on longer texts with many differences
ok ~2.52 s (2 s + 519432479 ns)

# ukkonen: Edit distance on longer texts with small differences and a threshold of 20
ok ~9.69 ms (0 s + 9691021 ns)

# leven: Edit distance on longer texts with small differences and a threshold of 20
ok ~1.61 s (1 s + 610079082 ns)

# ukkonen: Edit distance on longer texts with many differences and a threshold of 40
ok ~15 ms (0 s + 15225792 ns)

# leven: Edit distance on longer texts with many differences and a threshold of 40
ok ~2.54 s (2 s + 539519721 ns)
```

## Acknowledgements

Obviously the authors of the papers describing the algorithm Esko Ukkonen, Hal Berghel and David Roach.

I stole a lot of ideas from [Sindre Sorhus](https://github.com/sindresorhus)'s [leven](https://github.com/sindresorhus/leven) library and I also used it to test my implementation against.

## License

[MIT © Sune Simonsen](./LICENSE)
