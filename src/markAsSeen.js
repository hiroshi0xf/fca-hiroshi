const e=require("../utils"),n=require("npmlog");module.exports=function(t,r,o){return function(r,c){"Function"!=e.getType(r)&&"AsyncFunction"!=e.getType(r)||(c=r,r=Date.now());let i=function(){},u=function(){};const s=new Promise((function(e,n){i=e,u=n}));return c||(c=function(e,n){if(e)return u(e);i(n)}),t.post("https://www.facebook.com/ajax/mercury/mark_seen.php",o.jar,{seen_timestamp:r}).then(e.saveCookies(o.jar)).then(e.parseAndCheckLogin(o,t)).then((function(e){if(e.error)throw e;return c()})).catch((function(t){return n.error("markAsSeen",t),"Object"==e.getType(t)&&"Not logged in."===t.error&&(o.loggedIn=!1),c(t)})),s}};