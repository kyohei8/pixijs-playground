let PIXI = require('pixi.js');

// pixi stageの新しいインスタンスを生成
var stage = new PIXI.Stage(0x66FF99);
// rendererインスタンスを生成
var renderer = new PIXI.WebGLRenderer(400, 300);
// DOMにrendererを追加
document.body.appendChild(renderer.view);

requestAnimationFrame( animate );
// 画像ファイルからテクスチャを生成
var texture = PIXI.Texture.fromImage("bunny.png");
// テクスチャからSpriteを生成
var bunny = new PIXI.Sprite(texture);

// Spriteのアンカーポイントをセンターにする
// アンカーポイントは 0〜1 になる
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;
// Spriteをスクリーンの中央に移動
bunny.position.x = 200;
bunny.position.y = 150;

stage.addChild(bunny);

function animate() {
  requestAnimationFrame( animate );
  // 回す
  bunny.rotation += 0.1;
  // stageを描画
  renderer.render(stage);
}