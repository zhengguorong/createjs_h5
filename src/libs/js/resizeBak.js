/**
 * Created by zhengguorong on 2016/11/9.
 */
    //宽度放大比例
var scaleW = window.innerWidth / 320 < 2 ? window.innerWidth / 320 : 2;
//高度放大比例
var scaleH = window.innerHeight / 508;
//设计图宽高比
var oldwhScale = 320/508;
//现窗口宽高比
var curwhScale = window.innerWidth/window.innerHeight;
//以scale值小的元素作为缩放基础.
var rScale = scaleW > scaleH ? scaleH : scaleW

var resizes = document.querySelectorAll('.resize');
for (var j = 0; j < resizes.length; j++) {
    if(curwhScale > oldwhScale){
        resizes[j].style.width = parseInt(resizes[j].style.width) * rScale + 'px';
        resizes[j].style.top = parseInt(resizes[j].style.top) * rScale + 'px';
        if(resizes[j].style.left == '0px' || resizes[j].style.left == undefined ||resizes[j].style.right =='0px' || resizes[j].style.right == undefined) {
            continue
        }
        resizes[j].style.left = parseInt(resizes[j].style.left) * scaleW + (scaleW-scaleH)*parseInt(resizes[j].style.width)/2 + 'px';
        resizes[j].style.right = parseInt(resizes[j].style.right) * scaleW + (scaleW-scaleH)*parseInt(resizes[j].style.width)/2 + 'px';

    }else{
        resizes[j].style.width = parseInt(resizes[j].style.width) * rScale + 'px';
        resizes[j].style.top = parseInt(resizes[j].style.top) * scaleH + 'px';
        resizes[j].style.left = parseInt(resizes[j].style.left) * rScale + 'px';
        resizes[j].style.right = parseInt(resizes[j].style.right) * rScale + 'px';
    }
}

