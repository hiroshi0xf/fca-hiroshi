const t=require("../utils"),n=require("npmlog");module.exports=function(o,r,e){return function(r,u,c,i,l){let a=function(){},f=function(){};const p=new Promise((function(t,n){a=t,f=n}));return"Function"!=t.getType(u)&&"AsyncFunction"!=t.getType(u)||(i=u,u={}),"Function"!=t.getType(c)&&"AsyncFunction"!=t.getType(c)||(i=c,c={}),c=c||{},i=i||function(t,n){if(t)return f(t);a(n)},l?t.postFormData(r,e.jar,u,e.globalOptions,e,c).then((function(t){i(null,t.body.toString())})).catch((function(t){return n.error("httpGet",t),i(t)})):o.postFormData(r,e.jar,u,null,c).then((function(t){i(null,t.body.toString())})).catch((function(t){return n.error("httpPostFormData",t),i(t)})),p}};