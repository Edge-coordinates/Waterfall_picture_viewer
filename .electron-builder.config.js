/**
 * TODO: Rewrite this config to ESM
 * But currently electron-builder doesn't support ESM configs
 * @see https://github.com/develar/read-config-file/issues/10
 */

/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = async function () {
  const {getVersion} = await import('./version/getVersion.mjs');

  return {
    productName: '瀑布流图片查看器',
    directories: {
      output: 'dist',
      buildResources: 'buildResources',
    },
    files: ['packages/**/dist/**'],
    extraMetadata: {
      version: getVersion(),
    },

    // Specify linux target just for disabling snap compilation
    linux: {
      target: 'deb',
    },
    win: {
      icon: './buildResources/icon.png', //图标路径
      // extraResources: {
      //   // 拷贝dll等静态文件到指定位置(用于某个系统配置)
      //   from: './app-update.yml',
      //   to: './b.txt',
      // },
    },
    nsis: {
      oneClick: false, // 一键安装
      perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
      allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
      allowToChangeInstallationDirectory: true, // 允许修改安装目录
      installerIcon: './buildResources/icons/icon.ico', // 安装图标
      uninstallerIcon: './buildResources/icons/bbb.ico', //卸载图标
      installerHeaderIcon: './buildResources/icons/icon.ico', // 安装时头部图标
      createDesktopShortcut: true, // 创建桌面图标
      createStartMenuShortcut: true, // 创建开始菜单图标
      shortcutName: '瀑布流图片查看器', // 图标名称
    },
  };
};
