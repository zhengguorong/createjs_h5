var hasSlidePage = [] // 存储已经看过的页面，用于防止页面反复渲染
var mySwiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  pagination: '.swiper-pagination',
  mousewheelControl: true,
  touchRatio: 0.5,
  onSlideChangeEnd: function (swiper) {
    if (hasSlidePage.indexOf(swiper.activeIndex) > -1) {
      return
    }
    hasSlidePage.push(swiper.activeIndex)
    switch (swiper.activeIndex) {
      case 1:
        renderPage2()
    }
  }
})
// 加载资源
function loadAssest() {
  // 加载资源列表
  manifest = [
    { src: "clearLight/blue.png", id: "blue" },
    { src: "clearLight/cyan.png", id: "cyan" },
    { src: "clearLight/green.png", id: "green" },
    { src: "clearLight/laps.png", id: "laps" },
    { src: "clearLight/orange.png", id: "orange" },
    { src: "clearLight/pump.png", id: "pump" },
    { src: "clearLight/purple.png", id: "purple" },
    { src: "clearLight/red.png", id: "red" },
    { src: "clearLight/wash_machine.png", id: "wash_machine" },
    { src: "clearLight/white.png", id: "white" },
    { src: "clearLight/yellow.png", id: "yellow" },
    { src: "easyRinse/bucket.png", id: "bucket" },
    { src: "easyRinse/circle_disc.png", id: "circle_disc" },
    { src: "easyRinse/clothes_rotate_line.png", id: "clothes_rotate_line" },
    { src: "easyRinse/clothes.png", id: "easyRinse/clothes" },
    { src: "easyRinse/foam1.png", id: "foam1" },
    { src: "easyRinse/foam2.png", id: "foam2" },
    { src: "easyRinse/foam3.png", id: "foam3" },
    { src: "easyRinse/foam4.png", id: "foam4" },
    { src: "easyRinse/foam5.png", id: "foam5" },
    { src: "easyRinse/high_light.png", id: "high_light" },
    { src: "easyRinse/rotate_line.png", id: "rotate_line" },
    { src: "ecaep/1.png", id: "ecaep1" },
    { src: "ecaep/2.png", id: "ecaep2" },
    { src: "ecaep/3.png", id: "ecaep3" },
    { src: "ecaep/4.png", id: "ecaep4" },
    { src: "presmear/0.png", id: "presmear0" },
    { src: "presmear/2.png", id: "presmear2" },
    { src: "presmear/3.png", id: "presmear3" },
    { src: "presmear/4.png", id: "presmear4" },
    { src: "presmear/5.png", id: "presmear5" },
    { src: "presmear/building.png", id: "building" },
    { src: "presmear/clothes.png", id: "clothes" },
    { src: "presmear/dirty.png", id: "dirty" },
    { src: "presmear/hotball.png", id: "hotball" },
    { src: "presmear/pre.png", id: "pre" },
    { src: "presmear/rpg.png", id: "rpg" },
    { src: "superEnrichment/big_power.png", id: "big_power" },
    { src: "superEnrichment/bottom.png", id: "bottom" },
    { src: "superEnrichment/concentration.png", id: "concentration" },
    { src: "superEnrichment/light_line_long.png", id: "light_line_long" },
    { src: "superEnrichment/light_line_short.png", id: "light_line_short" },
    { src: "superEnrichment/logo.png", id: "superEnrichment/logo" },
    { src: "superEnrichment/shadow.png", id: "shadow" },
    { src: "superEnrichment/water_drop.png", id: "water_drop" },
    { src: "loadingwhale.png", id: "loadingwhale" },
    { src: "logo.png", id: "logo" },
    { src: "share.png", id: "share" }
  ]
  // 统计加载进度
  var loadCount = 0
  preload = new createjs.LoadQueue(false, "./images/");
  // 每加载成功一个资源回调一次
  preload.on("fileload", function (event) {
    loadCount++
    document.querySelector("#process").innerHTML = (loadCount * 100 / manifest.length).toFixed(0) + '%'
  })
  // 所有资源加载完毕后的回调
  preload.on('complete', function (event) {
    // 隐藏加载层，显示内容层
    document.querySelector(".loading-cover").style.display = 'none'
    document.querySelector(".swiper-container").style.display = "block"
    // 渲染第一个页面
    renderPage1()
  })
  // 使用preload预加载指定资源
  preload.loadManifest(manifest)
}

// 帮助方法，方便创建文本
function createText(stage, text, font, color, x, y) {
  var text = new createjs.Text(text, font, color, x, y)
  text.x = x
  text.y = y
  text.lineHeight = 35
  text.alpha = 0
  stage.addChild(text);
  return text
}

// 帮助方法，方便创建图像
function createImage(stage, id, width, height, x, y) {
  var image = new createjs.Bitmap(preload.getResult(id));
  image.x = x
  image.y = y
  image.alpha = 0
  image.scaleX = width / preload.getResult(id).width
  image.scaleY = height / preload.getResult(id).height
  stage.addChild(image)
  return image
}

// 绘制第一页
function renderPage1() {
  // 创建画布
  var canvas = document.getElementById("canvas1")
  var stage = new createjs.Stage(canvas)
  // 由于添加元素后需要手动更新画布，比较麻烦，该防范监听tick事件，进行自动更新
  createjs.Ticker.addEventListener("tick", handleTicker);
  function handleTicker() {
    stage.update();
  }
  // 在画布添加元素
  var title = this.createText(stage, "超浓缩", "normal 80px microsoft yahei", "#fff", 40, 40)
  // 不知道为什么中文不能自动换行，英文是可以的，所以中文用\n进行换行
  var subTitle1 = this.createText(stage, "·科技突破，高能量配方，活性物浓度高达47%，是普通洗衣液\n的三倍以上，获得「浓缩+」洗衣液认证", "normal 24px microsoft yahei", "#fff", 40, 160)
  var subTitle2 = this.createText(stage, "·一泵8g洗8件，小体积，大能量，660g=2.2kg，用量减少\n70%以上", "normal 24px microsoft yahei", "#fff", 40, 240)
  var logo = this.createImage(stage, 'superEnrichment/logo', 116, 83, 320, 60)
  var bigPower = this.createImage(stage, 'big_power', 163, 154, 40, 320)
  var concentration = this.createImage(stage, 'concentration', 230, 154, 250, 320)
  var bottom = this.createImage(stage, 'bottom', 600, 360, 75, 800)
  var waterDrop = this.createImage(stage,'water_drop', 300, 350, 223, 600)
  var light_line_long = this.createImage(stage,'light_line_long', 23, 300, 110, 670)
  var light_line_long2 = this.createImage(stage,'light_line_long', 23, 300, 365, 810)
  var light_line_long3 = this.createImage(stage,'light_line_long', 23, 300, 620, 670)

  // 对元素设置淡出动画
  createjs.Tween.get(title).to({ alpha: 1 }, 300)
  createjs.Tween.get(subTitle1).to({ alpha: 1 }, 300)
  createjs.Tween.get(subTitle2).to({ alpha: 1 }, 300)
  createjs.Tween.get(logo).to({ alpha: 1 }, 300)
  createjs.Tween.get(bigPower).to({ alpha: 1 }, 300)
  createjs.Tween.get(concentration).to({ alpha: 1 }, 300)
  createjs.Tween.get(waterDrop).to({ alpha: 1 }, 300)
  createjs.Tween.get(waterDrop, { loop: true }).to({ y: 570 }, 1000, createjs.Ease.getPowInOut(2)).to({ y: 600 }, 1000, createjs.Ease.getPowInOut(2))
  createjs.Tween.get(bottom).to({ alpha: 1 }, 300)
  createjs.Tween.get(light_line_long, { loop: true }).to({ alpha: 1 }, 1000).to({ alpha: 0.4 }, 1000)
  createjs.Tween.get(light_line_long2, { loop: true }).to({ alpha: 1 }, 1000).to({ alpha: 0.4 }, 1000)
  createjs.Tween.get(light_line_long3, { loop: true }).to({ alpha: 1 }, 1000).to({ alpha: 0.4 }, 1000)
}

// 绘制第二页
function renderPage2() {
  // 创建画布
  createjs.Ticker.setFPS(60);
  var canvas = document.getElementById("canvas2")
  var stage = new createjs.Stage(canvas)
  // 由于添加元素后需要手动更新画布，比较麻烦，该防范监听tick事件，进行自动更新
  createjs.Ticker.addEventListener("tick", handleTicker);
  function handleTicker() {
    stage.update();
  }
  // 在画布添加元素
  var title = this.createText(stage, "易漂洗", "normal 80px microsoft yahei", "#fff", 40, 40)
  // 不知道为什么中文不能自动换行，英文是可以的，所以中文用\n进行换行
  var subTitle1 = this.createText(stage, "·泡沫与去污力没有关系，泡沫越低越容易漂洗", "normal 24px microsoft yahei", "#fff", 40, 160)
  var subTitle2 = this.createText(stage, "·采用创新泡沫控制技术，只需1-2次即可漂清", "normal 24px microsoft yahei", "#fff", 40, 200)
  var subTitle3 = this.createText(stage, "·符合滚筒洗衣机对洗涤剂低泡的要求，减少对洗衣机的伤害", "normal 24px microsoft yahei", "#fff", 40, 240)
  var circle_disc = this.createImage(stage,'circle_disc', 500, 274, 125, 930)
  var rotate_line = this.createImage(stage,'rotate_line', 414, 234, 170, 900)
  var bucket = this.createImage(stage,'bucket', 500, 600, 125, 600)
  var easyRinse_clothes = this.createImage(stage,'easyRinse/clothes', 250, 290, 250, 800)
  var foam1 = this.createImage(stage,'foam1', 70, 70, 130, 850)
  var foam2 = this.createImage(stage,'foam1', 20, 20, 130, 580)
  var foam3 = this.createImage(stage,'foam1', 40, 40, 180, 720)
  var foam4 = this.createImage(stage,'foam1', 30, 30, 570, 650)
  var foam5 = this.createImage(stage,'foam1', 35, 35, 530, 850)

  // 对元素设置淡出动画
  createjs.Tween.get(title).to({ alpha: 1 }, 300)
  createjs.Tween.get(subTitle1).to({ alpha: 1 }, 300)
  createjs.Tween.get(subTitle2).to({ alpha: 1 }, 300)
  createjs.Tween.get(subTitle3).to({ alpha: 1 }, 300)
  createjs.Tween.get(easyRinse_clothes).to({ alpha: 1 }, 900)
  createjs.Tween.get(easyRinse_clothes).to({y: 600}, 900, createjs.Ease.getPowOut(2))
  createjs.Tween.get(bucket).to({ alpha: 1 }, 900)
  createjs.Tween.get(bucket).to({y: 500}, 900, createjs.Ease.getPowOut(2))
  createjs.Tween.get(circle_disc).to({ alpha: 1 }, 300)
  createjs.Tween.get(circle_disc).to({y: 830}, 900, createjs.Ease.getPowOut(2))
  createjs.Tween.get(foam1).wait(1000).to({ alpha: 1 }, 900)
  createjs.Tween.get(foam1, {loop: true}).to({ y: foam1.y + 10 }, 600).to({ x: foam1.x + 10 }, 600).to({ y: foam1.y }, 1000).to({ x: foam1.x }, 1000)
  createjs.Tween.get(foam2).wait(1000).to({ alpha: 1 }, 900)
  createjs.Tween.get(foam2, {loop: true}).wait(400).to({ y: foam2.y + 10 }, 600).to({ x: foam2.x + 10 }, 600).to({ y: foam2.y }, 1000).to({ x: foam2.x }, 1000)
  createjs.Tween.get(foam3).wait(1000).to({ alpha: 1 }, 900)
  createjs.Tween.get(foam3, {loop: true}).wait(600).to({ y: foam3.y + 10 }, 600).to({ x: foam3.x + 10 }, 600).to({ y: foam3.y }, 1000).to({ x: foam3.x }, 1000)
  createjs.Tween.get(foam4).wait(1000).to({ alpha: 1 }, 900)
  createjs.Tween.get(foam4, {loop: true}).wait(700).to({ y: foam4.y + 10 }, 600).to({ x: foam4.x + 10 }, 600).to({ y: foam4.y }, 1000).to({ x: foam4.x }, 1000)
  createjs.Tween.get(foam5).wait(1000).to({ alpha: 1 }, 900)
  createjs.Tween.get(foam5, {loop: true}).wait(900).to({ y: foam5.y + 10 }, 600).to({ x: foam5.x + 10 }, 600).to({ y: foam5.y }, 1000).to({ x: foam5.x }, 1000)
  createjs.Tween.get(rotate_line).to({ alpha: 1 }, 900)
  createjs.Tween.get(rotate_line).to({y: 750}, 900, createjs.Ease.getPowOut(2))
}

loadAssest()
