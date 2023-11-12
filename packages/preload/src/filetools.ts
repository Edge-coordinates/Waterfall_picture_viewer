import fs from 'fs-extra';

export function isPathDirectory (thepath: string) {
  const thefile = fs.statSync(thepath);
  return thefile.isDirectory();
}
