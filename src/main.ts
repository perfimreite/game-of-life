const GAME_WIDTH = 800;
const GAME_HEIGHT = 800;
const CELL_SIZE = 40;
const ROWS = GAME_HEIGHT / CELL_SIZE
const COLS = GAME_WIDTH / CELL_SIZE
const SLEEP_MS = 500;

type Vec2 = {
    x: number,
    y: number,
}

type Grid = number[][]

function drawGrid(ctx: CanvasRenderingContext2D, grid: Grid): void {
    // draw cells
    for (let y = 0; y < GAME_HEIGHT; y += CELL_SIZE) {
        for (let x = 0; x < GAME_HEIGHT; x += CELL_SIZE) {
            if (grid[y / CELL_SIZE][x / CELL_SIZE] === 1) {
                ctx.fillStyle = "blue";
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    // draw grid lines
    for (let y = 0; y < GAME_HEIGHT; y += CELL_SIZE) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(0, y);
        ctx.lineTo(GAME_WIDTH - 1, y);
        ctx.closePath();
        ctx.stroke();
    }
    for (let x = 0; x < GAME_WIDTH; x += CELL_SIZE) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(x, 0);
        ctx.lineTo(x, GAME_HEIGHT - 1);
        ctx.closePath();
        ctx.stroke();
    }
}

function getCell(pos: Vec2): Vec2 {
    return { x: Math.floor(pos.x / CELL_SIZE), y: Math.floor(pos.y / CELL_SIZE)}
}

function markCell(grid: Grid, pos: Vec2): void {
    grid[pos.y][pos.x] = grid[pos.y][pos.x] === 0 ? 1 : 0;
}

function equalGrids(a: Grid, b: Grid): boolean {
    for (let y = 0; y < ROWS; ++y) {
        for (let x = 0; x < COLS; ++x) {
            if (a[y][x] !== b[y][x]) return false;
        }
    }
    return true;
}

function oob(x: number, y: number): boolean {
    return y < 0 || y >= ROWS || x < 0 || x >= COLS;
}

function neighbors(grid: Grid, cell: Vec2): number {
    let n = 0;
    for (let y = cell.y - 1; y <= cell.y + 1; ++y) {
        for (let x = cell.x - 1; x <= cell.x + 1; ++x) {
            if (oob(x, y) || (y === cell.y && x === cell.x)) {
                continue;
            }

            if (grid[y][x] === 1) {
                n += 1
            }
        }
    }
    return n;
}

function clearGrid(): Grid {
    console.clear();
    let grid = [];
    for (let y = 0; y < ROWS; y++) {
        let row = [];
        for (let x = 0; x < COLS; x++) {
            row.push(0);
        }
        grid.push(row);
    }
    return grid;
}

(() => {
    const game = <HTMLCanvasElement> document.getElementById("game"); 
    if (game === null) throw new Error("ERROR: could not get game");

    const ctx = game.getContext("2d");
    if (ctx === null) throw new Error("ERROR: could not get context");

    const start = document.getElementById("start");
    if (start === null) throw new Error("ERROR: `start`-btn was not found");

    const clearGridBtn = document.getElementById("clear-grid");
    if (clearGridBtn === null) throw new Error("ERROR: `clearGridBtn` was not found");

    let grid = clearGrid();
    drawGrid(ctx, grid);

    clearGridBtn.addEventListener("click", () => {
        grid = clearGrid();
        drawGrid(ctx, grid);
    })

    game.addEventListener("click", (e) => {
        const pos = getCell({ x: e.offsetX, y: e.offsetY });
        markCell(grid, pos);
        drawGrid(ctx, grid);
    })

    start.addEventListener("click", async () => {
        let finished = false;
        while (!finished){
            let nextGrid = clearGrid();

            for (let cy = 0; cy < ROWS; ++cy) {
                for (let cx = 0; cx < COLS; ++cx) {
                    const cell = { x: cx, y: cy };
                    const n = neighbors(grid, cell);

                    if (n == 3 || (n == 2 && grid[cy][cx] === 1)) {
                        nextGrid[cy][cx] = 1;
                    }
                }
            }

            finished = equalGrids(grid, nextGrid);

            grid = [...nextGrid];
            drawGrid(ctx, grid);

            await new Promise(resolve => setTimeout(resolve, SLEEP_MS));
        }
    })
})()

