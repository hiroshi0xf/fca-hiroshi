const e=require("../utils"),t=require("npmlog"),r=require("bluebird"),n={attachment:!0,url:!0,sticker:!0,emoji:!0,emojiSize:!0,body:!0,mentions:!0,location:!0};module.exports=function(i,o,a){function s(r,n,o,s,l){if("Array"===e.getType(n)){for(let e=0;e<n.length;e++)r["specific_to_list["+e+"]"]="fbid:"+n[e];r["specific_to_list["+n.length+"]"]="fbid:"+(a.i_userID||a.userID),r.client_thread_id="root:"+s,t.info("sendMessage","Sending message to multiple users: "+n)}else o?(r["specific_to_list[0]"]="fbid:"+n,r["specific_to_list[1]"]="fbid:"+(a.i_userID||a.userID),r.other_user_fbid=n):r.thread_fbid=n;a.globalOptions.pageID&&(r.author="fbid:"+a.globalOptions.pageID,r["specific_to_list[1]"]="fbid:"+a.globalOptions.pageID,r["creator_info[creatorID]"]=a.i_userID||a.userID,r["creator_info[creatorType]"]="direct_admin",r["creator_info[labelType]"]="sent_message",r["creator_info[pageID]"]=a.globalOptions.pageID,r.request_user_id=a.globalOptions.pageID,r["creator_info[profileURI]"]="https://www.facebook.com/profile.php?id="+(a.i_userID||a.userID)),i.post("https://www.facebook.com/messaging/send/",a.jar,r).then(e.parseAndCheckLogin(a,i)).then((function(e){if(!e)return l({error:"Send message failed."});if(e.error)return 1545012===e.error&&t.warn("sendMessage","Got error 1545012. This might mean that you're not part of the conversation "+n),l(e);const r=e.payload.actions.reduce((function(e,t){return{threadID:t.thread_fbid,messageID:t.message_id,timestamp:t.timestamp}||e}),null);return l(null,r)})).catch((function(r){return t.error("sendMessage",r),"Object"==e.getType(r)&&"Not logged in."===r.error&&(a.loggedIn=!1),l(r)}))}return function(o,l,c,u,d){if(void 0===d&&(d=null),!c&&("Function"===e.getType(l)||"AsyncFunction"===e.getType(l)))return l({error:"Pass a threadID as a second argument."});u||"String"!==e.getType(c)||(u=c,c=function(){});let f=function(){},m=function(){};const p=new Promise((function(e,t){f=e,m=t}));c||(c=function(e,t){if(e)return m(e);f(t)});const _=e.getType(o),g=e.getType(l),h=e.getType(u);if("String"!==_&&"Object"!==_)return c({error:"Message should be of type string or object and not "+_+"."});if("Array"!==g&&"Number"!==g&&"String"!==g)return c({error:"ThreadID should be of type number, string, or array and not "+g+"."});if(u&&"String"!==h)return c({error:"MessageID should be of type string and not "+g+"."});"String"===_&&(o={body:o});const y=Object.keys(o).filter((e=>!n[e]));if(y.length>0)return c({error:"Dissallowed props: `"+y.join(", ")+"`"});const b=e.generateOfflineThreadingID(),I={client:"mercury",action_type:"ma-type:user-generated-message",author:"fbid:"+(a.i_userID||a.userID),timestamp:Date.now(),timestamp_absolute:"Today",timestamp_relative:e.generateTimestampRelative(),timestamp_time_passed:"0",is_unread:!1,is_cleared:!1,is_forward:!1,is_filtered_content:!1,is_filtered_content_bh:!1,is_filtered_content_account:!1,is_filtered_content_quasar:!1,is_filtered_content_invalid_app:!1,is_spoof_warning:!1,source:"source:chat:web","source_tags[0]":"source:chat",body:o.body?o.body.toString():"",html_body:!1,ui_push_phase:"V3",status:"0",offline_threading_id:b,message_id:b,threading_id:e.generateThreadingID(a.clientID),"ephemeral_ttl_mode:":"0",manual_retry_cnt:"0",has_attachment:!!(o.attachment||o.url||o.sticker),signatureID:e.getSignatureID(),replied_to_message_id:u};return function(n,u,f,m){if(n.location){if(null==n.location.latitude||null==n.location.longitude)return f({error:"location property needs both latitude and longitude"});u["location_attachment[coordinates][latitude]"]=n.location.latitude,u["location_attachment[coordinates][longitude]"]=n.location.longitude,u["location_attachment[is_current_location]"]=!!n.location.current}!function(n,u,f,m){n.sticker&&(u.sticker_id=n.sticker),function(n,o,s,l){n.attachment?(o.image_ids=[],o.gif_ids=[],o.file_ids=[],o.video_ids=[],o.audio_ids=[],"Array"!==e.getType(n.attachment)&&(n.attachment=[n.attachment]),function(n,o){const s=[];for(let t=0;t<n.length;t++){if(!e.isReadableStream(n[t]))throw{error:"Attachment should be a readable stream and not "+e.getType(n[t])+"."};s.push(i.postFormData("https://upload.facebook.com/ajax/mercury/upload.php",a.jar,{upload_1024:n[t],voice_clip:"true"},{}).then(e.parseAndCheckLogin(a,i)).then((function(e){if(e.error)throw e;return e.payload.metadata[0]})))}r.all(s).then((function(e){o(null,e)})).catch((function(e){return t.error("uploadAttachment",e),o(e)}))}(n.attachment,(function(e,t){if(e)return s(e);t.forEach((function(e){const t=Object.keys(e)[0];o[t+"s"].push(e[t])})),l()}))):l()}(o,I,c,(()=>function(r,n,o,s){var l;r.url?(n["shareable_attachment[share_type]"]="100",l=function(e,t){if(e)return o(e);n["shareable_attachment[share_params]"]=t,s()},i.post("https://www.facebook.com/message_share_attachment/fromURI/",a.jar,{image_height:960,image_width:960,uri:r.url}).then(e.parseAndCheckLogin(a,i)).then((function(e){return e.error?l(e):e.payload?void l(null,e.payload.share_data.share_params):l({error:"Invalid url"})})).catch((function(e){return t.error("getUrl",e),l(e)}))):s()}(o,I,c,(()=>function(r,n,i,a){if(null!=r.emojiSize&&null==r.emoji)return i({error:"emoji property is empty"});if(r.emoji){if(null==r.emojiSize&&(r.emojiSize="medium"),"small"!=r.emojiSize&&"medium"!=r.emojiSize&&"large"!=r.emojiSize)return i({error:"emojiSize property is invalid"});if(null!=n.body&&""!=n.body)return i({error:"body is not empty"});n.body=r.emoji,n["tags[0]"]="hot_emoji_size:"+r.emojiSize}!function(r,n,i,o){if(r.mentions)for(let e=0;e<r.mentions.length;e++){const o=r.mentions[e],a=o.tag;if("string"!=typeof a)return i({error:"Mention tags must be strings."});const s=r.body.indexOf(a,o.fromIndex||0);s<0&&t.warn("handleMention",'Mention for "'+a+'" not found in message string.'),null==o.id&&t.warn("handleMention","Mention id should be non-null.");const l=o.id||0;n["profile_xmd["+e+"][offset]"]=s,n["profile_xmd["+e+"][length]"]=a.length,n["profile_xmd["+e+"][id]"]=l,n["profile_xmd["+e+"][type]"]="p"}!function(t,r,n,i,o){"Array"===e.getType(r)?s(t,r,!1,n,i):"Boolean"!=e.getType(o)?s(t,r,r.toString().length<16,n,i):s(t,r,!o,n,i)}(I,l,b,c,d)}(o,I,c)}(o,I,c)))))}(o,I)}(o,I,c),p}};