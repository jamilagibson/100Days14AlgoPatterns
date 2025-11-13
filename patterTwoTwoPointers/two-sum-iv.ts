/*
--------------------------------Leetcode Problem 653--------------------------------
Given the root of a binary search tree and an integer k, return true if there exist two elements in the BST such that their sum is equal to k, or false otherwise.

 Example 1:

Input: root = [5,3,6,2,4,null,7], k = 9
Output: true

Example 2:

Input: root = [5,3,6,2,4,null,7], k = 28
Output: false

Constraints:

The number of nodes in the tree is in the range [1, 104].
-104 <= Node.val <= 104
root is guaranteed to be a valid binary search tree.
-105 <= k <= 105

--------------------------------Approach ()--------------------------------
pattern: Two Pointers
input: BST (root), num (k)
output: boolean

edge case(s): single node tree returns false

pseudocode:
1. perform in-order traversal to get sorted array of node values
2. initialize two pointers, left at start (0) and right at end (n-1) of array
3. while left < right:
   a. calculate current sum of values at left and right pointers
   b. if current sum equals k, return true
   c. if current sum < k, increment left pointer to increase sum
   d. if current sum > k, decrement right pointer to decrease sum
4. if loop ends without finding pair, return false 

--------------------------------Findings--------------------------------
Time Complexity: O(n) for in-order traversal + O(n) for two-pointer search = O(n) overall 

New discoveries:
1. When stored in an array, BST formula for left child = 2i + 1, right child = 2i + 2; this isn't used here but useful for heap problems.
*/

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
       this.val = val ?? 0;
       this.left = left ?? null;
       this.right = right ?? null;
    }
}
function findTarget(root: TreeNode | null, k: number): boolean {
    const values: number[] = [];

    // In-order traversal to get sorted values
    function inOrderTraversal(node: TreeNode | null) {
        if (!node) return;
        inOrderTraversal(node.left);
        values.push(node.val);
        inOrderTraversal(node.right);
    }
    inOrderTraversal(root);

    //initialize two pointers
    let left = 0;
    let right = values.length - 1;

    while (left < right) {
        const currentSum = values[left] + values[right];
        if (currentSum === k) {
            return true;
        }
        else if (currentSum < k) {
            left++;
        }
        else {
            right--;
        }
    }
    return false;
}

function buildTree(arr: (number | null)[]): TreeNode | null {
    if (!arr.length || arr[0] === null) return null;
    
    const root = new TreeNode(arr[0]);
    const queue: TreeNode[] = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
        const node = queue.shift()!;
        
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]!);
            queue.push(node.left);
        }
        i++;
        
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]!);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

// test cases:

//From Leetcode problem description
console.log(findTarget(buildTree([5,3,6,2,4,null,7]), 9));

// No valid pair
console.log(findTarget(buildTree([5,3,6,2,4,null,7]), 28));  
// Expected: false (largest sum is 6 + 7 = 13)

// Single node (edge case)
console.log(findTarget(buildTree([1]), 2));                   
// Expected: false (can't make sum with one element)

// Two nodes with valid pair
console.log(findTarget(buildTree([1,null,2]), 3));           
// Expected: true (1 + 2 = 3)

// Test 5: Negative numbers with positive target
console.log(findTarget(buildTree([-5,-3,0,null,null,null,2]), -3)); 
// Expected: true (-5 + 2 = -3)
// In-order: [-5, -3, 0, 2]



    