const e=require("../utils"),t=require("npmlog");module.exports=function(o,n,r){return function(n){let u=function(){},s=function(){};const c=new Promise((function(e,t){u=e,s=t}));return n||(n=function(e,t){if(e)return s(e);u(t)}),o.post("https://www.facebook.com/bluebar/modern_settings_menu/?help_type=364455653583099&show_contextual_help=1",r.jar,{pmid:"0"}).then(e.parseAndCheckLogin(r,o)).then((function(t){const n=t.jsmods.instances[0][2][0].filter((function(e){return"logout"===e.value}))[0],u=t.jsmods.markup.filter((function(e){return e[0]===n.markup.__m}))[0][1].__html,s={fb_dtsg:e.getFrom(u,'"fb_dtsg" value="','"'),ref:e.getFrom(u,'"ref" value="','"'),h:e.getFrom(u,'"h" value="','"')};return o.post("https://www.facebook.com/logout.php",r.jar,s).then(e.saveCookies(r.jar))})).then((function(t){if(!t.headers)throw{error:"An error occurred when logging out."};return o.get(t.headers.location,r.jar).then(e.saveCookies(r.jar))})).then((function(){r.loggedIn=!1,t.info("logout","Logged out successfully."),n()})).catch((function(e){return t.error("logout",e),n(e)})),c}};