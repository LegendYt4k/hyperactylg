import bunyan from 'bunyan'
import bunyanDebugStream from 'bunyan-debug-stream'
import path, { dirname } from 'path'
import {fileURLToPath} from 'url'

let __dirname = dirname(fileURLToPath(import.meta.url))
__dirname = path.resolve(__dirname, '..')
__dirname = path.resolve(__dirname, '..')
const log = bunyan.createLogger({
  name: 'hyperactyl',
  streams: [
    {
      level: 'info',
      type: 'raw',
      stream: bunyanDebugStream.create({
        colors: {
            info: 'blue',
            error: ['red', 'bold']
        },
        basepath: __dirname,
        forceColor: true,
      }),
    },
  ],
  serializers: bunyanDebugStream.serializers,
});

export default log