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

edge case(s):  coudln't think of any that aren't already handled in the constraints
control case(s): 1) uniform arr to verify arithmetic consistency --> won't bother with this

pseudocode:
1. handle control case(s) and k= 0 with conditional statements
2. declare var initialized to arr of length 
3. iterate through input arr with for loop
4. declare var to hold sum for curr index
5. if k > 0, sum the next k elements wrapping circularly as needed
6. if k < 0, sum the previous k elements wrapping circularly as needed
7. store sum at ith index of decrypted arr
8. return decrypted arr


--------------------------------Findings--------------------------------
Time Complexity:  
Space Complexity: 
Optimization options: 
considered doubling the array but that would increase space complexity unnecessarily
decided between .map and for loop - went with for loop for clarity and consistency with sliding window pattern
 */

function decryptTheCode(codeArray: number[], k: number): number[] {

    //handle k = 0 condition
    if ( k === 0) return new Array(codeArray.length).fill(0);

    let decryptedCodeArray: number[] = new Array(codeArray.length);

    for (let i = 0; i < codeArray.length; i++) {
        let sum: number = 0;

        if (k > 0) {
            for (let j = 1; j <= k; j++) {
                sum += codeArray[(i + j) % codeArray.length];
            }
            decryptedCodeArray[i] = sum;
        }
        else {
            for (let j = 1; j <= Math.abs(k); j++) {
                sum += codeArray[(i - j + codeArray.length) % codeArray.length];
            }
            decryptedCodeArray[i] = sum;
        }
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
