const e=require("../utils"),t=require("npmlog");module.exports=function(r,n,a){return async function(n,o,s){"Function"!==e.getType(o)&&"AsyncFunction"!==e.getType(o)||(s=o,o=!0),null==o&&(o=!0),s||(s=()=>{});const i={};if(void 0!==a.globalOptions.pageID){let c;i.source="PagesManagerMessagesInterface",i.request_user_id=a.globalOptions.pageID,i["ids["+n+"]"]=o,i.watermarkTimestamp=(new Date).getTime(),i.shouldSendReadReceipt=!0,i.commerce_last_message_type="";try{c=await r.post("https://www.facebook.com/ajax/mercury/change_read_status.php",a.jar,i).then(e.saveCookies(a.jar)).then(e.parseAndCheckLogin(a,r))}catch(e){return s(e),e}if(c.error){const r=c.error;return t.error("markAsRead",r),"Object"==e.getType(r)&&"Not logged in."===r.error&&(a.loggedIn=!1),s(r),r}return s(),null}try{if(!a.mqttClient)throw{error:"You can only use this function after you start listening."};{const e=await new Promise((e=>a.mqttClient.publish("/mark_thread",JSON.stringify({threadID:n,mark:"read",state:o}),{qos:1,retain:!1},e)));if(e)throw e}}catch(e){return s(e),e}}};