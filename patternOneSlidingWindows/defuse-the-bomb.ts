/*
--------------------------------Leetcode Problem 1652--------------------------------
You have a bomb to defuse, and your time is running out! Your informer will provide you with a circular array code of length of n and a key k.

To decrypt the code, you must replace every number. All the numbers are replaced simultaneously.

If k > 0, replace the ith number with the sum of the next k numbers.
If k < 0, replace the ith number with the sum of the previous k numbers.
If k == 0, replace the ith number with 0.
As code is circular, the next element of code[n-1] is code[0], and the previous element of code[0] is code[n-1].

Given the circular array code and an integer key k, return the decrypted code to defuse the bomb!

 

Example 1:

Input: code = [5,7,1,4], k = 3 ***----> my question: if k = -3, wouldn't the output be the same in this example?
Output: [12,10,16,13]
Explanation: Each number is replaced by the sum of the next 3 numbers. The decrypted code is [7+1+4, 1+4+5, 4+5+7, 5+7+1]. Notice that the numbers wrap around.
Example 2:

Input: code = [1,2,3,4], k = 0
Output: [0,0,0,0]
Explanation: When k is zero, the numbers are replaced by 0. 
Example 3:

Input: code = [2,4,9,3], k = -2
Output: [12,5,6,13]
Explanation: The decrypted code is [3+9, 2+3, 4+2, 9+4]. Notice that the numbers wrap around again. If k is negative, the sum is of the previous numbers.
 

Constraints:

n == code.length
1 <= n <= 100
1 <= code[i] <= 100
-(n - 1) <= k <= n - 1

--------------------------------Approach (Brute Force)--------------------------------
pattern: Sliding Window
input: arr of nums (code), num (integer to determine sum direction and number of elements to sum) 
output: decrypted arr of nums

edge case(s):  k = 0 returns arr of 0s
control case(s): uniform arr to verify arithmetic consistency --> won't bother with this b/c handled w/ constraints

pseudocode:
1. handle k= 0 with conditional statement
2. declare var initialized to arr of length 
3. determine window start position based on sign of k
4. calculate initial window sum for position 0
5. store initial sum in result[0]
6. slide window through remaining positions (1 to n-1):
   a. remove element leaving the window
   b. add element entering the window
   c. store updated sum in result[i]
7. return result array

Window positioning:
- if k > 0: window starts at index 1 (next k elements)
- if k < 0: window starts at index n+k (previous |k| elements, wrapping around)


--------------------------------Findings--------------------------------
Time Complexity: O(n) single pass through code array
Space Complexity: O(1) ignoring output arr or O(n) including output arr
Optimization: none identified

Previous approach used nested loops (O(n*k))
New approach reuses calculations by maintaining running sum
For n=100, k=50: reduces from ~5000 operations to ~150 operations
 */

function decryptTheCode(codeArray: number[], k: number): number[] {
    const arrayLength = codeArray.length;
    
    // Handle k = 0 case
    if (k === 0) return new Array(arrayLength).fill(0);
    
    const decryptedCodeArray: number[] = new Array(arrayLength);
    let windowSum = 0;
    
    // Determine window start and direction based on k
    const windowStartIndex = k > 0 ? 1 : arrayLength + k;
    const windowEndIndex = k > 0 ? k : arrayLength - 1;
    
    // Calculate initial window sum for position 0
    for (let i = windowStartIndex; i <= windowEndIndex; i++) {
        windowSum += codeArray[i % arrayLength];
    }
    decryptedCodeArray[0] = windowSum;
    
    // Slide window through remaining positions
    for (let i = 1; i < arrayLength; i++) {
        // Remove element leaving the window
        windowSum -= codeArray[(windowStartIndex + i - 1) % arrayLength];
        
        // Add element entering window
        windowSum += codeArray[(windowEndIndex + i) % arrayLength];
        
        // Store sum for current position
        decryptedCodeArray[i] = windowSum;
    }
    
    return decryptedCodeArray;
}

//test cases
console.log(decryptTheCode([5,7,1,4], 3));   // [12,10,16,13]
console.log(decryptTheCode([1,2,3,4], 0));   // [0,0,0,0]
console.log(decryptTheCode([2,4,9,3], -2));  // [12,5,6,13]

// Extra tests
console.log(decryptTheCode([10], 0));        // [0] (n=1, k=0)
console.log(decryptTheCode([5,2,8,3], -1));  // [3,5,2,8] (previous 1)
console.log(decryptTheCode([5,7,1,4], 2));   // [8,5,9,12] 
console.log(decryptTheCode([5,7,1,4], -2));  // [5, 9, 12, 8]   
