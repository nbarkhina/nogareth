parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Ap1r":[function(require,module,exports) {
var define;
var t;function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function h(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function o(t){var e=c();return function(){var i,n=u(t);if(e){var h=u(this).constructor;i=Reflect.construct(n,arguments,h)}else i=n.apply(this,arguments);return l(this,i)}}function l(t,i){return!i||"object"!==e(i)&&"function"!=typeof i?a(t):i}function a(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}t(["require","exports","./thing","./bob","./data"],function(t,e,n,r,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Player=void 0;var a=function(t){s(a,n.Thing);var e=o(a);function a(t,n,h,s){var r;return i(this,a),(r=e.call(this,t,n,h,s)).hurtDelay=new Date,r.type_id=l.CONSTANTS.GameType.PLAYER,r.height=20,r.width=26,r.speed=4,r.animationSpeed=2,r.hasRedKey=!1,r.hasGreenKey=!1,r.hasBlueKey=!1,r}return h(a,[{key:"draw",value:function(){this.processAnimation(),r.BOBAPI.Draw_BOB16(this.bob)}},{key:"update",value:function(){this.state!=l.CONSTANTS.ThingState.FALLING&&(this.vx=0,this.vy=0,this.velocity=0,l.INPUTCONTROLLER.Key_Down&&(this.angle=180,this.velocity=this.speed),l.INPUTCONTROLLER.Key_Up&&(this.angle=0,this.velocity=this.speed),l.INPUTCONTROLLER.Key_Left&&(l.INPUTCONTROLLER.Key_Up?this.angle=315:l.INPUTCONTROLLER.Key_Down?this.angle=225:this.angle=270,this.velocity=this.speed),l.INPUTCONTROLLER.Key_Right&&(l.INPUTCONTROLLER.Key_Up?this.angle=45:l.INPUTCONTROLLER.Key_Down?this.angle=135:this.angle=90,this.velocity=this.speed),"1"==l.INPUTCONTROLLER.KEY_PRESS&&(this.hasRedKey=!0,this.hasGreenKey=!0,this.hasBlueKey=!0),"2"==l.INPUTCONTROLLER.KEY_PRESS&&(l.GAME.load_level("levels\\mikeslevel.txt"),this.x=520,this.y=1040),"3"==l.INPUTCONTROLLER.KEY_PRESS&&(l.GAME.load_level("levels\\juanlevel.txt"),this.x=480,this.y=440),"4"==l.INPUTCONTROLLER.KEY_PRESS&&(l.GAME.load_level("levels\\neallevel.txt"),this.x=3800,this.y=3800),"5"==l.INPUTCONTROLLER.KEY_PRESS&&(this.health=1e7),"6"==l.INPUTCONTROLLER.KEY_PRESS&&(this.speed=15),"7"==l.INPUTCONTROLLER.KEY_PRESS&&(this.speed=4),this.getComponents())}},{key:"move",value:function(){if(this.state!=l.CONSTANTS.ThingState.FALLING){this.x=this.x+this.round(this.vx),this.movingX=!0,this.checkCorners(l.CONSTANTS.GameType.TILE);for(var t=0;t<this.currentLevel.objectSize;t++)this.checkCollision(this.currentLevel.objectArray[t])>0&&(this.currentLevel.objectArray[t].handleCollision(this),this.handleCollision(this.currentLevel.objectArray[t]));for(var e=0;e<this.currentLevel.enemySize;e++)this.checkCollision(this.currentLevel.enemyArray[e])>0&&(this.currentLevel.enemyArray[e].handleCollision(this),this.handleCollision(this.currentLevel.enemyArray[e]));this.movingX=!1,this.y=this.y+this.round(this.vy),this.movingY=!0,this.checkCorners(l.CONSTANTS.GameType.TILE);for(var i=0;i<this.currentLevel.objectSize;i++)this.checkCollision(this.currentLevel.objectArray[i])>0&&(this.currentLevel.objectArray[i].handleCollision(this),this.handleCollision(this.currentLevel.objectArray[i]));for(var n=0;n<this.currentLevel.enemySize;n++)this.checkCollision(this.currentLevel.enemyArray[n])>0&&(this.currentLevel.enemyArray[n].handleCollision(this),this.handleCollision(this.currentLevel.enemyArray[n]));this.movingY=!1}}},{key:"processAnimation",value:function(){this.state==l.CONSTANTS.ThingState.FALLING&&(this.animationCounter<15&&(this.currentFrame=12),this.animationCounter>=15&&this.animationCounter<30&&(this.currentFrame=13),this.animationCounter>=30&&this.animationCounter<45&&(this.currentFrame=14),this.animationCounter>=45&&(this.alive=!1)),this.state==l.CONSTANTS.ThingState.NORMAL&&(0==this.velocity&&(this.animationFlipper=0),this.angle>=0&&this.angle<90&&(this.currentFrame=9+this.animationFlipper),this.angle>=90&&this.angle<180&&(this.currentFrame=3+this.animationFlipper),this.angle>=180&&this.angle<270&&(this.currentFrame=0+this.animationFlipper),this.angle>=270&&this.angle<360&&(this.currentFrame=6+this.animationFlipper),this.animationCounter==this.animationSpeed&&(this.animationFlipper++,this.animationCounter=0,this.animationFlipper>2&&(this.animationFlipper=0))),this.animationCounter++,this.bob.curr_frame=this.currentFrame,this.bob.x=320,this.bob.y=220}},{key:"checkCorners",value:function(t){this.x<=0||this.y<=0||this.x+this.width-1>=40*this.currentLevel.width||this.y+this.height-1>=40*this.currentLevel.height||t==l.CONSTANTS.GameType.TILE&&(this.checkCollision(this.currentLevel.getTileObject(this.x,this.y))>0&&(this.currentLevel.getTileObject(this.x,this.y).handleCollision(this),this.handleCollision(this.currentLevel.getTileObject(this.x,this.y))),this.checkCollision(this.currentLevel.getTileObject(this.x+this.width-1,this.y))>0&&(this.currentLevel.getTileObject(this.x+this.width-1,this.y).handleCollision(this),this.handleCollision(this.currentLevel.getTileObject(this.x+this.width-1,this.y))),this.checkCollision(this.currentLevel.getTileObject(this.x+this.width-1,this.y+this.height-1))>0&&(this.currentLevel.getTileObject(this.x+this.width-1,this.y+this.height-1).handleCollision(this),this.handleCollision(this.currentLevel.getTileObject(this.x+this.width-1,this.y+this.height-1))),this.checkCollision(this.currentLevel.getTileObject(this.x,this.y+this.height-1))>0&&(this.currentLevel.getTileObject(this.x,this.y+this.height-1).handleCollision(this),this.handleCollision(this.currentLevel.getTileObject(this.x,this.y+this.height-1))))}},{key:"hurt",value:function(t){(new Date).getTime()-this.hurtDelay.getTime()>100&&(r.BOBAPI.DSound_Play(1),this.hurtDelay=new Date),this.health-=t}},{key:"bounce",value:function(t){if(this.state!=l.CONSTANTS.ThingState.FALLING){var e=19,i=19;this.x<t.x&&(e=-19),this.y<t.y&&(i=-19),this.x=this.x+e,this.movingX=!0,this.checkCorners(l.CONSTANTS.GameType.TILE),this.movingX=!1,this.y=this.y+i,this.movingY=!0,this.checkCorners(l.CONSTANTS.GameType.TILE),this.movingY=!1}}}]),a}();e.Player=a});
},{}]},{},["Ap1r"], null)
//# sourceMappingURL=game/player.js.map