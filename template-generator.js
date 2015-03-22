'use strict';
let fs = require('fs');
const BASE_DIR = 'examples';
let dir = process.argv[2];
if(!dir){
  console.error('!!!ERROR!!!: invalid arguments');
  throw new Error('invalid arguments');
}
let num = dir.match(/ex(\d+)/)[1];
let dirPath = `${BASE_DIR}/${dir}`;

let jsTemplate =
  `'use strict';
let PIXI = require('pixi.js');

let stage, renderer;

let init = function(){
  stage = new PIXI.Stage(0xFFFFFF);
  renderer = new PIXI.WebGLRenderer(800, 600);
  document.body.appendChild(renderer.view);

  // -----------------------------------------------------------------
  // insert your creativity :D
  // -----------------------------------------------------------------

  requestAnimationFrame(animate);
};


let animate = function() {
  requestAnimationFrame( animate );
  renderer.render(stage);
};

init();

`;

let htmlTemplate =
  `<!doctype html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title>${dir}</title>
  <script src="/node_modules/pixi.js/bin/pixi.js"></script>
</head>
<body>
<script src="/dist/app${num}.bundle.js"></script>
</body>
</html>`;


fs.mkdir(dirPath, function(){
  console.log(`-- generated ${dirPath}`);
  let jsFilePath = `${dirPath}/app.js`;
  let htmlFilePath = `${dirPath}/index.html`;
  fs.writeFile(jsFilePath, jsTemplate, function(err){
    if(err){
      throw err;
    }
    console.log(`-- generated ${jsFilePath}`);
    fs.writeFile(htmlFilePath, htmlTemplate, function(err){
      if(err){
        throw err;
      }
      console.log(`-- generated ${htmlFilePath}`);
    });
  });
});

