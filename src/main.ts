const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;
const CELL_SIZE = 40;
const ROWS = GAME_HEIGHT / CELL_SIZE
const COLS = GAME_WIDTH / CELL_SIZE

type Vec2 = {
	x: number,
	y: number,
}

function drawMap(ctx: CanvasRenderingContext2D, map: number[][]): void {
	for (let y = 0; y < GAME_HEIGHT; y += CELL_SIZE) {
		for (let x = 0; x < GAME_HEIGHT; x += CELL_SIZE) {
			if (map[y / CELL_SIZE][x / CELL_SIZE]) {
				ctx.fillStyle = 'blue';
				ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
			} else {
				ctx.fillStyle = 'white';
				ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
			}
		}
	}
	for (let y = 0; y <= GAME_HEIGHT; y += CELL_SIZE) {
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.moveTo(0, y);
		ctx.lineTo(GAME_WIDTH, y);
		ctx.closePath();
		ctx.stroke();
	}
	for (let x = 0; x <= GAME_WIDTH; x += CELL_SIZE) {
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.moveTo(x, 0);
		ctx.lineTo(x, GAME_HEIGHT);
		ctx.closePath();
		ctx.stroke();
	}
}

// param should be vec2
function getCell(x0: number, y0: number): Vec2 {
	return { x: Math.floor(x0 / CELL_SIZE), y: Math.floor(y0 / CELL_SIZE)}
}

function markCell(ctx: CanvasRenderingContext2D, map: number[][], x: number, y: number): void {
	map[y][x] = map[y][x] ? 0 : 1;
}

function equalMaps(a: number[][], b: number[][]): boolean {
	for (let y = 0; y < ROWS; ++y) {
		for (let x = 0; x < COLS; ++x) {
			if (a[y][x] !== b[y][x]) return false;
		}
	}
	return true;
}

function getNeighbors(map: number[][], cx: number, cy: number): number {
	let n = 0;
	for (let y = cy - 1; y <= cy + 1; ++y) {
		for (let x = cx - 1; x <= cx + 1; ++x) {
			if ((y < 0 || y >= ROWS) || (x < 0 || x >= COLS)) continue;
			if (y === cy && x === cx) continue;
			if (map[y][x]) n += 1;	
		}
	}
	return n;
}

(() => {
	const game = <HTMLCanvasElement> document.getElementById('game'); 
	if (game === null) throw new Error('ERROR: could not get game');

	const ctx = game.getContext('2d');
	if (ctx === null) throw new Error('ERROR: could not get context');

	const start = document.getElementById('start');
	if (start === null) throw new Error('ERROR: `start`-btn was not found');
	
	// const map = Array(ROWS).fill(Array(COLS).fill(0));

	const map = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	]

	drawMap(ctx, map);

	game.addEventListener('click', (event) => {
		const pos = getCell(event.offsetX, event.offsetY);
		markCell(ctx, map, pos.x, pos.y);
		drawMap(ctx, map);
	})

	start.addEventListener('click', () => {
		let i = 0;
		let oldMap = [...map];
		while (!equalMaps(map, oldMap) || i === 0) {
			i += 1;
			console.log("INFO: iteration", i);
			console.log(map);
			for (let cy = 0; cy < ROWS; ++cy) {
				for (let cx = 0; cx < COLS; ++cx) {
					const neighbors = getNeighbors(oldMap, cx, cy);
					console.log(cx, cy, neighbors);
					if (neighbors > 0) console.log(cx, cy, neighbors);
					if (neighbors < 2 || neighbors > 3) map[cy][cx] = 0;
					else if (neighbors == 3 && !map[cy][cx]) map[cy][cx] = 1;
				}
			}
			oldMap = [...map];
		}

		console.log("INFO: simulation over...");
	})
})()
