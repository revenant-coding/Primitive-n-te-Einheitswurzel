let THICKNESS = 1
const WIDTH = 801
const HEIGHT = 801
const XMAX = 2
const XMIN = -2
const YMAX = 2
const YMIN = -2
const XFACTOR = WIDTH / (XMAX - XMIN)
const YFACTOR = HEIGHT / (YMAX - YMIN)
const e = Math.E
const pi = Math.PI

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = WIDTH
canvas.height = HEIGHT

const numberP = document.getElementById('number')

canvas.addEventListener('mousemove', (event) => {
    const x = event.offsetX
    const y = event.offsetY

    const xCanvas = (x / XFACTOR) + XMIN
    const yCanvas = ((HEIGHT - y) / YFACTOR) + YMIN
    
    numberP.style = `z-index: 10; position: fixed; top: ${y}px; left: ${x + 30}px`
    numberP.innerText = `${xCanvas.toFixed(3)} + ${yCanvas.toFixed(3)}i`
})

function convert(x, y) {
    let xCanvas = (x - XMIN) * XFACTOR
    let yCanvas = HEIGHT - (y - YMIN) * YFACTOR
    return [xCanvas, yCanvas]
}

function drawW(n, lines = false) {
    let prevCoordinates = null
    let first = null
    for (i = 0; i < n; i++) {
        

        const wpow_r = Math.cos((2 * pi * i) / n)
        const wpow_i = Math.sin((2 * pi * i) / n)

        const coordinates = convert(wpow_r, wpow_i)

        // draw point
                
        

        if (first === null) {
            first = coordinates
        }

        if (lines) {
            ctx.strokeStyle = 'blue'
            if (prevCoordinates) {
                ctx.beginPath()
                ctx.moveTo(prevCoordinates[0], prevCoordinates[1])
                ctx.lineTo(coordinates[0], coordinates[1])
                ctx.stroke()
            }
            prevCoordinates = coordinates

            if (i === n - 1) {
                ctx.beginPath()
                ctx.moveTo(coordinates[0], coordinates[1])
                ctx.lineTo(first[0], first[1])
                ctx.stroke()
            }
        }

        ctx.fillStyle = 'red'
        ctx.fillRect(coordinates[0], coordinates[1], THICKNESS, THICKNESS)
        ctx.stroke()
        
    }

   

}

function drawCoordinateSystem() {
    ctx.strokeStyle = 'black'
    //x Achse
    ctx.beginPath()
    ctx.moveTo(0, HEIGHT / 2)
    ctx.lineTo(WIDTH, HEIGHT / 2)
    ctx.stroke()

    //y Achse
    ctx.beginPath()
    ctx.moveTo(WIDTH / 2, 0)
    ctx.lineTo(WIDTH / 2, HEIGHT)
    ctx.stroke()
}

function drawCoordinateAxisDivision() {
    ctx.fillStyle = 'black'
    //x Achse
    for (let x = XMIN; x <= XMAX; x++) {
        const coordinates = convert(x, 0);
        ctx.beginPath();
        ctx.moveTo(coordinates[0], coordinates[1] - 5);
        ctx.lineTo(coordinates[0], coordinates[1] + 5);
    
       
        if (x === -1 || x === 1) {
            ctx.font = '12px Arial';
            ctx.fillText(x, coordinates[0] - 5, coordinates[1] + 17);
        }
        ctx.stroke();
    }
    
    //y Achse
    for (let y = YMIN; y <= YMAX; y++) {
        const coordinates = convert(0, y);
        ctx.beginPath();
        ctx.moveTo(coordinates[0] - 5, coordinates[1]);
        ctx.lineTo(coordinates[0] + 5, coordinates[1]);
    
        
        if (y === -1 || y === 1) {
            ctx.font = '12px Arial';
            ctx.fillText(y, coordinates[0] - 20, coordinates[1] + 3);
        }
        ctx.stroke();
    }


}

function draw(n, lines = false) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    drawCoordinateSystem()
    drawCoordinateAxisDivision()
    drawW(n, lines)
}

const lineCheckbox = document.getElementById('show-lines')

lineCheckbox.addEventListener('change', () => {
    draw(n, lineCheckbox.checked)
})

var n = 5
const inputN = document.getElementById('n-input')

inputN.addEventListener('change', () => {
    n = parseInt(inputN.value)
    
    draw(n, lineCheckbox.checked)
})

const inputThickness = document.getElementById('thickness')

inputThickness.addEventListener('change', () => {
    THICKNESS = parseInt(inputThickness.value)
    
    draw(n, lineCheckbox.checked)
})



draw(n, lineCheckbox.checked)
