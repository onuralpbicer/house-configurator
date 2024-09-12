import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Application, Graphics, Container, TilingSprite, Assets } from 'pixi.js'

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'house-configurator'

    constructor() {
        this.init()
    }

    app = new Application()

    public async init() {
        // Wait for the Renderer to be available
        await this.app.init({ resizeTo: document.body, background: '#ffffff' })

        // The application will create a canvas element for you that you
        // can then insert into the DOM
        document.body.appendChild(this.app.canvas)

        const texture = await Assets.load('assets/tile.png')

        const tileSize = 100000000
        const tilingSprite = new TilingSprite({
            texture,
            height: tileSize,
            width: tileSize,
        })

        const container = new Container()

        // Create a Graphics object, draw a rectangle and fill it
        const obj = new Graphics().rect(20, 0, 200, 100).fill(0xff0000)

        const line = new Graphics().moveTo(0, 0).lineTo(200, 200).stroke({
            color: '#ffff00',
            width: 2,
        })

        container.addChild(line)

        // Add it to the stage to render
        container.addChild(obj)
        this.app.stage.addChild(container)
        this.app.stage.addChild(tilingSprite)

        let lastPos: { x: number; y: number } | null = null
        document.body.addEventListener('mousemove', (e) => {
            if (!lastPos) {
                return
            }

            const dx = e.clientX - lastPos.x
            const dy = e.clientY - lastPos.y
            this.app.stage.position.x += dx
            this.app.stage.position.y += dy
            lastPos = {
                x: e.clientX,
                y: e.clientY,
            }
        })

        document.body.addEventListener('mousedown', (e) => {
            lastPos = {
                x: e.clientX,
                y: e.clientY,
            }
        })

        document.body.addEventListener('mouseup', () => {
            lastPos = null
        })

        document.body.addEventListener('mouseenter', () => {
            lastPos = null
        })

        document.body.addEventListener('mouseleave', () => {
            lastPos = null
        })
    }
}
