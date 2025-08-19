class Tetris {
  constructor() {
    this.canvas = document.getElementById("gameCanvas")
    this.ctx = this.canvas.getContext("2d")
    this.nextCanvas = document.getElementById("nextCanvas")
    this.nextCtx = this.nextCanvas.getContext("2d")

    this.BOARD_WIDTH = 10
    this.BOARD_HEIGHT = 20
    this.BLOCK_SIZE = 30

    this.board = []
    this.currentPiece = null
    this.nextPiece = null
    this.score = 0
    this.level = 1
    this.lines = 0
    this.dropTime = 0
    this.dropInterval = 1000
    this.lastTime = 0
    this.gameRunning = false
    this.paused = false

    this.pieces = [
      // I piece
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      // O piece
      [
        [1, 1],
        [1, 1],
      ],
      // T piece
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      // S piece
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      // Z piece
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      // J piece
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      // L piece
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    ]

    this.colors = [
      "#64ffda", // I - cyan
      "#ff8a00", // O - orange
      "#b38728", // T - gold
      "#4ecdc4", // S - teal
      "#ff6b6b", // Z - red
      "#4dabf7", // J - blue
      "#69db7c", // L - green
    ]

    this.init()
  }

  init() {
    this.initBoard()
    this.bindEvents()
    this.generatePiece()
    this.generatePiece()
    this.draw()
  }

  initBoard() {
    for (let y = 0; y < this.BOARD_HEIGHT; y++) {
      this.board[y] = []
      for (let x = 0; x < this.BOARD_WIDTH; x++) {
        this.board[y][x] = 0
      }
    }
  }

  bindEvents() {
    document.addEventListener("keydown", (e) => this.handleKeyPress(e))
    document.getElementById("startBtn").addEventListener("click", () => this.startGame())
    document.getElementById("pauseBtn").addEventListener("click", () => this.togglePause())
    document.getElementById("resetBtn").addEventListener("click", () => this.resetGame())
    document.getElementById("restartBtn").addEventListener("click", () => this.restartGame())
  }

  handleKeyPress(e) {
    if (!this.gameRunning || this.paused) return

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
  }

  generatePiece() {
    if (!this.currentPiece) {
      const pieceIndex = Math.floor(Math.random() * this.pieces.length)
      this.currentPiece = {
        shape: this.pieces[pieceIndex],
        color: this.colors[pieceIndex],
        x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(this.pieces[pieceIndex][0].length / 2),
        y: 0,
      }
    } else {
      this.currentPiece = this.nextPiece
    }

    const nextPieceIndex = Math.floor(Math.random() * this.pieces.length)
    this.nextPiece = {
      shape: this.pieces[nextPieceIndex],
      color: this.colors[nextPieceIndex],
      x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(this.pieces[nextPieceIndex][0].length / 2),
      y: 0,
    }

    this.drawNextPiece()
  }

  movePiece(dx, dy) {
    if (this.isValidMove(this.currentPiece.x + dx, this.currentPiece.y + dy, this.currentPiece.shape)) {
      this.currentPiece.x += dx
      this.currentPiece.y += dy
      return true
    }
    return false
  }

  rotatePiece() {
    const rotated = this.rotate(this.currentPiece.shape)
    if (this.isValidMove(this.currentPiece.x, this.currentPiece.y, rotated)) {
      this.currentPiece.shape = rotated
    }
  }

  rotate(matrix) {
    const N = matrix.length
    const rotated = []
    for (let i = 0; i < N; i++) {
      rotated[i] = []
      for (let j = 0; j < N; j++) {
        rotated[i][j] = matrix[N - 1 - j][i]
      }
    }
    return rotated
  }

  hardDrop() {
    while (this.movePiece(0, 1)) {
      this.score += 2
    }
    this.placePiece()
  }

  isValidMove(x, y, shape) {
    for (let py = 0; py < shape.length; py++) {
      for (let px = 0; px < shape[py].length; px++) {
        if (shape[py][px]) {
          const newX = x + px
          const newY = y + py

          if (
            newX < 0 ||
            newX >= this.BOARD_WIDTH ||
            newY >= this.BOARD_HEIGHT ||
            (newY >= 0 && this.board[newY][newX])
          ) {
            return false
          }
        }
      }
    }
    return true
  }

  placePiece() {
    for (let py = 0; py < this.currentPiece.shape.length; py++) {
      for (let px = 0; px < this.currentPiece.shape[py].length; px++) {
        if (this.currentPiece.shape[py][px]) {
          const x = this.currentPiece.x + px
          const y = this.currentPiece.y + py

          if (y < 0) {
            this.gameOver()
            return
          }

          this.board[y][x] = this.currentPiece.color
        }
      }
    }

    this.clearLines()
    this.generatePiece()
    this.score += 10
    this.updateScore()
  }

  clearLines() {
    let linesCleared = 0

    for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
      if (this.board[y].every((cell) => cell !== 0)) {
        this.board.splice(y, 1)
        this.board.unshift(new Array(this.BOARD_WIDTH).fill(0))
        linesCleared++
        y++ // Check the same line again
      }
    }

    if (linesCleared > 0) {
      this.lines += linesCleared
      this.score += linesCleared * 100 * this.level
      this.level = Math.floor(this.lines / 10) + 1
      this.dropInterval = Math.max(50, 1000 - (this.level - 1) * 50)
      this.updateScore()
    }
  }

  updateScore() {
    document.getElementById("score").textContent = this.score
    document.getElementById("level").textContent = this.level
    document.getElementById("lines").textContent = this.lines
  }

  startGame() {
    this.gameRunning = true
    this.paused = false
    document.getElementById("startBtn").disabled = true
    document.getElementById("pauseBtn").disabled = false
    this.gameLoop()
  }

  togglePause() {
    if (!this.gameRunning) return

    this.paused = !this.paused
    document.getElementById("pauseBtn").textContent = this.paused ? "Resume" : "Pause"

    if (!this.paused) {
      this.gameLoop()
    }
  }

  resetGame() {
    this.gameRunning = false
    this.paused = false
    this.score = 0
    this.level = 1
    this.lines = 0
    this.dropTime = 0
    this.dropInterval = 1000

    this.initBoard()
    this.generatePiece()
    this.generatePiece()
    this.updateScore()
    this.draw()

    document.getElementById("startBtn").disabled = false
    document.getElementById("pauseBtn").disabled = true
    document.getElementById("pauseBtn").textContent = "Pause"
    document.getElementById("gameOver").classList.add("hidden")
  }

  restartGame() {
    this.resetGame()
    this.startGame()
  }

  gameOver() {
    this.gameRunning = false
    document.getElementById("finalScore").textContent = this.score
    document.getElementById("gameOver").classList.remove("hidden")
    document.getElementById("startBtn").disabled = false
    document.getElementById("pauseBtn").disabled = true
  }

  gameLoop(time = 0) {
    if (!this.gameRunning || this.paused) return

    const deltaTime = time - this.lastTime
    this.lastTime = time
    this.dropTime += deltaTime

    if (this.dropTime > this.dropInterval) {
      if (!this.movePiece(0, 1)) {
        this.placePiece()
      }
      this.dropTime = 0
    }

    this.draw()
    requestAnimationFrame((time) => this.gameLoop(time))
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = "#0a192f"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw board
    for (let y = 0; y < this.BOARD_HEIGHT; y++) {
      for (let x = 0; x < this.BOARD_WIDTH; x++) {
        if (this.board[y][x]) {
          this.drawBlock(x, y, this.board[y][x])
        }
      }
    }

    // Draw current piece
    if (this.currentPiece) {
      for (let py = 0; py < this.currentPiece.shape.length; py++) {
        for (let px = 0; px < this.currentPiece.shape[py].length; px++) {
          if (this.currentPiece.shape[py][px]) {
            this.drawBlock(this.currentPiece.x + px, this.currentPiece.y + py, this.currentPiece.color)
          }
        }
      }
    }

    // Draw grid
    this.drawGrid()
  }

  drawBlock(x, y, color) {
    const pixelX = x * this.BLOCK_SIZE
    const pixelY = y * this.BLOCK_SIZE

    this.ctx.fillStyle = color
    this.ctx.fillRect(pixelX, pixelY, this.BLOCK_SIZE, this.BLOCK_SIZE)

    // Add border
    this.ctx.strokeStyle = "#172a45"
    this.ctx.lineWidth = 1
    this.ctx.strokeRect(pixelX, pixelY, this.BLOCK_SIZE, this.BLOCK_SIZE)
  }

  drawGrid() {
    this.ctx.strokeStyle = "rgba(100, 255, 218, 0.1)"
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
    this.nextCtx.fillStyle = "#0a192f"
    this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height)

    if (this.nextPiece) {
      const blockSize = 20
      const offsetX = (this.nextCanvas.width - this.nextPiece.shape[0].length * blockSize) / 2
      const offsetY = (this.nextCanvas.height - this.nextPiece.shape.length * blockSize) / 2

      for (let py = 0; py < this.nextPiece.shape.length; py++) {
        for (let px = 0; px < this.nextPiece.shape[py].length; px++) {
          if (this.nextPiece.shape[py][px]) {
            const x = offsetX + px * blockSize
            const y = offsetY + py * blockSize

            this.nextCtx.fillStyle = this.nextPiece.color
            this.nextCtx.fillRect(x, y, blockSize, blockSize)

            this.nextCtx.strokeStyle = "#172a45"
            this.nextCtx.lineWidth = 1
            this.nextCtx.strokeRect(x, y, blockSize, blockSize)
          }
        }
      }
    }
  }
}

// Initialize game when page loads
window.addEventListener("load", () => {
  new Tetris()
})
