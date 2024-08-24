import { ActivityType, Events } from 'discord.js';

import client from '../../index.js';
import logger from '../../services/logger'

import moment from 'moment-timezone';
moment.locale("pt-br")

client.on(Events.ClientReady, async () => {
    const activities: { name: string, type: ActivityType}[] = [
        { name: `👑 NestStore`, type: ActivityType.Watching},
		{ name: `👑 NestStore`, type: ActivityType.Playing},
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

    const currentTime = moment().tz(process.env.TIMEZONE).format('YYYY-MM-DD HH:mm:ss');
    logger.info(`${client.user.tag} ONLINE!`);
    logger.info(`Iniciado em ${currentTime}`);
})