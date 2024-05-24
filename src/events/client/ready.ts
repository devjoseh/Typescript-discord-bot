import { ActivityType } from 'discord.js';

import client from '../../index.js';
import chalk from 'chalk';
import moment from 'moment';

moment.locale("pt-br")

client.on("ready", async () => {

    const activities: { name: string, type: ActivityType}[] = [
        { name: `👑 NestStore`, type: ActivityType.Watching},
    ]

    const status: string[] = [
        'online',
        'dnd',
        'idle'
    ]

    let timer = 30;

    let i:number = 0
    setInterval(() => {
        if(i >= activities.length) i = 0

        client.user.setPresence({
            activities: [activities[i]]
        })

        i++
    }, timer * 1000)

    let s:number = 0
    setInterval(() => {
        if(s >= status.length) s = 0

        client.user.setPresence({
            status: [status[i]]
        })

        s++
    }, timer * 1000)

    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(chalk.yellow(`${client.user.tag} ESTÁ ONLINE!`))
    console.log(chalk.yellow(`Iniciado em ${currentTime}`))
})