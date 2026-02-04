// Quick test script to verify phoneme conversion
import { textToVisemes, getVisemeForPhoneme } from './visemeUtils.js';

console.log('Testing: "hi my name is yash"');
const test1 = textToVisemes("hi my name is yash");
console.log(test1.map(v => `${v.viseme}(${v.duration.toFixed(2)}s)`).join(' -> '));

console.log('\nTesting: "wow amazing opportunity"');
const test2 = textToVisemes("wow amazing opportunity");
console.log(test2.map(v => `${v.viseme}(${v.duration.toFixed(2)}s)`).join(' -> '));

console.log('\nExpected phonemes for "wow": w-ow');
console.log('Expected phonemes for "amazing": uh-m-ay-z-ih-ng');
console.log('Expected phonemes for "opportunity": ah-p-er-t-oo-n-ih-t-ee');
