/*
--------------------------------Leetcode Problem 28--------------------------------
Find the Index of the First Occurrence in a String (Easy))
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Example 1:

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
Example 2:

Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.

Constraints:

1 <= haystack.length, needle.length <= 104
haystack and needle consist of only lowercase English characters.

--------------------------------Approach (Brute Force)--------------------------------
pattern: Sliding Window
input: two str (haystack, needle)
output: num (index of 1st needle or -1)

edge cases: 1) needle longer than haystack, 3) needle = haystack

--------------------------------Findings--------------------------------
Time Complexity:  O(n*m) where n = length of haystack and m = length of needle
Space Complexity: O(m) where m = length of needle
Optimization options: 
Rabin-Karp https://www.geeksforgeeks.org/dsa/rabin-karp-algorithm-for-pattern-searching/
KMP: https://www.geeksforgeeks.org/dsa/kmp-algorithm-for-pattern-searching/
 */

//func w/ 2 params that returns first occurence of needle in haystack or -1
function findNeedleInHaystack(haystack: string, needle: string): number {

    //if statements to handle edge cases
    if (needle.length === 0) return 0;
    if (needle.length > haystack.length) return -1;

    //iterate through haystack
    for (let i = 0; i <= haystack.length - needle.length; i++) {

        //if statement to check if curr slice in haystack matches needle
        if (haystack.slice(i, i + needle.length) === needle) return i;
    }

    //needle not found
    return -1
}
    

//test cases
console.log(findNeedleInHaystack("sadbutsad", "sad")) // 0
console.log(findNeedleInHaystack("leetcode", "leeto")) // -1
console.log(findNeedleInHaystack("", "")) // 0
console.log(findNeedleInHaystack("a", "a")) // 0
console.log(findNeedleInHaystack("a", "b")) // -1
console.log(findNeedleInHaystack("abc", "abcd")) // -1