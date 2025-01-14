import { MoonlightClient } from '@structures/MoonlightClient'
import { Intents } from 'erine'

process.loadEnvFile()

const client = new MoonlightClient({
    auth: [
        'Bot',
        process.env.TOKEN
    ].join(' '),
    gateway: {
        intents: Intents.GUILDS
            | Intents.GUILD_MESSAGES
            | Intents.MESSAGE_CONTENT
    },
    prefix: 'm!',
})

client.load(__dirname.replace(process.cwd(), '') + '/modules').then(() => {
    client.connect()
})