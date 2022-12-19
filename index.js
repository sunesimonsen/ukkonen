function ukkonen(a, b, threshold) {
  if (a === b) {
    return 0;
  }

  threshold = typeof threshold === "number" ? threshold : Infinity;

  if (a.length > b.length) {
    // Swap a and b so b longer or same length as a
    const tmp = a;
    a = b;
    b = tmp;
  }

  let aLen = a.length;
  let bLen = b.length;

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
  let tStart = 0;
  while (tStart < aLen && a.charCodeAt(tStart) === b.charCodeAt(tStart)) {
    tStart++;
  }

  aLen -= tStart;
  bLen -= tStart;

  if (aLen === 0) {
    return bLen < threshold ? bLen : threshold;
  }

  threshold = bLen < threshold ? bLen : threshold;

  let dLen = bLen - aLen;

  if (threshold < dLen) {
    return threshold;
  }

  // floor(min(threshold, aLen) / 2)) + 2
  const ZERO_K = ((aLen < threshold ? aLen : threshold) >> 1) + 2;

  const arrayLength = dLen + ZERO_K * 2 + 2;
  let currentRow = new Array(arrayLength);
  let nextRow = new Array(arrayLength);
  for (let i = 0; i < arrayLength; i++) {
    currentRow[i] = -1;
    nextRow[i] = -1;
  }

  const aCharCodes = new Array(aLen);
  const bCharCodes = new Array(bLen);

  let i = 0;
  let t = tStart;
  while (i < aLen) {
    aCharCodes[i] = a.charCodeAt(t);
    bCharCodes[i] = b.charCodeAt(t);
    i++;
    t++;
  }

  while (i < bLen) {
    bCharCodes[i++] = b.charCodeAt(t++);
  }

  let j = 0;
  let conditionRow = dLen + ZERO_K;
  let endMax = conditionRow << 1;
  do {
    j++;

    const tmp = currentRow;
    currentRow = nextRow;
    nextRow = tmp;

    let start;
    let previousCell;
    let currentCell = -1;
    let nextCell;

    if (j <= ZERO_K) {
      start = -j + 1;
      nextCell = j - 2;
    } else {
      start = j - (ZERO_K << 1) + 1;
      nextCell = currentRow[ZERO_K + start];
    }

    let end;
    if (j <= conditionRow) {
      end = j;
      nextRow[ZERO_K + j] = -1;
    } else {
      end = endMax - j;
    }

    for (let k = start, rowIndex = start + ZERO_K; k < end; k++, rowIndex++) {
      previousCell = currentCell;
      currentCell = nextCell;
      nextCell = currentRow[rowIndex + 1];

      // max(t, previousCell, nextCell + 1)
      let t = currentCell + 1;
      t = t < previousCell ? previousCell : t;
      t = t < nextCell + 1 ? nextCell + 1 : t;

      while (t < aLen && t + k < bLen && aCharCodes[t] === bCharCodes[t + k]) {
        t++;
      }

      nextRow[rowIndex] = t;
    }
  } while (nextRow[conditionRow] < aLen && j <= threshold);

  return j - 1;
}

module.exports = ukkonen;
