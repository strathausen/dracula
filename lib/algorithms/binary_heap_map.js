'use strict';

/* eslint-disable */
/*
   A simple binary min-heap serving as a priority queue
   - takes an array as the input, with elements having a key property
   - elements will look like this:
        {
            key: "... key property ...",
            value: "... element content ..."
        }
    - provides insert(), min(), extractMin() and heapify()
    - example usage (e.g. via the Firebug or Chromium console):
        var x = {foo: 20, hui: "bla"};
        var a = new BinaryMinHeap([x,{foo:3},{foo:10},{foo:20},{foo:30},{foo:6},{foo:1},{foo:3}],"foo");
        console.log(a.extractMin());
        console.log(a.extractMin());
        x.foo = 0; // update key
        a.heapify(); // call this always after having a key updated
        console.log(a.extractMin());
        console.log(a.extractMin());
    - can also be used on a simple array, like [9,7,8,5]
 */
function BinaryMinHeap(array, key) {

  /* Binary tree stored in an array, no need for a complicated data structure */
  var tree = [];

  key = key || 'key';

  /* Calculate the index of the parent or a child */
  var parent = function parent(index) {
    return Math.floor((index - 1) / 2);
  };
  var right = function right(index) {
    return 2 * index + 2;
  };
  var left = function left(index) {
    return 2 * index + 1;
  };

  /* Helper function to swap elements with their parent
     as long as the parent is bigger */
  function bubble_up(i) {
    var p = parent(i);
    while (p >= 0 && tree[i][key] < tree[p][key]) {

      /* swap with parent */
      tree[i] = tree.splice(p, 1, tree[i])[0];

      /* go up one level */
      i = p;
      p = parent(i);
    }
  }

  /* Helper function to swap elements with the smaller of their children
     as long as there is one */
  function bubble_down(i) {
    var l = left(i);
    var r = right(i);

    /* as long as there are smaller children */
    while (tree[l] && tree[i][key] > tree[l][key] || tree[r] && tree[i][key] > tree[r][key]) {

      /* find smaller child */
      var child = tree[l] ? tree[r] ? tree[l][key] > tree[r][key] ? r : l : l : l;

      /* swap with smaller child with current element */
      tree[i] = tree.splice(child, 1, tree[i])[0];

      /* go up one level */
      i = child;
      l = left(i);
      r = right(i);
    }
  }

  /* Insert a new element with respect to the heap property
     1. Insert the element at the end
     2. Bubble it up until it is smaller than its parent */
  this.insert = function (element) {

    /* make sure there's a key property */
    if (element[key] === undefined) {
      element = { key: element };
    }

    /* insert element at the end */
    tree.push(element);

    /* bubble up the element */
    bubble_up(tree.length - 1);
  };

  /* Only show us the minimum */
  this.min = function () {
    return tree.length === 1 ? undefined : tree[0];
  };

  /* Return and remove the minimum
     1. Take the root as the minimum that we are looking for
     2. Move the last element to the root (thereby deleting the root)
     3. Compare the new root with both of its children, swap it with the
        smaller child and then check again from there (bubble down)
  */
  this.extractMin = function () {
    var result = this.min();

    /* move the last element to the root or empty the tree completely */
    /* bubble down the new root if necessary */
    if (tree.length === 1) {
      tree = [];
    } else {
      tree[0] = tree.pop();
      bubble_down(0);
    }

    return result;
  };

  /* currently unused, TODO implement */
  this.changeKey = function (index, key) {
    throw 'function not implemented';
  };

  this.heapify = function () {
    var start = void 0;
    for (start = Math.floor((tree.length - 2) / 2); start >= 0; start--) {
      bubble_down(start);
    }
  };

  /* insert the input elements one by one only when we don't have a key property (TODO can be done more elegant) */
  var i = void 0;
  for (i in array || []) {
    this.insert(array[i]);
  }
}