// const relativePath = '/64Gram Desktop/a/d/b/1.txt';
// const currentAbsolutePath =
//   'atom://C://Users/Edge/Downloads/64Gram Desktop/a/d/b/1.txt';

// // 移除文件名部分，得到文件夹的相对路径

// const rt = relativePath.split('/')[1];
// const cc = currentAbsolutePath.split(rt)[0] + rt + '/';

// console.log(rt);

// console.log(cc);

// function getFolder (filePath: string, regexPattern: RegExp): string {
//   const directory = filePath.substring(0, filePath.lastIndexOf('/'));
//   return directory.replace(regexPattern, '');
// }

// console.log(getFolder(currentAbsolutePath, /atom:\/\//g));

// !错误案例
/*
Dishwasher1910
/Dishwasher1910/2016/Dish_2016.08/1.png
D:\Edge-coordinates\R-18\图片\0 backup\新建文件夹\Dishwasher1910作品合集\Dishwasher1910\Dishwasher1910\2016\Dish_2016.08\1.png
*/

const text = String.raw`D:\Edge-coordinates\R-18\图片\0 backup\新建文件夹\Dishwasher1910作品合集\Dishwasher1910\Dishwasher1910\2016\Dish_2016.08\1.png`;
const regex = 'Dishwasher1910';

const match = regex.exec(text);

if (match) {
  const matchedText = match[0];
  const beforeMatch = text.substring(0, match.index);

  console.log('匹配到的内容及之前的所有内容:', beforeMatch);
  console.log('匹配到的内容:', matchedText);
} else {
  console.log('未匹配到任何内容');
}
