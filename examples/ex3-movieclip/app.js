'use strict';
let PIXI = require('pixi.js');

let stage, renderer;
let count = 0;
let explosions = [];

let init = function(){
  stage = new PIXI.Stage(0xFFFFFF);
  renderer = new PIXI.WebGLRenderer(800, 600);
  document.body.appendChild(renderer.view);

  // -----------------------------------------------------------------
  let loader = new PIXI.AssetLoader(['./SpriteSheet.json']);
  loader.onComplete = onAssetLoaded;
  loader.load();
  // -----------------------------------------------------------------

};

let onAssetLoaded = function(){
  let explosionTextures = [];
  // 26コマ分のフレームからテクスチャを生成し配列に入れる
  for(let i = 0; i < 26; i++){
    var texture = PIXI.Texture.fromFrame(`Explosion_Sequence_A ${i + 1}.png`);
    explosionTextures.push(texture);
  }

  //テクスチャからmovieclipを生成
  for(let i = 0; i < 50; i++){
    var explosion = new PIXI.MovieClip(explosionTextures);

    explosion.position.x = Math.random() * 800;
    explosion.position.y = Math.random() * 600;
    explosion.anchor.x = 0.5;
    explosion.anchor.y = 0.5;

    explosion.rotation = Math.random() * Math.PI;
    explosion.scale.x = explosion.scale.y = 0.75 + Math.random() * 0.5
    // フレームをずらす
    explosion.gotoAndPlay(Math.random() * 27);

    stage.addChild(explosion);

  }

  requestAnimationFrame(animate);

};


let animate = function(){
  requestAnimationFrame(animate);
  renderer.render(stage);
};

init();

