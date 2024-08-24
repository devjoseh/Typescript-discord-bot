import chalk from 'chalk'
import moment from 'moment-timezone';

const time = moment().tz(process.env.TIMEZONE).format("HH:mm:ss")

export default {
    async info(text:string) {
        console.log(`[${time}] ${chalk.green(`INFO`)}: ${chalk.cyan(`${text}`)}`)
    },

    async error(text:string) {
        console.log(`[${time}] ${chalk.red(`ERROR`)}: ${chalk.cyan(`${text}`)}`)
    }
}