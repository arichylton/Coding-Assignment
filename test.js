const assert = require('assert');

// PROBLEM 1
// ------------------------------------------------------------------------------------------------------------- //

const checkPhoneNumber = (vanityStr) => {
    // checks to see if vanityStr is a string
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

// PROBLEM 2
// ------------------------------------------------------------------------------------------------------------- //

const vanitySuggestion = (digits) => {
    // Check to see if digits.length is between 3 and 10 and if digits is a string
    if (typeof digits !== 'string') return 'Please put in a string value'
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

const vanityStr1 = vanitySuggestion('287');
const vanityStr2 = vanitySuggestion('28- 79');
const vanityStr3 = vanitySuggestion('24');

// BONUS
// ------------------------------------------------------------------------------------------------------------- //

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

// TESTING RESULTS FOR ALL PROBLEMS
// ------------------------------------------------------------------------------------------------------------- //

describe('Coding Assignment', () => {
    // TESTING PROBLEM 1
    describe('Problem 1', () => {
        it('should return corresponding valid E.164 format phone number', () => {
            assert.equal(checkPhoneNumber('365-windows'), '+13659463697');
        });
        it('should return corresponding valid E.164 format phone number', () => {
            assert.equal(checkPhoneNumber('jhejwuzhss'), '+15435989477');
        });
        it('should return incorrect number of characters', () => {
            assert.equal(checkPhoneNumber('windows'), 'Incorrect amount of characters');
        });
        it('should return an error telling the user to use a string value', () => {
            assert.equal(checkPhoneNumber(555), 'Please put in a string value');
        });
    });

    // TESTING PROBLEM 2
    describe('Problem 2', () => {
        it('should return string of permutable combinations', () => {
            assert.equal(vanitySuggestion('287'), 'atp atq atr ats aup auq aur aus avp avq avr avs btp btq btr bts bup buq bur bus bvp bvq bvr bvs ctp ctq ctr cts cup cuq cur cus cvp cvq cvr cvs');
        });
        it('should return string of permutable combinations', () => {
            assert.equal(vanitySuggestion('28- 79'), 'atpw atpx atpy atpz atqw atqx atqy atqz atrw atrx atry atrz atsw atsx atsy atsz aupw aupx aupy aupz auqw auqx auqy auqz aurw aurx aury aurz ausw ausx ausy ausz avpw avpx avpy avpz avqw avqx avqy avqz avrw avrx avry avrz avsw avsx avsy avsz btpw btpx btpy btpz btqw btqx btqy btqz btrw btrx btry btrz btsw btsx btsy btsz bupw bupx bupy bupz buqw buqx buqy buqz burw burx bury burz busw busx busy busz bvpw bvpx bvpy bvpz bvqw bvqx bvqy bvqz bvrw bvrx bvry bvrz bvsw bvsx bvsy bvsz ctpw ctpx ctpy ctpz ctqw ctqx ctqy ctqz ctrw ctrx ctry ctrz ctsw ctsx ctsy ctsz cupw cupx cupy cupz cuqw cuqx cuqy cuqz curw curx cury curz cusw cusx cusy cusz cvpw cvpx cvpy cvpz cvqw cvqx cvqy cvqz cvrw cvrx cvry cvrz cvsw cvsx cvsy cvsz');
        });
        it('should return null', () => {
            assert.equal(vanitySuggestion('24'), null);
        });
        it('should return error telling user to put in string value', () => {
            assert.equal(vanitySuggestion(2467), 'Please put in a string value');
        });
    });

    // TESTING BONUS
    describe('BONUS', () => {
        it('should return list of words that match vanity suggestions', () => {
            assert.equal(checkIfWord(vanityStr1), 'List of english words: ats, bur, bus, cup, cur.');
        });
        it('should return list of words that match vanity suggestions', () => {
            assert.equal(checkIfWord(vanityStr2), 'List of english words: bury, busy.');
        });
        it('should return incorrect number of characters', () => {
            assert.equal(checkIfWord(vanityStr3), 'No words found with those characters!');
        });
    })
});


        