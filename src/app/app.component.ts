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

    public async init() {
        const app = new Application()

        // Wait for the Renderer to be available
        await app.init({ resizeTo: document.body, background: '#ffffff' })

        // The application will create a canvas element for you that you
        // can then insert into the DOM
        document.body.appendChild(app.canvas)

        const texture = await Assets.load('assets/tile.png')

        const tilingSprite = new TilingSprite({
            texture,
            ...app.screen,
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
        app.stage.addChild(container)
        app.stage.addChild(tilingSprite)
    }
}
