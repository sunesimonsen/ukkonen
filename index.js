function ukkonen(a, b, threshold) {
  if (a === b) {
    return 0;
  }

  threshold = typeof threshold === "number" ? threshold : Infinity;

  if (a.length > b.length) {
    // Swap a and b so b longer or same length as a
    var tmp = a;
    a = b;
    b = tmp;
  }

  var aLen = a.length;
  var bLen = b.length;

  // Performing suffix trimming:
  // We can linearly drop suffix common to both strings since they
  // don't increase distance at all
  // Note: `~-` is the bitwise way to perform a `- 1` operation
  while (aLen > 0 && a.charCodeAt(~-aLen) === b.charCodeAt(~-bLen)) {
    aLen--;
    bLen--;
  }

  if (aLen === 0) {
    return bLen < threshold ? bLen : threshold;
  }

  // Performing prefix trimming
  // We can linearly drop prefix common to both strings since they
  // don't increase distance at all
  var tStart = 0;
  while (tStart < aLen && a.charCodeAt(tStart) === b.charCodeAt(tStart)) {
    tStart++;
  }

  aLen -= tStart;
  bLen -= tStart;

  if (aLen === 0) {
    return bLen < threshold ? bLen : threshold;
  }

  threshold = bLen < threshold ? bLen : threshold;

  var dLen = bLen - aLen;

  if (threshold < dLen) {
    return threshold;
  }

  // floor(min(threshold, aLen) / 2)) + 2
  var ZERO_K = ((aLen < threshold ? aLen : threshold) >> 1) + 2;

  var arrayLength = dLen + ZERO_K * 2 + 2;
  var currentRow = new Array(arrayLength);
  var nextRow = new Array(arrayLength);
  for (var i = 0; i < arrayLength; i++) {
    currentRow[i] = -1;
    nextRow[i] = -1;
  }

  var aCharCodes = new Array(aLen);
  var bCharCodes = new Array(bLen);

  for (var i = 0, t = tStart; i < aLen; i++, t++) {
    aCharCodes[i] = a.charCodeAt(t);
    bCharCodes[i] = b.charCodeAt(t);
  }

  while (i < bLen) {
    bCharCodes[i++] = b.charCodeAt(t++);
  }

  var i = 0;
  var conditionRow = dLen + ZERO_K;
  var endMax = conditionRow << 1;
  do {
    i++;

    var tmp = currentRow;
    currentRow = nextRow;
    nextRow = tmp;

    var start;
    var previousCell;
    var currentCell = -1;
    var nextCell;

    if (i <= ZERO_K) {
      start = -i + 1;
      nextCell = i - 2;
    } else {
      start = i - (ZERO_K << 1) + 1;
      nextCell = currentRow[ZERO_K + start];
    }

    var end;
    if (i <= conditionRow) {
      end = i;
      nextRow[ZERO_K + i] = -1;
    } else {
      end = endMax - i;
    }

    for (var k = start, rowIndex = start + ZERO_K; k < end; k++, rowIndex++) {
      previousCell = currentCell;
      currentCell = nextCell;
      nextCell = currentRow[rowIndex + 1];

      // max(t, previousCell, nextCell + 1)
      var t = currentCell + 1;
      t = t < previousCell ? previousCell : t;
      t = t < nextCell + 1 ? nextCell + 1 : t;

      while (t < aLen && t + k < bLen && aCharCodes[t] === bCharCodes[t + k]) {
        t++;
      }

      nextRow[rowIndex] = t;
    }
  } while (nextRow[conditionRow] < aLen && i <= threshold);

  return i - 1;
}

module.exports = ukkonen;
