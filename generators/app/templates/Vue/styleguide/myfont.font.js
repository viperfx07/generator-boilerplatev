// g-.font.js
module.exports = {
  'files': [
    '../src/_icons/*.svg'
  ],
  'fontName': 'g-icons',
  'classPrefix': 'g-icon-',
  'baseSelector': '.g-icon',
  'types': ['woff', 'woff2'],
  'fileName': '[fontname].[hash].[ext]',
  'cssTemplate': './iconfont-template.hbs',
  css: false,
};
