import logger from  'pino';
import dayjs from 'dayjs';
import config  from 'config';

let level = config.get<string>('logLevel');

const log = logger({
    transport   : {
        target : 'pino-pretty',
    },
  
    level, 
    timestamp   : () => `,"time":"${dayjs().format()}"`,
    base: { pid: false }
});

export default log;