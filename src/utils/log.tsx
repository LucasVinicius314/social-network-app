import { config } from '../config'

const log = (param: any) => {
  if (config.CHANNEL === undefined || config.LOG === 'all') {
    console.log(param)
  }
}

export { log }
