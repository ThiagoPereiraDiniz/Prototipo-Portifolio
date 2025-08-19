class Tetris {
  constructor() {
    this.canvas = document.getElementById("gameCanvas")
    this.ctx = this.canvas.getContext("2d")
    this.nextCanvas = document.getElementById("nextCanvas")
    this.nextCtx = this.nextCanvas.getContext("2d")

    this.BOARD_WIDTH = 10
    this.BOARD_HEIGHT = 20
    this.BLOCK_SIZE = 30

    this.board = Array(this.BOARD_HEIGHT)
      .fill()
      .map(() => Array(this.BOARD_WIDTH).fill(0))
    this.score = 0
    this.level = 1
    this.lines = 0
    this.dropTime = 0
    this.dropInterval = 1000
    this.lastTime = 0
    this.isPaused = false
    this.gameOver = false

    this.colors = [
      null,
      "#FF0D72", // I
      "#0DC2FF", // O
      "#0DFF72", // T
      "#F538FF", // S
      "#FF8E0D", // Z
      "#FFE138", // J
      "#3877FF", // L
    ]

    this.pieces = [
      [], // Empty
      [[[1, 1, 1, 1]]], // I
      [
        [
          [2, 2],
          [2, 2],
        ],
      ], // O
      [
        [
          [0, 3, 0],
          [3, 3, 3],
        ],
      ], // T
      [
        [
          [0, 4, 4],
          [4, 4, 0],
        ],
      ], // S
      [
        [
          [5, 5, 0],
          [0, 5, 5],
        ],
      ], // Z
      [
        [
          [6, 0, 0],
          [6, 6, 6],
        ],
      ], // J
      [
        [
          [0, 0, 7],
          [7, 7, 7],
        ],
      ], // L
    ]

    this.currentPiece = null
    this.nextPiece = null

    this.init()
  }

  init() {
    this.generatePiece()
    this.generateNextPiece()
    this.updateDisplay()
    this.bindEvents()
    this.gameLoop()
  }

  bindEvents() {
    document.addEventListener("keydown", (e) => {
      if (this.gameOver || this.isPaused) return

      switch (e.code) {
        case "ArrowLeft":
          e.preventDefault()
          this.movePiece(-1, 0)
          break
        case "ArrowRight":
          e.preventDefault()
          this.movePiece(1, 0)
          break
        case "ArrowDown":
          e.preventDefault()
          this.movePiece(0, 1)
          break
        case "ArrowUp":
          e.preventDefault()
          this.rotatePiece()
          break
        case "Space":
          e.preventDefault()
          this.hardDrop()
          break
        case "KeyP":
          e.preventDefault()
          this.togglePause()
          break
      }
    })

    document.getElementById("pauseBtn").addEventListener("click", () => {
      this.togglePause()
    })

    document.getElementById("restartBtn").addEventListener("click", () => {
      this.restart()
    })
  }

  generatePiece() {
    if (this.nextPiece) {
      this.currentPiece = this.nextPiece
    } else {
      const type = Math.floor(Math.random() * 7) + 1
      this.currentPiece = {
        type: type,
        shape: this.pieces[type][0],
        x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(this.pieces[type][0][0].length / 2),
        y: 0,
      }
    }

    if (this.collision()) {
      this.gameOver = true
      this.showGameOver()
    }
  }

  generateNextPiece() {
    const type = Math.floor(Math.random() * 7) + 1
    this.nextPiece = {
      type: type,
      shape: this.pieces[type][0],
      x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(this.pieces[type][0][0].length / 2),
      y: 0,
    }
    this.drawNextPiece()
  }

  movePiece(dx, dy) {
    this.currentPiece.x += dx
    this.currentPiece.y += dy

    if (this.collision()) {
      this.currentPiece.x -= dx
      this.currentPiece.y -= dy

      if (dy > 0) {
        this.placePiece()
        this.clearLines()
        this.generatePiece()
        this.generateNextPiece()
      }
    }
  }

  rotatePiece() {
    const rotated = this.currentPiece.shape[0].map((_, i) => this.currentPiece.shape.map((row) => row[i]).reverse())

    const originalShape = this.currentPiece.shape
    this.currentPiece.shape = [rotated]

    if (this.collision()) {
      this.currentPiece.shape = originalShape
    }
  }

  hardDrop() {
    while (!this.collision()) {
      this.currentPiece.y++
    }
    this.currentPiece.y--
    this.placePiece()
    this.clearLines()
    this.generatePiece()
    this.generateNextPiece()
  }

  collision() {
    const shape = this.currentPiece.shape[0]
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const newX = this.currentPiece.x + x
          const newY = this.currentPiece.y + y

          if (
            newX < 0 ||
            newX >= this.BOARD_WIDTH ||
            newY >= this.BOARD_HEIGHT ||
            (newY >= 0 && this.board[newY][newX] !== 0)
          ) {
            return true
          }
        }
      }
    }
    return false
  }

  placePiece() {
    const shape = this.currentPiece.shape[0]
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== 0) {
          const boardY = this.currentPiece.y + y
          const boardX = this.currentPiece.x + x
          if (boardY >= 0) {
            this.board[boardY][boardX] = this.currentPiece.type
          }
        }
      }
    }
  }

  clearLines() {
    let linesCleared = 0

    for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
      if (this.board[y].every((cell) => cell !== 0)) {
        this.board.splice(y, 1)
        this.board.unshift(Array(this.BOARD_WIDTH).fill(0))
        linesCleared++
        y++ // Check the same line again
      }
    }

    if (linesCleared > 0) {
      this.lines += linesCleared
      this.score += linesCleared * 100 * this.level
      this.level = Math.floor(this.lines / 10) + 1
      this.dropInterval = Math.max(50, 1000 - (this.level - 1) * 50)
      this.updateDisplay()
    }
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = "#000"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw board
    for (let y = 0; y < this.BOARD_HEIGHT; y++) {
      for (let x = 0; x < this.BOARD_WIDTH; x++) {
        if (this.board[y][x] !== 0) {
          this.drawBlock(x, y, this.colors[this.board[y][x]])
        }
      }
    }

    // Draw current piece
    if (this.currentPiece && !this.gameOver) {
      const shape = this.currentPiece.shape[0]
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            this.drawBlock(this.currentPiece.x + x, this.currentPiece.y + y, this.colors[this.currentPiece.type])
          }
        }
      }
    }

    // Draw grid
    this.drawGrid()
  }

  drawBlock(x, y, color) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(x * this.BLOCK_SIZE, y * this.BLOCK_SIZE, this.BLOCK_SIZE, this.BLOCK_SIZE)

    // Add border
    this.ctx.strokeStyle = "#333"
    this.ctx.lineWidth = 1
    this.ctx.strokeRect(x * this.BLOCK_SIZE, y * this.BLOCK_SIZE, this.BLOCK_SIZE, this.BLOCK_SIZE)
  }

  drawGrid() {
    this.ctx.strokeStyle = "#222"
    this.ctx.lineWidth = 1

    for (let x = 0; x <= this.BOARD_WIDTH; x++) {
      this.ctx.beginPath()
      this.ctx.moveTo(x * this.BLOCK_SIZE, 0)
      this.ctx.lineTo(x * this.BLOCK_SIZE, this.canvas.height)
      this.ctx.stroke()
    }

    for (let y = 0; y <= this.BOARD_HEIGHT; y++) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, y * this.BLOCK_SIZE)
      this.ctx.lineTo(this.canvas.width, y * this.BLOCK_SIZE)
      this.ctx.stroke()
    }
  }

  drawNextPiece() {
    this.nextCtx.fillStyle = "#000"
    this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height)

    if (this.nextPiece) {
      const shape = this.nextPiece.shape[0]
      const blockSize = 20
      const offsetX = (this.nextCanvas.width - shape[0].length * blockSize) / 2
      const offsetY = (this.nextCanvas.height - shape.length * blockSize) / 2

      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== 0) {
            this.nextCtx.fillStyle = this.colors[this.nextPiece.type]
            this.nextCtx.fillRect(offsetX + x * blockSize, offsetY + y * blockSize, blockSize, blockSize)

            this.nextCtx.strokeStyle = "#333"
            this.nextCtx.lineWidth = 1
            this.nextCtx.strokeRect(offsetX + x * blockSize, offsetY + y * blockSize, blockSize, blockSize)
          }
        }
      }
    }
  }

  updateDisplay() {
    document.getElementById("score").textContent = this.score
    document.getElementById("level").textContent = this.level
    document.getElementById("lines").textContent = this.lines
  }

  togglePause() {
    this.isPaused = !this.isPaused
    document.getElementById("pauseBtn").textContent = this.isPaused ? "Resume" : "Pause"
  }

  showGameOver() {
    document.getElementById("finalScore").textContent = this.score
    document.getElementById("gameOver").classList.remove("hidden")
  }

  restart() {
    this.board = Array(this.BOARD_HEIGHT)
      .fill()
      .map(() => Array(this.BOARD_WIDTH).fill(0))
    this.score = 0
    this.level = 1
    this.lines = 0
    this.dropTime = 0
    this.dropInterval = 1000
    this.isPaused = false
    this.gameOver = false

    document.getElementById("gameOver").classList.add("hidden")
    document.getElementById("pauseBtn").textContent = "Pause"

    this.generatePiece()
    this.generateNextPiece()
    this.updateDisplay()
  }

  gameLoop(time = 0) {
    const deltaTime = time - this.lastTime
    this.lastTime = time

    if (!this.isPaused && !this.gameOver) {
      this.dropTime += deltaTime

      if (this.dropTime > this.dropInterval) {
        this.movePiece(0, 1)
        this.dropTime = 0
      }
    }

    this.draw()
    requestAnimationFrame((time) => this.gameLoop(time))
  }
}

// Start the game when page loads
window.addEventListener("load", () => {
  new Tetris()
})
