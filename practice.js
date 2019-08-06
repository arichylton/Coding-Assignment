const assert = require('assert');

// PART 1
// ---------------------------------------------------------------- //
// SOLUTION 1
// const checkPhoneNumber = (vanityStr) => {

//     console.time('hey')

//     let numberCodesStr = '22233344455566677778889999';

//     let numStr = vanityStr
//     .split('')
//     .map(letter => letter.replace(/[\\.$|,|;|-]/g, ''))
//     .join('')
//     .replace(/./g, x =>
//         numberCodesStr[(x.charCodeAt()-65)%32] || x
//     );

//     return numStr.length !== 10 ? 'Incorrect amount of characters' : `+1${numStr}`;
// };

// const testStr1 = '365-windows';
// const testStr2 = 'windows';
// const testStr3 = 'jhejwuzhss';

// let test1 = checkPhoneNumber(testStr1);
// let test2 = checkPhoneNumber(testStr2);
// let test3 = checkPhoneNumber(testStr3);

// console.log(test1); // output: +13659463697
// console.log(test2); // output: Incorrect amount of characters
// console.log(test3); // output: +15435989477

// console.timeEnd('hey');

// SOLUTION 
const checkPhoneNumber = (vanityStr) => {
	console.time('hey');

    if (typeof vanityStr !== 'string') return 'Please put in a string value'

	// Key codes to be converted into their desired numbers
	const keyCodes = [
		[ 'A', 'B', 'C' ],
		[ 'D', 'E', 'F' ],
		[ 'G', 'H', 'I' ],
		[ 'J', 'K', 'L' ],
		[ 'M', 'N', 'O' ],
		[ 'P', 'Q', 'R', 'S' ],
		[ 'T', 'U', 'V' ],
		[ 'W', 'X', 'Y', 'Z' ],
		[ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
	];

	let numStr = vanityStr
		.split('')
		.map((letter) => {
			for (let i = 0; i < keyCodes.length; i++) {
				if (keyCodes[i].includes(letter.toUpperCase())) {
					switch (i) {
						case 0:
							letter = '2';
							break;
						case 1:
							letter = '3';
							break;
						case 2:
							letter = '4';
							break;
						case 3:
							letter = '5';
							break;
						case 4:
							letter = '6';
							break;
						case 5:
							letter = '7';
							break;
						case 6:
							letter = '8';
							break;
						case 7:
							letter = '9';
							break;
					}
					return letter;
				}
			}
		})
		.join('');

	return numStr.length !== 10 ? 'Incorrect amount of characters' : `+1${numStr}`;
};

const testStr1 = 0000;
const testStr2 = 'windows';
const testStr3 = 'jhejwuz s34';

let test1 = checkPhoneNumber(testStr1);
let test2 = checkPhoneNumber(testStr2);
let test3 = checkPhoneNumber(testStr3);

console.log(test1); // output: +13659463697
console.log(test2); // output: Incorrect amount of characters
console.log(test3); // output: +15435989477

// console.timeEnd('hey');

// console.log('--------------------------------------------');

// PART 2
// ---------------------------------------------------------------- //

const testVanity1 = '287';
const testVanity2 = '28- 79';
const testVanity3 = '24';

const vanitySuggestion = (digits) => {
    // Check to see if digits.length is between 3 and 10

	if (digits.length < 3 || digits.length > 10) return null;

    // Creating an object to use as a map to loop over
	const map = {
		'2': [ 'a', 'b', 'c' ],
		'3': [ 'd', 'e', 'f' ],
		'4': [ 'g', 'h', 'i' ],
		'5': [ 'j', 'k', 'l' ],
		'6': [ 'm', 'n', 'o' ],
		'7': [ 'p', 'q', 'r', 's' ],
		'8': [ 't', 'u', 'v' ],
		'9': [ 'w', 'x', 'y', 'z' ]
	};
	let combinations = [ '' ];

	// for as many times as there are digits (eg. '3721' => 4 times)
	for (let i = 0; i < digits.length; i++) {
		let digit = digits[i];
		let letters = map[digit];
		let tempArray = [];

		// skip if invalid digit
		if (letters === undefined) continue;

		// for as many times as there are letters (eg. 'abc' => 3 times)
		for (let j = 0; j < letters.length; j++) {
			let letterToAdd = letters[j];
			// for as many times as there are existing combinations
			// (eg. ['ad', 'bd', 'cd'] => 3 times)
			for (let k = 0; k < combinations.length; k++) {
				let combination = combinations[k];
				tempArray.push(combination + letterToAdd);
			}
		}
		combinations = tempArray;
	}
	return combinations.sort().join(' ');
};

const vanityStr1 = vanitySuggestion(testVanity1);
const vanityStr2 = vanitySuggestion(testVanity2);
const vanityStr3 = vanitySuggestion(testVanity3);

// console.log(vanityStr1);
// console.log(vanityStr2);
// console.log(vanityStr3);


// BONUS
// ---------------------------------------------------------------- //

const checkWord = require('check-word');
const words = checkWord('en');

const checkIfWord = (str) => {

	// Check if str exists, if so make it an array
	let strArr = str ? str.split(' ') : [];

    // Filter through strArr to see if word exists using npm module 'check-word'
	let isWordArr = strArr.filter((word) => words.check(word));

	return isWordArr.length
		? `List of english words: ${isWordArr.join(', ')}.`
		: 'No words found with those characters!';
};

// Multiple case tests using the VanitySuggestion return value variables

let testIfWord1 = checkIfWord(vanityStr1);
let testIfWord2 = checkIfWord(vanityStr2);
let testIfWord3 = checkIfWord(vanityStr3);

// console.log(testIfWord1)
// console.log(testIfWord2)
// console.log(testIfWord3);
