import { FunctionManager } from 'easy-api.ts'
import { type ClientEvents, Erine } from 'erine'

/**
 * The moonlight discord client.
 */
export class MoonlightClient<E extends ClientEvents = ClientEvents> extends Erine<E> {
    /**
     * The easy-api.ts function manager.
     */
    public functions = new FunctionManager()

    /**
     * Connect the client to the Discord gateway.
     * @returns {Promise<void>}
     */
    public override async connect() {
        await this.functions.load()
        return await super.connect()
    }
}