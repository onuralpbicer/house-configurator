import {
    APP_INITIALIZER,
    ApplicationConfig,
    provideZoneChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'
import { appRoutes } from './app.routes'
import { CanvasService } from './shared/canvas.service'

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        {
            provide: APP_INITIALIZER,
            useFactory: (service: CanvasService) => () => service.initialise(),
            deps: [CanvasService],
            multi: true,
        },
    ],
}
