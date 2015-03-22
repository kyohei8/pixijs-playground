'use strict';
let PIXI = require('pixi.js');

let stage, renderer;

// aliensを保持する配列
let aliens = [], aliensFrames,alienContainer;
let count = 0;

// -----------------------------------------------------------------

let onAssetLeaded = function(){
  //テクスチャを生成
  for(var i = 0, len = 200; i < len; i++){
    var frameName = aliensFrames[i % 4];

    // frame名を使ってalienを生成
    var alien = PIXI.Sprite.fromFrame(frameName);
    // 初期位置、アンカーを決める
    alien.position.x = Math.random() * 800 - 400;
    alien.position.y = Math.random() * 600 - 300;
    alien.anchor.x = 0.5;
    alien.anchor.y = 0.5;

    aliens.push(alien);
    alienContainer.addChild(alien);

  }

  requestAnimationFrame(animate);

};

let init = function(){
  stage = new PIXI.Stage(0xFFFFFF);
  renderer = new PIXI.WebGLRenderer(800, 600);
  document.body.appendChild(renderer.view);

  // assetをロードするための配列を生成
  let loader = new PIXI.AssetLoader(['./SpriteSheet.json']);
  loader.onComplete = onAssetLeaded;
  loader.load();

  aliensFrames = ["eggHead.png", "flowerTop.png", "helmlok.png", "skully.png"];

  alienContainer = new PIXI.DisplayObjectContainer();
  alienContainer.position.x = 400;
  alienContainer.position.y = 300;

  stage.addChild(alienContainer);
};


// -----------------------------------------------------------------

let animate = function() {
  requestAnimationFrame( animate );
  for(var i = 0, len = 200; i < len; i++){
    var alien = aliens[i];
    alien.rotation += 0.1;
  }

  count += 0.01;
  alienContainer.scale.x = Math.sin(count);
  alienContainer.scale.y = Math.sin(count);
  alienContainer.rotation += 0.01;

  renderer.render(stage);
};

init();