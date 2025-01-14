import { MoonlightClient } from '@structures/MoonlightClient'
import { AnyError, Event, Maker } from 'erine'

class Events extends Maker<MoonlightClient> {
    @Event
    async ready() {
        console.log(`${this.bot.user.username} is ready!`)
    }

    @Event
    async error(err: AnyError) {
        await err.ctx.send(err.message)
    }
}

export const data = Events