const e=require("../utils"),n=require("npmlog");module.exports=function(r,t,o){return function(t,c,u){if("Boolean"!==e.getType(c))throw{error:"Please pass a boolean as a second argument."};let a=function(){},i=function(){};const s=new Promise((function(e,n){a=e,i=n}));u||(u=function(e,n){if(e)return i(e);a(n)});const f={client:"mercury"};"Array"!==e.getType(t)&&(t=[t]);const h=c?"inbox":"other";for(let e=0;e<t.length;e++)f[h+"["+e+"]"]=t[e];return r.post("https://www.facebook.com/ajax/mercury/move_thread.php",o.jar,f).then(e.parseAndCheckLogin(o,r)).then((function(e){if(e.error)throw e;return u()})).catch((function(e){return n.error("handleMessageRequest",e),u(e)})),s}};