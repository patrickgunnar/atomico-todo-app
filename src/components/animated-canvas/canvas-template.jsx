import { useEffect, useRef } from "react"
import styles from './CanvasTemplate.module.css'


const CanvasTemplate = () => {
    let canvasRef = useRef(null)

    useEffect(() => {
        // Getting canvas element
        const canvasElement = canvasRef.current
        if(canvasElement === null) return

        // Setting current canvas context
        const context = canvasElement.getContext('2d')
        if(context === null) return;

        // Object to get current mouse position: x, y
        let mouse = {
            x: undefined,
            y: undefined
        }

        // Array to save draws
        let circles = []
        // The colors used to draw
        let colors = [ // 44 colors
            '#74b2e6',
            '#d8142c',
            '#4c312c',
            '#2d4638',
            '#e9596a',
            '#348897',
            '#96b20d',
            '#2d4e93',
            '#92a73d',
            '#f2b2ae',
            '#e98a3e',
            '#f97d83',
            '#f6b373',
            '#719c99',
            '#ca312a',
            '#7b5657',
            '#3d8f23',
            '#ede2d0',
            '#e98442',
            '#256596',
            '#bb4144',
            '#28111e',
            '#95d925',
            '#df19f3',
            '#e8d349',
            '#efe8d4',
            '#8d122a',
            '#f2c30d',
            '#b0776a',
            '#f97c82',
            '#60c2cb',
            '#ed9d24',
            '#68a63c',
            '#fce6d9',
            '#f0231b',
            '#e48c7b',
            '#2e315b',
            '#7d7318',
            '#405c99',
            '#ffd99e',
            '#b19a9a',
            '#1b524f',
            '#d6d7d7',
            '#ef7d5e',
        ]

        // Class to draw the element
        class Circle {
            context
            colors
            x
            y
            radius
            radiusBackup
            velocityX
            velocityY
            idx

            // Get the context, colors, pos x and y, element radius, velocity of x and y, and index for color
            constructor (context, colors, x, y, radius, velocityX, velocityY) {
                this.context = context
                this.colors = colors
                this.x = x
                this.y = y;
                this.radius = radius
                this.radiusBackup = this.radius
                this.velocityX = velocityX
                this.velocityY = velocityY
                this.idx = Math.floor(Math.random() * this.colors.length)
            }

            _setDraw() {
                this.context.beginPath(); // Prevent connection between elements
                this.context.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), false) // Creating a boll
                this.context.strokeStyle = '#000000' // Setting black to the circle line
                this.context.stroke() // Generates the circle line
                this.context.fill() // Fill the cicle with a color
                this.context.fillStyle = this.colors[this.idx] // Color that filled the circle
            }

            updateDraw() {
                // Updating x position velocity
                if((this.x + this.radius) > window.innerWidth || (this.x - this.radius) < 0) {
                    this.velocityX = -this.velocityX
                    this.idx += 1
                }

                // Updating y position velocity
                if((this.y + this.radius) > document.body.scrollHeight || (this.y - this.radius) < 0) {
                    this.velocityY = -this.velocityY
                    this.idx += 1
                }

                if(this.idx === this.colors.length) this.idx = 0;

                this.x += this.velocityX // Update de X of the circle
                this.y += this.velocityY // Update de Y of the circle

                // Interactivity with the mouse
                if((mouse.x - this.x) < 50 && (mouse.x - this.x) > -50 // Check if the ball position X is higher then -50 and less than 50
                && (mouse.y - this.y) < 50 && (mouse.y - this.y) > -50) { // Check if the ball position Y is higher then -50 and less than 50
                    if(this.radius <= 100) this.radius += 2 // Check if radius is less than 100, if it's true, increase the ball size by 2

                } else if(this.radius > this.radiusBackup) this.radius -= 1 // Decrease the ball size as soon as its get distance from the mouse coordinates 

                // Draw the element
                this._setDraw()
            }
        }

        // Function to generate circle
        const genCircle = (qtd = 100) => {
            context.clearRect(0, 0, canvasElement.width, canvasElement.height) // Clean existing element on DOM
            circles = [] // Clean draws inside the array

            canvasElement.height = document.body.scrollHeight //document.body.scrollHeight // Change canvas width
            canvasElement.width = window.innerWidth // Change canvas height

            mouse['x'] = undefined // Clean mouse x position
            mouse['y'] = undefined // Clean mouse y position

            // Loop to create elements of the draw
            for(let i = 0; i < qtd; i++) {
                let radius = (Math.random() * 10) + 4
                let x = Math.random() * (window.innerWidth - radius * 2) + radius
                let y = Math.random() * (document.body.scrollHeight - radius * 2) + radius
                let velocityY = (Math.random() - 0.5) * 8
                let velocityX = (Math.random() - 0.5) * 7

                // Append into a list the created balls
                circles.push(new Circle(context, colors, x, y, radius, velocityX, velocityY))
            }
        }

        // Start the drawings
        const animate = () => {
            context.clearRect(0, 0, canvasElement.width, canvasElement.height) // Clean existing element on DOM
            circles.map(el => el.updateDraw()) // Update the balls

            requestAnimationFrame(animate) // Generates a loop
        }

        // Starts the creation of the balls
        const startingCreation = () => {
            if(window.innerWidth <= 500) genCircle(100)
            else if(window.innerWidth <= 1000) genCircle(200)
            else if(window.innerWidth <= 1500) genCircle(300)
            else genCircle(450)
        }

        // Events listeners to start and update the draw
        window.addEventListener('resize', () => {
            startingCreation()
        })

        // Event listener to get the mouse movement over the canvas element
        canvasElement.addEventListener('mousemove', (event) => {
            mouse['x'] = event.x
            mouse['y'] = event.y
        })

        // Event listener to track mouse position
        window.addEventListener('mouseout', () => {
            mouse['x'] = undefined
            mouse['y'] = undefined
        })

        // Call balls creator function and animation function
        startingCreation()
        animate()
    }, [])

    // Return a canvas element to be used as background
    return (
        <canvas ref={canvasRef} className={styles.canvas__graphic_template}></canvas>
    )
}

export default CanvasTemplate
