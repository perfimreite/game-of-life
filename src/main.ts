const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;
const CELL_SIZE = 50;

type Vec2 = {
    x: number,
    y: number,
}

// function Vec2Add(a: Vec2, b: Vec2): Vec2 {
//     return { 
//         x: a.x + b.x,
//         y: a.y + b.y
//     };
// }
//
// function Vec2Sub(a: Vec2, b: Vec2): Vec2 {
//     return { 
//         x: a.x - b.x,
//         y: a.y - b.y
//     };
// }

function drawCells(ctx: CanvasRenderingContext2D, map: number[][]): void {
     for (let y = 0; y < GAME_HEIGHT; y += CELL_SIZE) {
        for (let x = 0; x < GAME_WIDTH; x += CELL_SIZE) {
            if (map[y / CELL_SIZE][x / CELL_SIZE]) {
                ctx.fillStyle = 'red';
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            } else {
                ctx.fillStyle = 'green';
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

function drawGrid(ctx: CanvasRenderingContext2D): void {
    const color = 'white';
    for (let y = 0; y <= GAME_HEIGHT; y += CELL_SIZE) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(0, y);
        ctx.lineTo(GAME_WIDTH, y);
        ctx.closePath();
        ctx.stroke();
    }
    for (let x = 0; x <= GAME_WIDTH; x += CELL_SIZE) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, GAME_HEIGHT);
        ctx.closePath();
        ctx.stroke();
    }
}

(() => {
    const game = <HTMLCanvasElement> document.getElementById('game'); 
    if (game === null) throw new Error('ERROR: could not get game');

    const ctx = game.getContext('2d');
    if (ctx === null) throw new Error('ERROR: could not get context');

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
    ];

    drawCells(ctx, map);
    drawGrid(ctx);
})()
