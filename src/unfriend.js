const n=require("../utils"),e=require("npmlog");module.exports=function(r,t,o){return function(t,i){let u=function(){},c=function(){};const f=new Promise((function(n,e){u=n,c=e}));return i||(i=function(n,e){if(n)return c(n);u(e)}),r.post("https://www.facebook.com/ajax/profile/removefriendconfirm.php",o.jar,{uid:t,unref:"bd_friends_tab",floc:"friends_tab","nctr[_mod]":"pagelet_timeline_app_collection_"+(o.i_userID||o.userID)+":2356318349:2"}).then(n.parseAndCheckLogin(o,r)).then((function(n){if(n.error)throw n;return i()})).catch((function(n){return e.error("unfriend",n),i(n)})),f}};