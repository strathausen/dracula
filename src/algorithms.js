/* eslint-disable */

/*
 * Various algorithms and data structures, licensed under the MIT-license.
 * (c) 2010 by Johann Philipp Strathausen <philipp@stratha.us>
 *
 */

/*
   Ford-Fulkerson

    Max-Flow-Min-Cut Algorithm finding the maximum flow through a directed
    graph from source to sink.


        Complexity

    O(E * max(f)), max(f) being the maximum flow


        Description

    As long as there is an open path through the residual graph, send the
    minimum of the residual capacities on the path.


        Constraints

    The algorithm works only if all weights are integers. Otherwise it is
    possible that the Ford–Fulkerson algorithm will not converge to the maximum
    value.


        Input

    g - Graph object
    s - Source ID
    t - Target (sink) ID


        Output

    Maximum flow from Source s to Target t

 */
/*
        Edmonds-Karp

    Max-Flow-Min-Cut Algorithm finding the maximum flow through a directed
    graph from source to sink. An implementation of the Ford-Fulkerson
    algorithm.


        Complexity

    O(|V|*|E|²)


        Input

    g - Graph object (with node and edge lists, capacity is a property of edge)
    s - source ID
    t - sink ID

 */
function edmonds_karp(g, s, t) {

}

/*
    Quick Sort:
        1. Select some random value from the array, the median.
        2. Divide the array in three smaller arrays according to the elements
           being less, equal or greater than the median.
        3. Recursively sort the array containg the elements less than the
           median and the one containing elements greater than the median.
        4. Concatenate the three arrays (less, equal and greater).
        5. One or no element is always sorted.
    TODO: This could be implemented more efficiently by using only one array object and several pointers.
*/
function quickSort(arr) {

  /* recursion anchor: one element is always sorted */
  if (arr.length <= 1) return arr;

  /* randomly selecting some value */
  let median = arr[Math.floor(Math.random() * arr.length)];
  let arr1 = [], arr2 = [], arr3 = [], i;
  for (i in arr) {
    if (arr[i] < median) {
      arr1.push(arr[i]);
    }
    if (arr[i] === median) {
      arr2.push(arr[i]);
    }
    if (arr[i] > median) {
      arr3.push(arr[i]);
    }
  }

  /* recursive sorting and assembling final result */
  return quickSort(arr1).concat(arr2).concat(quickSort(arr3));
}

/*
   Selection Sort:
   1. Select the minimum and remove it from the array
   2. Sort the rest recursively
   3. Return the minimum plus the sorted rest
   4. An array with only one element is already sorted
   */
function selectionSort(arr) {

  /* recursion anchor: one element is always sorted */
  if (arr.length === 1) return arr;
  let minimum = Infinity;
  let index;
  for (let i in arr) {
    if (arr[i] < minimum) {
      minimum = arr[i];
      index = i; /* remember the minimum index for later removal */
    }
  }

  /* remove the minimum */
  arr.splice(index, 1);

  /* assemble result and sort recursively (could be easily done iteratively as well)*/
  return [minimum].concat(selectionSort(arr));
}

/*
   Merge Sort:
   1. Cut the array in half
   2. Sort each of them recursively
   3. Merge the two sorted arrays
   4. An array with only one element is considered sorted

*/
function mergeSort(arr) {

  /* merges two sorted arrays into one sorted array */
  function merge(a, b) {

    /* result set */
    let c = [];

    /* as long as there are elements in the arrays to be merged */
    while (a.length > 0 || b.length > 0) {

      /* are there elements to be merged, if yes, compare them and merge */
      let n = a.length > 0 && b.length > 0 ? a[0] < b[0] ? a.shift() : b.shift() : b.length > 0 ? b.shift() : a.length > 0 ? a.shift() : null;

      /* always push the smaller one onto the result set */
      if (n !== null) {
        c.push(n);
      }
    }
    return c;
  }

  /* this mergeSort implementation cuts the array in half, wich should be fine with randomized arrays, but introduces the risk of a worst-case scenario */
  median = Math.floor(arr.length / 2);
  let part1 = arr.slice(0, median); /* for some reason it doesn't work if inserted directly in the return statement (tried so with firefox) */
  let part2 = arr.slice(median - arr.length);
  return arr.length <= 1 ? arr : merge(
      mergeSort(part1), /* first half */
      mergeSort(part2) /* second half */
      );
}

/* Balanced Red-Black-Tree */
function RedBlackTree(arr) {

}

function BTree(arr) {

}

function NaryTree(n, arr) {

}

/**
 * Knuth-Morris-Pratt string matching algorithm - finds a pattern in a text.
 * FIXME: Doesn't work correctly yet.
 */
function kmp(p, t) {

  /**
   * PREFIX, OVERLAP or FALIURE function for KMP. Computes how many iterations
   * the algorithm can skip after a mismatch.
   *
   * @input p - pattern (string)
   * @result array of skippable iterations
   */
  function prefix(p) {

    /* pi contains the computed skip marks */
    let pi = [0], k = 0;
    for (q = 1; q < p.length; q++) {
      while (k > 0 && (p.charAt(k) !== p.charAt(q)))
        k = pi[k-1];

      if (p.charAt(k) === p.charAt(q)) {
        k++;
      }

      pi[q] = k;
    }
    return pi;
  }

  /* The actual KMP algorithm starts here. */

  let pi = prefix(p), q = 0, result = [];

  for (let i = 0; i < t.length; i++) {

    /* jump forward as long as the character doesn't match */
    while ((q > 0) && (p.charAt(q) !== t.charAt(i)))
      q = pi[q];

    if (p.charAt(q) === t.charAt(i)) {
      q++;
    }

    if (q === p.length) {
      result.push(i - p.length);
      q = pi[q];
    }
  }

  return result;
}

/* step for algorithm visualisation */
function step(comment, funct) {
  funct();
}
