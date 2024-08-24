import * as fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import Table from 'cli-table3';
import logger from '../services/logger';

let table = new Table({
    head: ["Pasta", "Evento", "Status"]
});

const allEvents: string[] = [];

export = async (): Promise<void> => {
    try {
        let quantityEvents: number = 0;

        const loadDir = (dir: string): void => {
            const eventsDir = path.join(__dirname, "..", 'events', dir);

            if (!fs.existsSync(eventsDir)) return;

            const filesAndDirs = fs.readdirSync(eventsDir);
            const jsFiles = filesAndDirs.filter(file => file.endsWith('.js'));
            const subDirs = filesAndDirs.filter(file => fs.statSync(path.join(eventsDir, file)).isDirectory());

            for (const file of jsFiles) {
                try {
                    require(`../events/${dir}/${file}`);
                    let eventName = file.split(".")[0];

                    allEvents.push(eventName);

                    // table.push([dir, eventName, `✅`]);
                    table.push([dir, eventName, `OK`]);
                    quantityEvents++;
                } catch (error) {
                    console.error(error);
                }
            }

            for (const subDir of subDirs) {
                loadDir(path.join(dir, subDir));
            }
        };

        ["database", "modalManager", "compra", "client", "guild", "ticket", "utils"].forEach(dir => {
            loadDir(dir);
        });

        console.log(chalk.greenBright(table.toString()));
        logger.info(`Foram carregados ${quantityEvents} Eventos`);
    } catch (error) {
        console.error(error);
    }
};
