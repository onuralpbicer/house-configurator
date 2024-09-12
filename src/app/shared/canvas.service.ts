import { Injectable } from '@angular/core'
import { Application, Assets, Container, Graphics, TilingSprite } from 'pixi.js'

@Injectable({
    providedIn: 'root',
})
export class CanvasService {
    private app = new Application()

    async initialise() {
        await this.app.init({ resizeTo: window, background: '#ffffff' })

        // The application will create a canvas element for you that you
        // can then insert into the DOM
        document.body.appendChild(this.app.canvas)

        const itemsContainer = new Container()
        this.app.stage.addChild(itemsContainer)
        this.initialiseGrid(itemsContainer)

        // Create a Graphics object, draw a rectangle and fill it
        const obj = new Graphics().rect(20, 0, 200, 100).fill(0xff0000)

        const line = new Graphics().moveTo(0, 0).lineTo(200, 200).stroke({
            color: '#ffff00',
            width: 2,
        })

        itemsContainer.addChild(line)
        itemsContainer.addChild(obj)
    }

    private async initialiseGrid(itemsContainer: Container) {
        const texture = await Assets.load('assets/tile.png')

        const tilingSprite = new TilingSprite({
            texture,
            ...this.app.screen,
        })

        this.app.stage.addChild(tilingSprite)

        let lastPos: { x: number; y: number } | null = null
        document.body.addEventListener('mousemove', (e) => {
            if (!lastPos) {
                return
            }

            const dx = e.clientX - lastPos.x
            const dy = e.clientY - lastPos.y
            tilingSprite.tilePosition.x += dx
            tilingSprite.tilePosition.y += dy
            itemsContainer.position.x = tilingSprite.tilePosition.x
            itemsContainer.position.y = tilingSprite.tilePosition.y

            lastPos = {
                x: e.clientX,
                y: e.clientY,
            }
        })

        document.body.addEventListener('wheel', (e) => {
            this.app.stage.scale = {
                x: this.app.stage.scale.x - e.deltaY * 0.001,
                y: this.app.stage.scale.y - e.deltaY * 0.001,
            }
            console.log(this.app.stage.scale)
            // this.app.stage.scale += 0.1
        })

        document.body.addEventListener('mousedown', (e) => {
            if (e.button === 1)
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
