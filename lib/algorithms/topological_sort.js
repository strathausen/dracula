'use strict';

/* eslint-disable */

/**
 *
 * @param {Graph} graph
 * @returns {Array}
 */
function topologicalSort(graph) {
    var processed = [],
        unprocessed = [],
        queue = [];

    /**
     *
     * @param arr
     * @param callback
     * @this {Object}
     */
    function each(arr, callback) {
        var i = void 0;

        // if Array, then process as array
        if (arr instanceof Array) {
            for (i = 0; i < arr.length; i++) {
                callback.call(arr[i], i);
            }
        }

        // if object, iterate over property/keys
        else {
                for (i in arr) {
                    if (arr.hasOwnProperty(i)) {
                        callback.call(arr[i], i);
                    }
                }
            }
    }

    function processStartingPoint(node) {
        if (node === undefined) {
            throw 'You have a cycle!!';
        }
        each(node.edges, function () {
            node.sortImportance--;
        });
        processed.push(node);
    }

    var populateIndegreesAndUnprocessed = function populateIndegreesAndUnprocessed() {
        each(graph.nodes, function () {
            var self = this;
            unprocessed.push(this);
            if (!Object.prototype.hasOwnProperty.call(self, 'sortImportance')) {
                self.sortImportance = 0;
            }

            each(self.edges, function () {
                self.sortImportance++;
            });
        });
    };

    populateIndegreesAndUnprocessed();

    while (unprocessed.length > 0) {
        for (var i = 0; i < unprocessed.length; i++) {
            var node = unprocessed[i];
            if (node.sortImportance === 0) {
                queue.push(node);
                unprocessed.splice(i, 1); // Remove this node, its all done.
                i--; // decrement i since we just removed that index from the iterated list;
            } else {
                node.sortImportance--;
            }
        }

        if (queue.length > 0) {
            processStartingPoint(queue.shift());
        }
    }

    return processed;
}