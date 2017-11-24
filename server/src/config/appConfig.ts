import * as fs from 'fs'
import * as path from 'path';

const configData = fs.readFileSync(path.join(__dirname, `app.config.${process.env.NODE_ENV}.json`))

const config = {
    appConfig: JSON.parse(configData.toString())
}

export default config