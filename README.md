目录说明：
src 源码文件
 css 存放项目自定义css
 font 项目字体库
 images 项目图片
 js 项目js
 libs 第三方库
  css
  js
 music 音乐
dist gulp打包后文件


## 项目初始化
npm install 

## 项目打包
gulp 

## 如何添加css
   在index.html文件，添加到以下标签内
  <!-- build:css css/vendor.css -->
    //这里添加你的css
  <!-- endbuild -->
  
## 如何添加js
   在index.html文件，添加到以下标签内
  <!-- build:scripts css/vendor.js -->
    //这里添加你的js
  <!-- endbuild -->