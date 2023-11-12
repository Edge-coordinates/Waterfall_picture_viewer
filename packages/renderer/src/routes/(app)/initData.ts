/* eslint-disable @typescript-eslint/no-unused-vars */
import {tmaindb} from '#preload';
import {sha256sum, isPathDirectory} from '#preload'

export function main() {
    console.log(tmaindb)
    isPathDirectory()
}