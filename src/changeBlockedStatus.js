const n=require("../utils"),e=require("npmlog");module.exports=function(t,o,r){return function(o,u,c){let i=function(){},s=function(){};const f=new Promise((function(n,e){i=n,s=e}));return c||(c=function(n){if(n)return s(n);i()}),t.post("https://www.facebook.com/messaging/"+(u?"":"un")+"block_messages/",r.jar,{fbid:o}).then(n.saveCookies(r.jar)).then(n.parseAndCheckLogin(r,t)).then((function(n){if(n.error)throw n;return c()})).catch((function(n){return e.error("changeBlockedStatus",n),c(n)})),f}};