import * as fs from 'fs'

export function isPathDirectory(thepath: string) {
    const thefile = fs.statSync(thepath);
    return thefile.isDirectory()
}