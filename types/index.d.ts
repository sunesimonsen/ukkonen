/**
 * Calculates the edit distance using the Ukkonen algorithm.
 * @param a - The first string.
 * @param b - The second string.
 * @param threshold (default Infinity) - The maximum edit distance to calculate.
 * @returns The edit distance between string `a` and string `b`.
 *          If the distance exceeds the threshold, returns the threshold.
 */
declare function ukkonen(a: string, b: string, threshold?: number): number;

export = ukkonen;
