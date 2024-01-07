const relativePath = '/64Gram Desktop/a/d/b/1.txt';
const currentAbsolutePath =
  'C://Users/Edge/Downloads/64Gram Desktop/a/d/b/1.txt';

// 移除文件名部分，得到文件夹的相对路径

let rt = relativePath.split('/')[1];
let cc = currentAbsolutePath.split(rt)[0] + rt + '/';

console.log(rt);

console.log(cc);
