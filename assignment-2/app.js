const SIZE = 15;

const patterns = {
	0: ['top', 'bottom', 'left', 'right'],
	1: ['right'],
	2: ['top', 'bottom', 'middle', 'right-half-top', 'left-half-bottom'],
	3: ['top', 'bottom', 'right', 'middle'],
	4: ['middle', 'right', 'left-half-top'],
	5: ['top', 'left-half-top', 'middle', 'right-half-bottom', 'bottom'],
	6: ['top', 'left', 'bottom', 'middle', 'right-half-bottom'],
	7: ['top', 'right'],
	8: ['top', 'left', 'right', 'bottom', 'middle'],
	9: ['top', 'right', 'bottom', 'middle', 'left-half-top'],
};

const drawDigit = (digit) => {
	const grid = Array.from(Array(15)).map(() => Array.from(Array(15)).map(() => ' '));

	const pattern = patterns[digit];

	for (const side of pattern) {
		switch (side) {
			case 'top':
				grid[0].fill('*');
				break;
			case 'bottom':
				grid[SIZE - 1].fill('*');
				break;
			case 'right':
				for (const row of grid) {
					row[SIZE - 1] = '*';
				}
				break;
			case 'left':
				for (const row of grid) {
					row[0] = '*';
				}
				break;
			case 'middle':
				grid[Math.floor(SIZE / 2)].fill('*');
				break;
			case 'right-half-top':
				for (let i = 0; i < Math.floor(SIZE / 2); i++) {
					grid[i][SIZE - 1] = '*';
				}
				break;
			case 'left-half-bottom':
				for (let i = Math.floor(SIZE / 2); i < SIZE; i++) {
					grid[i][0] = '*';
				}
				break;
			case 'left-half-top':
				for (let i = 0; i < Math.floor(SIZE / 2); i++) {
					grid[i][0] = '*';
				}
				break;
			case 'right-half-bottom':
				for (let i = Math.floor(SIZE / 2); i < SIZE; i++) {
					grid[i][SIZE - 1] = '*';
				}
				break;
			default:
				break;
		}
	}

	console.log(grid.map((g) => g.join(' ')).join('\n'));
};

const drawLastTwoDigit = (phone) => {
	const lastTwoDigit = phone % 100;
	const digitArray = lastTwoDigit
		.toString()
		.split('')
		.map((digit) => Number(digit));

	for (const digit of digitArray) {
		drawDigit(digit);
		console.log('\n');
	}
};

drawLastTwoDigit(99112157);
