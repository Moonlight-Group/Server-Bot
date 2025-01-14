import { ButtonStyles, Command, ComponentTypes, Context, CreateMessageOptions, Errors, Group, Maker, Param, ParamType } from 'erine'
import { type MoonlightClient } from '@structures/MoonlightClient'
import { ParamType as EATSParamType } from 'easy-api.ts'

const argTypes = Object.keys(EATSParamType).filter(x => isNaN(Number(x)))

class Functions extends Maker<MoonlightClient> {
    @Group({ name: 'eats' })
    @Command({
        name: 'function',
        description: 'Get information from an easy-api.ts function.'
    })
    @Param(ParamType.String, {
        name: 'name',
        description: 'The name of the function.',
        required: true
    })
    async eatsfn(ctx: Context<MoonlightClient>) {
        let name = ctx.get<string>('name').toLowerCase()
        if (!name.startsWith('$')) name = '$' + name;

        const got = this.bot.functions.get(name)
        if (!got) throw new Errors.InvalidParam(
            ctx,
            {},
            `Unable to find a function with name: "${name}".`
        );

        const splittedDescription = [
            `# ${got.name}`,
            got.description,
            '## Usage',
            `\`\`\`\n${got.usage}\n\`\`\``
        ]

        if (got.parameters.length > 0) {
            splittedDescription.push(
                '## Parameters',
                got.parameters.map(arg => {
                    return `${arg.rest ? '...' : ''}${arg.name.toLowerCase()}${arg.required ? '' : '?'} [${argTypes.at(arg.type).toLowerCase()}]\n-# ${arg.description}`
                }).join('\n'),
                '',
                '-# Names starting with "..." means that is a rest parameter. | Names ending with "?" means that those are optional.'
            )
        }

        const payload: CreateMessageOptions = {
            components: [{
                type: ComponentTypes.ACTION_ROW,
                components: [{
                    type: ComponentTypes.BUTTON,
                    style: ButtonStyles.LINK,
                    url: `https://eats.munlai.me/functions/${name.slice(1)}`,
                    label: 'Go to the documentation!'
                }]
            }],
            embeds: [{
                description: splittedDescription.join('\n'),
                color: 0xFFFFFF
            }]
        }

        await ctx.send(payload)
    }
}

export const data = Functions