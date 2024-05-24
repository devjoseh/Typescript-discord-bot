import * as fs from 'fs'
import path from 'path';
import chalk from 'chalk'
import Table from 'cli-table3'

let table = new Table({ 
    head: ["Pasta", "Evento", "Status"]
})

const allEvents:string[] = []

export = async (): Promise<void> => {
    try {

        let quantityEvents:number = 0

        const loadDir = (dir:string): void => {
            const eventsDir = path.join(__dirname, "..", 'events', dir);
            const files = fs.readdirSync(eventsDir).filter((file) => file.endsWith('.js'))

            for (const file of files) {
                try {
                    require(`../events/${dir}/${file}`)
                    let eventName = file.split(".")[0]

                    allEvents.push(eventName)

                    // table.push([dir, eventName, `✅`])
                    table.push([dir, eventName, `Y`])
                    quantityEvents ++
                } catch (error) {
                    console.log(error)
                }
            }
        }

        ["client"].forEach(dir => {
            loadDir(dir)
        })

        console.log(chalk.greenBright(table.toString()))
        console.log(chalk.greenBright(`Foram carregados ${quantityEvents} Eventos`))
    } catch (error) {
        console.log(error)
    }
}