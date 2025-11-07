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

pesudocode:
1. 

New discoveries:
1. When stored in an array, BST formula for left child = 2i + 1, right child = 2i + 2
*/