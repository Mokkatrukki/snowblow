(()=>{"use strict";var t={56:(t,i,e)=>{t.exports=function(t){var i=e.nc;i&&t.setAttribute("nonce",i)}},72:t=>{var i=[];function e(t){for(var e=-1,r=0;r<i.length;r++)if(i[r].identifier===t){e=r;break}return e}function r(t,r){for(var s={},a=[],n=0;n<t.length;n++){var o=t[n],l=r.base?o[0]+r.base:o[0],c=s[l]||0,g="".concat(l," ").concat(c);s[l]=c+1;var u=e(g),d={css:o[1],media:o[2],sourceMap:o[3],supports:o[4],layer:o[5]};if(-1!==u)i[u].references++,i[u].updater(d);else{var f=h(d,r);r.byIndex=n,i.splice(n,0,{identifier:g,updater:f,references:1})}a.push(g)}return a}function h(t,i){var e=i.domAPI(i);return e.update(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap&&i.supports===t.supports&&i.layer===t.layer)return;e.update(t=i)}else e.remove()}}t.exports=function(t,h){var s=r(t=t||[],h=h||{});return function(t){t=t||[];for(var a=0;a<s.length;a++){var n=e(s[a]);i[n].references--}for(var o=r(t,h),l=0;l<s.length;l++){var c=e(s[l]);0===i[c].references&&(i[c].updater(),i.splice(c,1))}s=o}}},113:t=>{t.exports=function(t,i){if(i.styleSheet)i.styleSheet.cssText=t;else{for(;i.firstChild;)i.removeChild(i.firstChild);i.appendChild(document.createTextNode(t))}}},314:t=>{t.exports=function(t){var i=[];return i.toString=function(){return this.map((function(i){var e="",r=void 0!==i[5];return i[4]&&(e+="@supports (".concat(i[4],") {")),i[2]&&(e+="@media ".concat(i[2]," {")),r&&(e+="@layer".concat(i[5].length>0?" ".concat(i[5]):""," {")),e+=t(i),r&&(e+="}"),i[2]&&(e+="}"),i[4]&&(e+="}"),e})).join("")},i.i=function(t,e,r,h,s){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(r)for(var n=0;n<this.length;n++){var o=this[n][0];null!=o&&(a[o]=!0)}for(var l=0;l<t.length;l++){var c=[].concat(t[l]);r&&a[c[0]]||(void 0!==s&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=s),e&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=e):c[2]=e),h&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=h):c[4]="".concat(h)),i.push(c))}},i}},365:(t,i,e)=>{e.d(i,{A:()=>n});var r=e(601),h=e.n(r),s=e(314),a=e.n(s)()(h());a.push([t.id,"body {\n    font-family: Arial, sans-serif;\n    background-color: #f0f0f0;\n}\n\n#gameCanvas {\n    border: 1px solid #333;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\n.game-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 100vh;\n} ",""]);const n=a},540:t=>{t.exports=function(t){var i=document.createElement("style");return t.setAttributes(i,t.attributes),t.insert(i,t.options),i}},601:t=>{t.exports=function(t){return t[1]}},659:t=>{var i={};t.exports=function(t,e){var r=function(t){if(void 0===i[t]){var e=document.querySelector(t);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(t){e=null}i[t]=e}return i[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}},825:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var i=t.insertStyleElement(t);return{update:function(e){!function(t,i,e){var r="";e.supports&&(r+="@supports (".concat(e.supports,") {")),e.media&&(r+="@media ".concat(e.media," {"));var h=void 0!==e.layer;h&&(r+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),r+=e.css,h&&(r+="}"),e.media&&(r+="}"),e.supports&&(r+="}");var s=e.sourceMap;s&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),i.styleTagTransform(r,t,i.options)}(i,t,e)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(i)}}}}},i={};function e(r){var h=i[r];if(void 0!==h)return h.exports;var s=i[r]={id:r,exports:{}};return t[r](s,s.exports,e),s.exports}e.n=t=>{var i=t&&t.__esModule?()=>t.default:()=>t;return e.d(i,{a:i}),i},e.d=(t,i)=>{for(var r in i)e.o(i,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:i[r]})},e.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),e.nc=void 0;var r=function(){function t(t,i){this.x=t,this.y=i,this.width=40,this.height=60,this.speed=3,this.angle=0,this.wheelAngle=0,this.maxWheelAngle=Math.PI/4,this.wheelTurnSpeed=.1,this.stationaryTurnSpeed=.12,this.movingTurnSpeed=.07,this.color="#FF6B00",this.cabinColor="#222222",this.warningLightAngle=0,this.smokeInterval=500,this.lastSmokeTime=0,this.smokeParticles=[],this.auraWidth=60,this.auraHeight=15,this.auraColor="#3A86FF",this.auraAngle=0,this.maxAuraAngle=Math.PI/6,this.auraTurnSpeed=.05,this.isAuraTurningLeft=!1,this.isAuraTurningRight=!1,this.isAuraLifted=!1,this.auraLiftHeight=20,this.auraCurrentHeight=0,this.auraLiftSpeed=1,this.isMovingForward=!1,this.isMovingBackward=!1,this.isTurningLeft=!1,this.isTurningRight=!1,this.rearWheelWidth=14,this.rearWheelHeight=20,this.frontWheelWidth=10,this.frontWheelHeight=14,this.moveSpeed=3,this.turnSpeed=.05,this.wheelBase=40}return t.prototype.setMovement=function(t,i){"forward"===t?this.isMovingForward=i:"backward"===t&&(this.isMovingBackward=i)},t.prototype.setTurning=function(t,i){"left"===t?this.isTurningLeft=i:"right"===t&&(this.isTurningRight=i)},t.prototype.setAuraTurning=function(t,i){"left"===t?this.isAuraTurningLeft=i:"right"===t&&(this.isAuraTurningRight=i)},t.prototype.toggleAuraLift=function(){this.isAuraLifted=!this.isAuraLifted},t.prototype.setAuraLift=function(t){this.isAuraLifted=t},t.prototype.update=function(){this.updateSteering(),this.updateAuraAngle(),this.updateAuraHeight();var t=0;if(this.isMovingForward?t=this.moveSpeed:this.isMovingBackward&&(t=-this.moveSpeed),0!==t){var i={x:this.x+this.wheelBase/2*Math.sin(this.angle),y:this.y-this.wheelBase/2*Math.cos(this.angle)},e={x:this.x-this.wheelBase/2*Math.sin(this.angle),y:this.y+this.wheelBase/2*Math.cos(this.angle)};e.x+=t*Math.sin(this.angle),e.y-=t*Math.cos(this.angle),i.x+=t*Math.sin(this.angle+this.wheelAngle),i.y-=t*Math.cos(this.angle+this.wheelAngle),this.x=(i.x+e.x)/2,this.y=(i.y+e.y)/2,this.angle=Math.atan2(i.y-e.y,i.x-e.x)+Math.PI/2}this.warningLightAngle+=.1,this.warningLightAngle>2*Math.PI&&(this.warningLightAngle-=2*Math.PI);var r=Date.now();(this.isMovingForward||this.isMovingBackward)&&r-this.lastSmokeTime>this.smokeInterval&&(this.smokeParticles.push({x:0,y:0,size:3+3*Math.random(),opacity:.7+.3*Math.random(),speed:.2+.3*Math.random()}),this.lastSmokeTime=r);for(var h=this.smokeParticles.length-1;h>=0;h--){var s=this.smokeParticles[h];s.y-=s.speed,s.x+=.5*(Math.random()-.5),s.size+=.1,s.opacity-=.01,s.opacity<=0&&this.smokeParticles.splice(h,1)}},t.prototype.updateSteering=function(){this.isTurningLeft?this.wheelAngle=Math.max(this.wheelAngle-this.wheelTurnSpeed,-this.maxWheelAngle):this.isTurningRight?this.wheelAngle=Math.min(this.wheelAngle+this.wheelTurnSpeed,this.maxWheelAngle):this.wheelAngle>0?this.wheelAngle=Math.max(0,this.wheelAngle-this.wheelTurnSpeed/2):this.wheelAngle<0&&(this.wheelAngle=Math.min(0,this.wheelAngle+this.wheelTurnSpeed/2))},t.prototype.updateAuraAngle=function(){this.isAuraTurningLeft?this.auraAngle=Math.max(this.auraAngle-this.auraTurnSpeed,-this.maxAuraAngle):this.isAuraTurningRight&&(this.auraAngle=Math.min(this.auraAngle+this.auraTurnSpeed,this.maxAuraAngle))},t.prototype.updateAuraHeight=function(){this.isAuraLifted&&this.auraCurrentHeight<this.auraLiftHeight?this.auraCurrentHeight=Math.min(this.auraCurrentHeight+.5*this.auraLiftSpeed,this.auraLiftHeight):!this.isAuraLifted&&this.auraCurrentHeight>0&&(this.auraCurrentHeight=Math.max(this.auraCurrentHeight-.5*this.auraLiftSpeed,0))},t.prototype.draw=function(t){t.save(),t.translate(this.x,this.y),t.rotate(this.angle),this.isAuraLifted&&(t.save(),t.translate(0,-this.height/2-this.auraHeight/2+5),t.rotate(this.auraAngle),t.fillStyle="rgba(0, 0, 0, 0.3)",t.fillRect(-this.auraWidth/2,-this.auraHeight/2,this.auraWidth,this.auraHeight),t.restore()),t.fillStyle="#333",t.fillRect(-this.width/2-this.rearWheelWidth/2,this.height/4-this.rearWheelHeight/2,this.rearWheelWidth,this.rearWheelHeight),t.strokeStyle="#777",t.lineWidth=1;for(var i=1;i<4;i++)t.beginPath(),t.moveTo(-this.width/2-this.rearWheelWidth/2,this.height/4-this.rearWheelHeight/2+i*(this.rearWheelHeight/4)),t.lineTo(-this.width/2+this.rearWheelWidth/2,this.height/4-this.rearWheelHeight/2+i*(this.rearWheelHeight/4)),t.stroke();for(t.fillRect(this.width/2-this.rearWheelWidth/2,this.height/4-this.rearWheelHeight/2,this.rearWheelWidth,this.rearWheelHeight),i=1;i<4;i++)t.beginPath(),t.moveTo(this.width/2-this.rearWheelWidth/2,this.height/4-this.rearWheelHeight/2+i*(this.rearWheelHeight/4)),t.lineTo(this.width/2+this.rearWheelWidth/2,this.height/4-this.rearWheelHeight/2+i*(this.rearWheelHeight/4)),t.stroke();for(t.save(),t.translate(-this.width/2,-this.height/4),t.rotate(this.wheelAngle),t.fillRect(-this.frontWheelWidth/2,-this.frontWheelHeight/2,this.frontWheelWidth,this.frontWheelHeight),t.strokeStyle="#777",i=1;i<3;i++)t.beginPath(),t.moveTo(-this.frontWheelWidth/2,-this.frontWheelHeight/2+i*(this.frontWheelHeight/3)),t.lineTo(this.frontWheelWidth/2,-this.frontWheelHeight/2+i*(this.frontWheelHeight/3)),t.stroke();for(t.restore(),t.save(),t.translate(this.width/2,-this.height/4),t.rotate(this.wheelAngle),t.fillRect(-this.frontWheelWidth/2,-this.frontWheelHeight/2,this.frontWheelWidth,this.frontWheelHeight),i=1;i<3;i++)t.beginPath(),t.moveTo(-this.frontWheelWidth/2,-this.frontWheelHeight/2+i*(this.frontWheelHeight/3)),t.lineTo(this.frontWheelWidth/2,-this.frontWheelHeight/2+i*(this.frontWheelHeight/3)),t.stroke();t.restore(),t.fillStyle=this.color,t.fillRect(-this.width/2,-this.height/2,this.width,this.height),t.fillStyle=this.cabinColor;var e=.5*this.width,r=.3*this.height,h=-e/2,s=this.height/8;t.fillRect(h,s,e,r),t.strokeStyle="#444",t.lineWidth=1,t.beginPath(),t.moveTo(h,s+r/2),t.lineTo(h+e,s+r/2),t.moveTo(h+e/2,s),t.lineTo(h+e/2,s+r),t.stroke(),t.fillStyle="#333",t.fillRect(h+e/2-3,s+r/2-3,6,6),t.fillStyle="#FFAA00",t.beginPath(),t.moveTo(h+e/2,s+r/2),t.arc(h+e/2,s+r/2,10,this.warningLightAngle-Math.PI/4,this.warningLightAngle+Math.PI/4),t.closePath(),t.fill(),t.fillStyle="#FF5500",t.beginPath(),t.arc(h+e/2,s+r/2,4,0,2*Math.PI),t.fill();var a=-this.height/4;t.fillStyle="#444",t.beginPath(),t.arc(0,a,5,0,2*Math.PI),t.fill(),t.fillStyle="#222",t.beginPath(),t.arc(0,a,3,0,2*Math.PI),t.fill();for(var n=0,o=this.smokeParticles;n<o.length;n++){var l=o[n];t.fillStyle="rgba(200, 200, 200, ".concat(l.opacity,")"),t.beginPath(),t.arc(0+l.x,a+l.y,l.size,0,2*Math.PI),t.fill()}t.fillStyle="#FFF",t.beginPath(),t.arc(0,-this.height/2-5,3,0,2*Math.PI),t.fill(),this.isAuraLifted&&(t.fillStyle="#FFCC00",t.beginPath(),t.arc(h+e/2,s-10,5,0,2*Math.PI),t.fill(),t.strokeStyle="#FF6600",t.lineWidth=1,t.stroke()),t.save();var c=-this.height/2-this.auraHeight/2,g=0;this.isAuraLifted&&(c=-this.height/4,g=0),t.translate(g,c-this.auraCurrentHeight/2),t.rotate(this.auraAngle),this.isAuraLifted?t.fillStyle="#5A9AFF":t.fillStyle=this.auraColor,t.fillRect(-this.auraWidth/2,-this.auraHeight/2,this.auraWidth,this.auraHeight),t.beginPath(),t.moveTo(-this.auraWidth/2,-this.auraHeight/2),t.lineTo(-this.auraWidth/2-10,this.auraHeight/2),t.lineTo(-this.auraWidth/2,this.auraHeight/2),t.closePath(),t.fill(),t.beginPath(),t.moveTo(this.auraWidth/2,-this.auraHeight/2),t.lineTo(this.auraWidth/2+10,this.auraHeight/2),t.lineTo(this.auraWidth/2,this.auraHeight/2),t.closePath(),t.fill(),t.strokeStyle="#2667FF",t.lineWidth=2,t.beginPath(),t.moveTo(-this.auraWidth/2+5,0),t.lineTo(this.auraWidth/2-5,0),t.stroke(),t.strokeStyle="#555",t.lineWidth=3,t.beginPath();var u=2*this.auraHeight;this.isAuraLifted&&(u=1.5*this.auraHeight),t.moveTo(-this.auraWidth/3,this.auraHeight/2),t.lineTo(-this.width/3,u),t.moveTo(this.auraWidth/3,this.auraHeight/2),t.lineTo(this.width/3,u),t.stroke(),this.isAuraLifted&&(t.strokeStyle="#777",t.lineWidth=4,t.beginPath(),t.moveTo(-this.auraWidth/3+2,this.auraHeight/2+2),t.lineTo(-this.width/3+2,u-5),t.stroke(),t.beginPath(),t.moveTo(this.auraWidth/3-2,this.auraHeight/2+2),t.lineTo(this.width/3-2,u-5),t.stroke()),t.restore(),t.restore()},t.prototype.getAuraPosition=function(){var t=this.height/2+this.auraHeight/2;this.isAuraLifted&&(t=this.height/4);var i=this.x+Math.sin(this.angle)*t,e=this.y-Math.cos(this.angle)*t,r=this.angle+this.auraAngle;return{x:i,y:e,width:this.auraWidth,height:this.auraHeight,angle:r}},t.prototype.getPosition=function(){return{x:this.x,y:this.y}},t.prototype.getSize=function(){return{width:this.width,height:this.height}},t.prototype.getAuraAngle=function(){return this.auraAngle},t.prototype.isPlowLifted=function(){return this.isAuraLifted},t.prototype.getAuraHeight=function(){return this.auraCurrentHeight},t}(),h=function(){function t(t,i,e){void 0===e&&(e=8),this.x=t,this.y=i,this.size=e,this.color="#FFFFFF",this.shadowColor="#E8F0F8",this.borderColor="#CCCCCC",this.velocity={x:0,y:0},this.isMoving=!1,this.friction=.95,this.isInParkingArea=!1,this.wasRemovedFromParkingArea=!1}return t.prototype.update=function(){this.isMoving&&(this.x+=this.velocity.x,this.y+=this.velocity.y,this.velocity.x*=this.friction,this.velocity.y*=this.friction,Math.abs(this.velocity.x)<.1&&Math.abs(this.velocity.y)<.1&&(this.velocity.x=0,this.velocity.y=0,this.isMoving=!1))},t.prototype.draw=function(t){t.fillStyle=this.color,t.fillRect(this.x-this.size/2,this.y-this.size/2,this.size,this.size),t.strokeStyle=this.borderColor,t.lineWidth=.5,t.strokeRect(this.x-this.size/2,this.y-this.size/2,this.size,this.size)},t}(),s=function(){function t(t,i,e){void 0===e&&(e=1.6),this.parkingArea=null,this.onSnowRemovedFromParkingArea=null,this.particles=[],this.canvasWidth=t,this.canvasHeight=i,this.gridSize=10;var r=Math.floor(t/this.gridSize),h=Math.floor(i/this.gridSize);this.maxParticles=Math.floor(r*h*e),this.generateSnow()}return t.prototype.generateSnow=function(){var t=Math.floor(this.canvasWidth/this.gridSize),i=Math.floor(this.canvasHeight/this.gridSize);this.particles=[];for(var e=0;e<i;e++)for(var r=0;r<t;r++){var s=r*this.gridSize+this.gridSize/4,a=e*this.gridSize+this.gridSize/4,n=6+3*Math.random();this.particles.push(new h(s,a,n));var o=r*this.gridSize+3*this.gridSize/4,l=e*this.gridSize+3*this.gridSize/4,c=5+3*Math.random();this.particles.push(new h(o,l,c))}},t.prototype.update=function(){for(var t=0,i=this.particles;t<i.length;t++){var e=i[t],r=e.isInParkingArea;if(e.update(),this.parkingArea){var h=this.isParticleInParkingArea(e);!r||h||e.wasRemovedFromParkingArea||(e.wasRemovedFromParkingArea=!0,this.onSnowRemovedFromParkingArea&&this.onSnowRemovedFromParkingArea()),e.isInParkingArea=h}}},t.prototype.draw=function(t){for(var i=0,e=this.particles;i<e.length;i++)e[i].draw(t)},t.prototype.handleCollisionWithPlow=function(t,i,e,r,h){for(var s=Math.cos(h),a=Math.sin(h),n=0,o=this.particles;n<o.length;n++){var l=o[n],c=l.x-t,g=l.y-i;if(c*c+g*g<e*e){var u=c*s+g*a,d=-c*a+g*s;d<-r/2&&d>-r/2-l.size&&u>-e/2-l.size&&u<e/2+l.size&&(l.isMoving=!0,l.velocity.x=2*a+(.4*Math.random()-.2),l.velocity.y=2*-s+(.4*Math.random()-.2),l.x+=l.velocity.x,l.y+=l.velocity.y)}}},t.prototype.resizeCanvas=function(t,i){this.canvasWidth=t,this.canvasHeight=i,this.generateSnow()},t.prototype.setParkingArea=function(t,i){this.parkingArea=t,this.onSnowRemovedFromParkingArea=i;for(var e=0,r=0,h=this.particles;r<h.length;r++){var s=h[r];this.isParticleInParkingArea(s)&&(s.isInParkingArea=!0,e++)}return e},t.prototype.isParticleInParkingArea=function(t){return!!this.parkingArea&&t.x>=this.parkingArea.x&&t.x<=this.parkingArea.x+this.parkingArea.width&&t.y>=this.parkingArea.y&&t.y<=this.parkingArea.y+this.parkingArea.height},t}(),a=function(){function t(t,i,e,r){this.x=t,this.y=i,this.width=e,this.height=r,this.borderColor="#FF4500",this.borderWidth=4,this.clearThreshold=1,this.totalSnowParticles=0,this.currentSnowParticles=0}return t.prototype.draw=function(t){t.strokeStyle=this.borderColor,t.lineWidth=this.borderWidth,t.strokeRect(this.x,this.y,this.width,this.height);var i=this.getClearPercentage();t.fillStyle="#FFFFFF",t.font="20px Arial",t.fillText("Cleared: ".concat(Math.floor(100*i),"%"),this.x+10,this.y-10);var e=this.width-20,r=this.x+10,h=this.y-35;t.fillStyle="#555555",t.fillRect(r,h,e,15),t.fillStyle=this.getProgressColor(i),t.fillRect(r,h,e*i,15),t.strokeStyle="#FFFFFF",t.lineWidth=2,t.strokeRect(r,h,e,15)},t.prototype.isInside=function(t,i){return t>=this.x&&t<=this.x+this.width&&i>=this.y&&i<=this.y+this.height},t.prototype.setTotalSnowParticles=function(t){this.totalSnowParticles=t,this.currentSnowParticles=t},t.prototype.removeSnowParticle=function(){this.currentSnowParticles>0&&this.currentSnowParticles--},t.prototype.getClearPercentage=function(){return 0===this.totalSnowParticles?0:1-this.currentSnowParticles/this.totalSnowParticles},t.prototype.isCleared=function(){return this.getClearPercentage()>=this.clearThreshold},t.prototype.getProgressColor=function(t){return t<.5?"#FF4500":t<.8?"#FFA500":t<1?"#FFFF00":"#00FF00"},t.prototype.getPosition=function(){return{x:this.x,y:this.y,width:this.width,height:this.height}},t}(),n=function(){function t(t){var i=this;if(this.lastTimestamp=0,this.isRunning=!1,this.gameWon=!1,this.canvas=document.getElementById(t),!this.canvas)throw new Error("Canvas element with id ".concat(t," not found"));var e=this.canvas.getContext("2d");if(!e)throw new Error("Could not get 2D context from canvas");this.ctx=e,this.resizeCanvas(),window.addEventListener("resize",(function(){return i.resizeCanvas()})),this.initializeGame(),this.setupControls()}return t.prototype.initializeGame=function(){var t=this,i=this.canvas.width/2-120,e=this.canvas.height/2-180;this.parkingArea=new a(i,e,240,360),this.initialTractorX=i+120,this.initialTractorY=e-120,this.tractor=new r(this.initialTractorX,this.initialTractorY),this.snowSystem=new s(this.canvas.width,this.canvas.height,.8);var h=this.snowSystem.setParkingArea(this.parkingArea.getPosition(),(function(){return t.parkingArea.removeSnowParticle()}));this.parkingArea.setTotalSnowParticles(h),this.gameWon=!1},t.prototype.resetGame=function(){this.initializeGame(),this.isRunning||this.start()},t.prototype.resizeCanvas=function(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.snowSystem&&this.snowSystem.resizeCanvas(this.canvas.width,this.canvas.height)},t.prototype.setupControls=function(){var t=this;window.addEventListener("keydown",(function(i){if(!t.gameWon||"r"!==i.key&&"R"!==i.key)switch(i.key){case"w":case"W":t.tractor.setMovement("forward",!0);break;case"s":case"S":t.tractor.setMovement("backward",!0);break;case"a":case"A":t.tractor.setTurning("left",!0);break;case"d":case"D":t.tractor.setTurning("right",!0);break;case"ArrowLeft":t.tractor.setAuraTurning("left",!0);break;case"ArrowRight":t.tractor.setAuraTurning("right",!0);break;case" ":t.tractor.toggleAuraLift()}else t.resetGame()})),window.addEventListener("keyup",(function(i){switch(i.key){case"w":case"W":t.tractor.setMovement("forward",!1);break;case"s":case"S":t.tractor.setMovement("backward",!1);break;case"a":case"A":t.tractor.setTurning("left",!1);break;case"d":case"D":t.tractor.setTurning("right",!1);break;case"ArrowLeft":t.tractor.setAuraTurning("left",!1);break;case"ArrowRight":t.tractor.setAuraTurning("right",!1)}}))},t.prototype.start=function(){var t=this;this.isRunning||(this.isRunning=!0,this.lastTimestamp=performance.now(),requestAnimationFrame((function(i){return t.gameLoop(i)})))},t.prototype.gameLoop=function(t){var i=this;if(this.isRunning){var e=t-this.lastTimestamp;this.lastTimestamp=t,this.update(e),this.render(),requestAnimationFrame((function(t){return i.gameLoop(t)}))}},t.prototype.update=function(t){if(!this.gameWon){if(this.tractor.update(),this.snowSystem.update(),!this.tractor.isPlowLifted()){var i=this.tractor.getAuraPosition();this.snowSystem.handleCollisionWithPlow(i.x,i.y,i.width,i.height,i.angle)}this.parkingArea.isCleared()&&(this.gameWon=!0,console.log("Congratulations! You've cleared the parking area!"))}},t.prototype.render=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="#333333",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.snowSystem.draw(this.ctx),this.parkingArea.draw(this.ctx),this.tractor.draw(this.ctx),this.drawControlsHelp(),this.gameWon&&this.drawWinMessage()},t.prototype.drawWinMessage=function(){var t=this.canvas.width/2,i=this.canvas.height/3;this.ctx.fillStyle="rgba(0, 0, 0, 0.7)",this.ctx.fillRect(t-200,i-50,400,150),this.ctx.strokeStyle="#FFFFFF",this.ctx.lineWidth=3,this.ctx.strokeRect(t-200,i-50,400,150),this.ctx.fillStyle="#FFFFFF",this.ctx.font="bold 30px Arial",this.ctx.textAlign="center",this.ctx.fillText("Parking Area Cleared!",t,i),this.ctx.font="20px Arial",this.ctx.fillText("Great job, snow plow driver!",t,i+30),this.ctx.font="bold 20px Arial",this.ctx.fillText("Press R to play again",t,i+80)},t.prototype.drawControlsHelp=function(){this.ctx.fillStyle="rgba(0, 0, 0, 0.5)",this.ctx.fillRect(20,20,220,180),this.ctx.strokeStyle="#FFFFFF",this.ctx.lineWidth=1,this.ctx.strokeRect(20,20,220,180),this.ctx.fillStyle="#FFFFFF",this.ctx.font="bold 16px Arial",this.ctx.textAlign="left",this.ctx.fillText("Controls:",30,45),this.ctx.font="14px Arial",this.ctx.fillText("W - Move Forward",30,70),this.ctx.fillText("S - Move Backward",30,90),this.ctx.fillText("A - Turn Left",30,110),this.ctx.fillText("D - Turn Right",30,130),this.ctx.fillText("← - Rotate Plow Left",30,150),this.ctx.fillText("→ - Rotate Plow Right",30,170),this.ctx.fillText("Space - Lift/Lower Plow",30,190),this.gameWon&&(this.ctx.font="bold 14px Arial",this.ctx.fillText("R - Restart Game",30,210))},t}(),o=e(72),l=e.n(o),c=e(825),g=e.n(c),u=e(659),d=e.n(u),f=e(56),p=e.n(f),v=e(540),y=e.n(v),w=e(113),m=e.n(w),A=e(365),x={};x.styleTagTransform=m(),x.setAttributes=p(),x.insert=d().bind(null,"head"),x.domAPI=g(),x.insertStyleElement=y(),l()(A.A,x),A.A&&A.A.locals&&A.A.locals,window.addEventListener("DOMContentLoaded",(function(){console.log("Snow Blow game starting...");try{new n("gameCanvas").start(),console.log("Game started successfully!")}catch(t){console.error("Failed to start the game:",t)}}))})();