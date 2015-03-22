'use strict';
let PIXI = require('pixi.js');

let stage, renderer;

let starCount = 2500;
let w = window.innerWidth, h = window.innerHeight;
let slideX = w / 2;
let slideY = h / 2;
let sx = 1.0 + (Math.random() / 20);
let sy = 1.0 + (Math.random() / 20);
let stars = [];

let init = function(){
  stage = new PIXI.Stage(0xFFFFFF);
  renderer = new PIXI.WebGLRenderer(w, h);
  document.body.appendChild(renderer.view);

  // -----------------------------------------------------------------
  let ballTexture = new PIXI.Texture.fromImage('./bubble_32x32.png');

  for(let i = 0; i < starCount; i++){
    var tempBall = new PIXI.Sprite(ballTexture);
    tempBall.position.x = (Math.random() * w) - slideX;
    tempBall.position.y = (Math.random() * h) - slideY;
    tempBall.anchor.x = 0.5;
    tempBall.anchor.y = 0.5;

    stars.push({
      sprite: tempBall,
      x     : tempBall.position.x,
      y     : tempBall.position.y
    });

    stage.addChild(tempBall);
  }

  // -----------------------------------------------------------------
  window.addEventListener('resize', resize);
  requestAnimationFrame(animate);
};


let animate = function(){

  for(let i = 0; i < starCount; i++){
    let star = stars[i];
    // 外向きにspriteが広がっていく
    star.sprite.position.x = star.x + slideX;
    star.sprite.position.y = star.y + slideY;
    star.x = star.x * sx;
    star.y = star.y * sy;

    //画面からはみ出したら元に戻る
    if(star.x > w){
      star.x = star.x - w;
    }else if(star.x < -w){
      star.x = star.x + w;
    }

    if(star.y > h){
      star.y = star.y - h;
    }else if(star.y < -h){
      star.y = star.y + h;
    }

  }

  requestAnimationFrame(animate);
  renderer.render(stage);
};

let resize = function(){
  w = window.innerWidth;
  h = window.innerHeigh;
  slideX = w / 2;
  slideY = h / 2;

  renderer.resize(w, h);
};

init();

