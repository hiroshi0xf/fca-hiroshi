const e=require("bluebird");let t=e.promisify(require("request").defaults({jar:!0,proxy:process.env.FB_PROXY}));const a=require("stream"),r=require("npmlog"),i=require("querystring"),n=require("url");function s(e,t,a,r){const i={"Content-Type":"application/x-www-form-urlencoded",Referer:"https://www.facebook.com/",Host:e.replace("https://","").split("/")[0],Origin:"https://www.facebook.com","User-Agent":t.userAgent,Connection:"keep-alive","sec-fetch-site":"same-origin"};return r&&Object.assign(i,r),a&&a.region&&(i["X-MSGR-Region"]=a.region),i}function o(e,a,r,i,n){if("Object"===I(r))for(const e in r)r.hasOwnProperty(e)&&"Object"===I(r[e])&&(r[e]=JSON.stringify(r[e]));const o={headers:s(e,i,n),timeout:6e4,qs:r,url:e,method:"GET",jar:a,gzip:!0};return t(o).then((function(e){return Array.isArray(e)?e[0]:e}))}function m(e,a,r,i,n,o){const m={headers:s(e,i,n,o),timeout:6e4,url:e,method:"POST",form:r,jar:a,gzip:!0};return t(m).then((function(e){return Array.isArray(e)?e[0]:e}))}function c(e,a,r,i,n,o){const m=s(e,n,o);return m["Content-Type"]="multipart/form-data",t({headers:m,timeout:6e4,url:e,method:"POST",formData:r,qs:i,jar:a,gzip:!0}).then((function(e){return Array.isArray(e)?e[0]:e}))}let l;const d={},u={_:"%",A:"%2",B:"000",C:"%7d",D:"%7b%22",E:"%2c%22",F:"%22%3a",G:"%2c%22ut%22%3a1",H:"%2c%22bls%22%3a",I:"%2c%22n%22%3a%22%",J:"%22%3a%7b%22i%22%3a0%7d",K:"%2c%22pt%22%3a0%2c%22vis%22%3a",L:"%2c%22ch%22%3a%7b%22h%22%3a%22",M:"%7b%22v%22%3a2%2c%22time%22%3a1",N:".channel%22%2c%22sub%22%3a%5b",O:"%2c%22sb%22%3a1%2c%22t%22%3a%5b",P:"%2c%22ud%22%3a100%2c%22lc%22%3a0",Q:"%5d%2c%22f%22%3anull%2c%22uct%22%3a",R:".channel%22%2c%22sub%22%3a%5b1%5d",S:"%22%2c%22m%22%3a0%7d%2c%7b%22i%22%3a",T:"%2c%22blc%22%3a1%2c%22snd%22%3a1%2c%22ct%22%3a",U:"%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a",V:"%2c%22blc%22%3a0%2c%22snd%22%3a0%2c%22ct%22%3a",W:"%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a",X:"%2c%22ri%22%3a0%7d%2c%22state%22%3a%7b%22p%22%3a0%2c%22ut%22%3a1",Y:"%2c%22pt%22%3a0%2c%22vis%22%3a1%2c%22bls%22%3a0%2c%22blc%22%3a0%2c%22snd%22%3a1%2c%22ct%22%3a",Z:"%2c%22sb%22%3a1%2c%22t%22%3a%5b%5d%2c%22f%22%3anull%2c%22uct%22%3a0%2c%22s%22%3a0%2c%22blo%22%3a0%7d%2c%22bl%22%3a%7b%22ac%22%3a"};function p(e,t=""){if(e)return e;{const e=t.split(".").pop();return e===t?"":e}}function g(e,t){const a=e.filename,r=Number(e.fileSize||0),s=e.genericMetadata?Number(e.genericMetadata.videoLength):void 0,o=e.genericMetadata?Number(e.genericMetadata.duration):void 0,m=e.mimeType;t=t||{id:"",image_data:{}};let c=(e=e.mercury||e).blob_attachment||e.sticker_attachment,l=c&&c.__typename?c.__typename:e.attach_type;switch(!l&&e.sticker_attachment?(l="StickerAttachment",c=e.sticker_attachment):!l&&e.extensible_attachment&&(l=e.extensible_attachment.story_attachment&&e.extensible_attachment.story_attachment.target&&e.extensible_attachment.story_attachment.target.__typename&&"MessageLocation"===e.extensible_attachment.story_attachment.target.__typename?"MessageLocation":"ExtensibleAttachment",c=e.extensible_attachment),l){case"sticker":return{type:"sticker",ID:e.metadata.stickerID.toString(),url:e.url,packID:e.metadata.packID.toString(),spriteUrl:e.metadata.spriteURI,spriteUrl2x:e.metadata.spriteURI2x,width:e.metadata.width,height:e.metadata.height,caption:t.caption,description:t.description,frameCount:e.metadata.frameCount,frameRate:e.metadata.frameRate,framesPerRow:e.metadata.framesPerRow,framesPerCol:e.metadata.framesPerCol,stickerID:e.metadata.stickerID.toString(),spriteURI:e.metadata.spriteURI,spriteURI2x:e.metadata.spriteURI2x};case"file":return{type:"file",ID:t.id.toString(),fullFileName:a,filename:e.name,fileSize:r,original_extension:p(e.original_extension,a),mimeType:m,url:e.url,isMalicious:t.is_malicious,contentType:t.mime_type,name:e.name};case"photo":return{type:"photo",ID:e.metadata.fbid.toString(),filename:e.fileName,fullFileName:a,fileSize:r,original_extension:p(e.original_extension,a),mimeType:m,thumbnailUrl:e.thumbnail_url,previewUrl:e.preview_url,previewWidth:e.preview_width,previewHeight:e.preview_height,largePreviewUrl:e.large_preview_url,largePreviewWidth:e.large_preview_width,largePreviewHeight:e.large_preview_height,url:e.metadata.url,width:e.metadata.dimensions.split(",")[0],height:e.metadata.dimensions.split(",")[1],name:a};case"animated_image":return{type:"animated_image",ID:t.id.toString(),filename:t.filename,fullFileName:a,original_extension:p(t.original_extension,a),mimeType:m,previewUrl:e.preview_url,previewWidth:e.preview_width,previewHeight:e.preview_height,url:t.image_data.url,width:t.image_data.width,height:t.image_data.height,name:e.name,facebookUrl:e.url,thumbnailUrl:e.thumbnail_url,rawGifImage:t.image_data.raw_gif_image,rawWebpImage:t.image_data.raw_webp_image,animatedGifUrl:t.image_data.animated_gif_url,animatedGifPreviewUrl:t.image_data.animated_gif_preview_url,animatedWebpUrl:t.image_data.animated_webp_url,animatedWebpPreviewUrl:t.image_data.animated_webp_preview_url};case"share":return{type:"share",ID:e.share.share_id.toString(),url:t.href,title:e.share.title,description:e.share.description,source:e.share.source,image:e.share.media.image,width:e.share.media.image_size.width,height:e.share.media.image_size.height,playable:e.share.media.playable,duration:e.share.media.duration,subattachments:e.share.subattachments,properties:{},animatedImageSize:e.share.media.animated_image_size,facebookUrl:e.share.uri,target:e.share.target,styleList:e.share.style_list};case"video":return{type:"video",ID:e.metadata.fbid.toString(),filename:e.name,fullFileName:a,original_extension:p(e.original_extension,a),mimeType:m,duration:s,previewUrl:e.preview_url,previewWidth:e.preview_width,previewHeight:e.preview_height,url:e.url,width:e.metadata.dimensions.width,height:e.metadata.dimensions.height,videoType:"unknown",thumbnailUrl:e.thumbnail_url};case"error":return{type:"error",attachment1:e,attachment2:t};case"MessageImage":return{type:"photo",ID:c.legacy_attachment_id,filename:c.filename,fullFileName:a,fileSize:r,original_extension:p(c.original_extension,a),mimeType:m,thumbnailUrl:c.thumbnail.uri,previewUrl:c.preview.uri,previewWidth:c.preview.width,previewHeight:c.preview.height,largePreviewUrl:c.large_preview.uri,largePreviewWidth:c.large_preview.width,largePreviewHeight:c.large_preview.height,url:c.large_preview.uri,width:c.original_dimensions.x,height:c.original_dimensions.y,name:c.filename};case"MessageAnimatedImage":return{type:"animated_image",ID:c.legacy_attachment_id,filename:c.filename,fullFileName:a,original_extension:p(c.original_extension,a),mimeType:m,previewUrl:c.preview_image.uri,previewWidth:c.preview_image.width,previewHeight:c.preview_image.height,url:c.animated_image.uri,width:c.animated_image.width,height:c.animated_image.height,thumbnailUrl:c.preview_image.uri,name:c.filename,facebookUrl:c.animated_image.uri,rawGifImage:c.animated_image.uri,animatedGifUrl:c.animated_image.uri,animatedGifPreviewUrl:c.preview_image.uri,animatedWebpUrl:c.animated_image.uri,animatedWebpPreviewUrl:c.preview_image.uri};case"MessageVideo":return{type:"video",ID:c.legacy_attachment_id,filename:c.filename,fullFileName:a,original_extension:p(c.original_extension,a),fileSize:r,duration:s,mimeType:m,previewUrl:c.large_image.uri,previewWidth:c.large_image.width,previewHeight:c.large_image.height,url:c.playable_url,width:c.original_dimensions.x,height:c.original_dimensions.y,videoType:c.video_type.toLowerCase(),thumbnailUrl:c.large_image.uri};case"MessageAudio":return{type:"audio",ID:c.url_shimhash,filename:c.filename,fullFileName:a,fileSize:r,duration:o,original_extension:p(c.original_extension,a),mimeType:m,audioType:c.audio_type,url:c.playable_url,isVoiceMail:c.is_voicemail};case"StickerAttachment":case"Sticker":return{type:"sticker",ID:c.id,url:c.url,packID:c.pack?c.pack.id:null,spriteUrl:c.sprite_image,spriteUrl2x:c.sprite_image_2x,width:c.width,height:c.height,caption:c.label,description:c.label,frameCount:c.frame_count,frameRate:c.frame_rate,framesPerRow:c.frames_per_row,framesPerCol:c.frames_per_column,stickerID:c.id,spriteURI:c.sprite_image,spriteURI2x:c.sprite_image_2x};case"MessageLocation":var d,u,g,h,_,f=c.story_attachment.url,y=c.story_attachment.media,b=i.parse(n.parse(f).query).u,w=i.parse(n.parse(b).query).where1,v=w.split(", ");try{d=Number.parseFloat(v[0]),u=Number.parseFloat(v[1])}catch(e){}return y&&y.image&&(g=y.image.uri,h=y.image.width,_=y.image.height),{type:"location",ID:c.legacy_attachment_id,latitude:d,longitude:u,image:g,width:h,height:_,url:b||f,address:w,facebookUrl:c.story_attachment.url,target:c.story_attachment.target,styleList:c.story_attachment.style_list};case"ExtensibleAttachment":return{type:"share",ID:c.legacy_attachment_id,url:c.story_attachment.url,title:c.story_attachment.title_with_entities.text,description:c.story_attachment.description&&c.story_attachment.description.text,source:c.story_attachment.source?c.story_attachment.source.text:null,image:c.story_attachment.media&&c.story_attachment.media.image&&c.story_attachment.media.image.uri,width:c.story_attachment.media&&c.story_attachment.media.image&&c.story_attachment.media.image.width,height:c.story_attachment.media&&c.story_attachment.media.image&&c.story_attachment.media.image.height,playable:c.story_attachment.media&&c.story_attachment.media.is_playable,duration:c.story_attachment.media&&c.story_attachment.media.playable_duration_in_ms,playableUrl:null==c.story_attachment.media?null:c.story_attachment.media.playable_url,subattachments:c.story_attachment.subattachments,properties:c.story_attachment.properties.reduce((function(e,t){return e[t.key]=t.value.text,e}),{}),facebookUrl:c.story_attachment.url,target:c.story_attachment.target,styleList:c.story_attachment.style_list};case"MessageFile":return{type:"file",ID:c.message_file_fbid,fullFileName:a,filename:c.filename,fileSize:r,mimeType:c.mimetype,original_extension:c.original_extension||a.split(".").pop(),url:c.url,isMalicious:c.is_malicious,contentType:c.content_type,name:c.filename};default:throw new Error("unrecognized attach_file of type "+l+"`"+JSON.stringify(e,null,4)+" attachment2: "+JSON.stringify(t,null,4)+"`")}}function h(e){return null!=e&&null!=e?e.replace(/(fb)?id[:.]/,""):e}function _(e){const t=e.message?e.message:e,a={type:"message",senderName:t.sender_name,senderID:h(t.sender_fbid.toString()),participantNames:t.group_thread_info?t.group_thread_info.participant_names:[t.sender_name.split(" ")[0]],participantIDs:t.group_thread_info?t.group_thread_info.participant_ids.map((function(e){return h(e.toString())})):[h(t.sender_fbid)],body:t.body||"",threadID:h((t.thread_fbid||t.other_user_fbid).toString()),threadName:t.group_thread_info?t.group_thread_info.name:t.sender_name,location:t.coordinates?t.coordinates:null,messageID:t.mid?t.mid.toString():t.message_id,attachments:(r=t.attachments,i=t.attachmentIds,n=t.attachment_map,s=t.share_map,n=s||n,r?r.map((function(e,t){return n&&i&&n[i[t]]?g(e,n[i[t]]):g(e)})):[]),timestamp:t.timestamp,timestampAbsolute:t.timestamp_absolute,timestampRelative:t.timestamp_relative,timestampDatetime:t.timestamp_datetime,tags:t.tags,reactions:t.reactions?t.reactions:[],isUnread:t.is_unread};var r,i,n,s;return"pages_messaging"===e.type&&(a.pageID=e.realtime_viewer_fbid.toString()),a.isGroup=a.participantIDs.length>2,a}function f(e){switch(e){case"change_thread_theme":return"log:thread-color";case"change_thread_icon":return"log:thread-icon";case"change_thread_nickname":return"log:user-nickname";case"change_thread_admins":return"log:thread-admins";case"group_poll":return"log:thread-poll";case"change_thread_approval_mode":return"log:thread-approval-mode";case"messenger_call_log":case"participant_joined_group_call":return"log:thread-call";default:return e}}function y(e,t,a){const r=e.indexOf(t)+t.length;if(r<t.length)return"";const i=e.substring(r),n=i.indexOf(a);if(-1===n)throw Error("Could not find endTime `"+a+"` in the given string.");return i.substring(0,n)}function b(e){const t=e.replace(/for\s*\(\s*;\s*;\s*\)\s*;\s*/,"").split(/\}\r\n *\{/);return 1===t.length?t:"["+t.join("},{")+"]"}!function(){const e=[];for(const t in u)d[u[t]]=t,e.push(u[t]);e.reverse(),l=new RegExp(e.join("|"),"g")}();const w=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],v=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];function x(e,t){return e[0]+"="+e[1]+"; Path="+e[3]+"; Domain="+t+".com"}function I(e){return Object.prototype.toString.call(e).slice(8,-1)}module.exports={isReadableStream:function(e){return e instanceof a.Stream&&("Function"===I(e._read)||"AsyncFunction"===I(e._read))&&"Object"===I(e._readableState)},get:o,post:m,postFormData:c,generateThreadingID:function(e){return"<"+Date.now()+":"+Math.floor(4294967295*Math.random())+"-"+e+"@mail.projektitan.com>"},generateOfflineThreadingID:function(){const e=Date.now(),t=("0000000000000000000000"+Math.floor(4294967295*Math.random()).toString(2)).slice(-22);return function(e){let t="";for(;"0"!==e;){let a=0,r="",i=0;for(;i<e.length;i++)a=2*a+parseInt(e[i],10),a>=10?(r+="1",a-=10):r+="0";t=a.toString()+t,e=r.slice(r.indexOf("1"))}return t}(e.toString(2)+t)},getGUID:function(){let e=Date.now();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){const a=Math.floor((e+16*Math.random())%16);return e=Math.floor(e/16),("x"==t?a:7&a|8).toString(16)}))},getFrom:y,makeParsable:b,arrToForm:function(e){return t=function(e){return e.name},a=function(e){return e.val},e.reduce((function(e,r){return e[t(r)]=a(r),e}),{});var t,a},getSignatureID:function(){return Math.floor(2147483648*Math.random()).toString(16)},getJar:t.jar,generateTimestampRelative:function(){const e=new Date;return e.getHours()+":"+function(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}(e.getMinutes())},makeDefaults:function(e,t,a){let r=1;const i=y(e,'name="fb_dtsg" value="','"');let n="2";for(let e=0;e<i.length;e++)n+=i.charCodeAt(e);const s=y(e,'revision":',",");function l(e){const o={__user:t,__req:(r++).toString(36),__rev:s,__a:1,fb_dtsg:a.fb_dtsg?a.fb_dtsg:i,jazoest:a.ttstamp?a.ttstamp:n};if(!e)return o;for(const t in e)e.hasOwnProperty(t)&&(o[t]||(o[t]=e[t]));return o}return{get:function(e,t,r,i,n={}){return o(e,t,l(r),a.globalOptions,i||a)},post:function(e,t,r,i,n={}){return m(e,t,l(r),a.globalOptions,i||a,n)},postFormData:function(e,t,r,i,n){return c(e,t,l(r),l(i),a.globalOptions,n||a)}}},parseAndCheckLogin:function t(a,i,n){return null==n&&(n=0),function(s){return e.try((function(){if(r.verbose("parseAndCheckLogin",s.body),s.statusCode>=500&&s.statusCode<600){if(n>=5){const e=new Error("Request retry failed. Check the `res` and `statusCode` property on this error.");throw e.statusCode=s.statusCode,e.res=s.body,e.error="Request retry failed. Check the `res` and `statusCode` property on this error.",e}n++;const o=Math.floor(5e3*Math.random());r.warn("parseAndCheckLogin","Got status code "+s.statusCode+" - "+n+". attempt to retry in "+o+" milliseconds...");const m=s.request.uri.protocol+"//"+s.request.uri.hostname+s.request.uri.pathname;return"multipart/form-data"===s.request.headers["Content-Type"].split(";")[0]?e.delay(o).then((function(){return i.postFormData(m,a.jar,s.request.formData,{})})).then(t(a,i,n)):e.delay(o).then((function(){return i.post(m,a.jar,s.request.formData)})).then(t(a,i,n))}if(200!==s.statusCode)throw new Error("parseAndCheckLogin got status code: "+s.statusCode+". Bailing out of trying to parse response.");let o=null;try{o=JSON.parse(b(s.body))}catch(e){const t=new Error("JSON.parse error. Check the `detail` property on this error.");throw t.error="JSON.parse error. Check the `detail` property on this error.",t.detail=e,t.res=s.body,t}if(o.redirect&&"GET"===s.request.method)return i.get(o.redirect,a.jar).then(t(a,i));if(o.jsmods&&o.jsmods.require&&Array.isArray(o.jsmods.require[0])&&"Cookie"===o.jsmods.require[0][0]){o.jsmods.require[0][3][0]=o.jsmods.require[0][3][0].replace("_js_","");const e=x(o.jsmods.require[0][3],"facebook"),t=x(o.jsmods.require[0][3],"messenger");a.jar.setCookie(e,"https://www.facebook.com"),a.jar.setCookie(t,"https://www.messenger.com")}if(o.jsmods&&Array.isArray(o.jsmods.require)){const e=o.jsmods.require;for(const t in e)if("DTSG"===e[t][0]&&"setToken"===e[t][1]){a.fb_dtsg=e[t][3][0],a.ttstamp="2";for(let e=0;e<a.fb_dtsg.length;e++)a.ttstamp+=a.fb_dtsg.charCodeAt(e)}}if(1357001===o.error){const e=new Error("Facebook blocked login. Please visit https://facebook.com and check your account.");throw e.error="Not logged in.",e}return o}))}},saveCookies:function(e){return function(t){return(t.headers["set-cookie"]||[]).forEach((function(t){t.indexOf(".facebook.com")>-1&&e.setCookie(t,"https://www.facebook.com");const a=t.replace(/domain=\.facebook\.com/,"domain=.messenger.com");e.setCookie(a,"https://www.messenger.com")})),t}},getType:I,_formatAttachment:g,formatHistoryMessage:function(e){return"ma-type:log-message"===e.action_type?function(e){const t=e.message?e.message:e;let a,r=t.log_message_type;return"log:generic-admin-text"===r?(a=t.log_message_data.untypedData,r=f(t.log_message_data.message_type)):a=t.log_message_data,Object.assign(_(t),{type:"event",logMessageType:r,logMessageData:a,logMessageBody:t.log_message_body})}(e):_(e)},formatID:h,formatMessage:_,formatDeltaEvent:function(e){let t,a;switch(e.class){case"AdminTextMessage":a=e.untypedData,t=f(e.type);break;case"ThreadName":t="log:thread-name",a={name:e.name};break;case"ParticipantsAddedToGroupThread":t="log:subscribe",a={addedParticipants:e.addedParticipants};break;case"ParticipantLeftGroupThread":t="log:unsubscribe",a={leftParticipantFbId:e.leftParticipantFbId};break;case"ApprovalQueue":t="log:approval-queue",a={approvalQueue:{action:e.action,recipientFbId:e.recipientFbId,requestSource:e.requestSource,...e.messageMetadata}}}return{type:"event",threadID:h((e.messageMetadata.threadKey.threadFbId||e.messageMetadata.threadKey.otherUserFbId).toString()),messageID:e.messageMetadata.messageId.toString(),logMessageType:t,logMessageData:a,logMessageBody:e.messageMetadata.adminText,timestamp:e.messageMetadata.timestamp,author:e.messageMetadata.actorFbId,participantIDs:e.participants||[]}},formatDeltaMessage:function(e){const t=e.delta.messageMetadata,a=void 0===e.delta.data||void 0===e.delta.data.prng?[]:JSON.parse(e.delta.data.prng),r=a.map((e=>e.i)),i=a.map((e=>e.o)),n=a.map((e=>e.l)),s={};for(let t=0;t<r.length;t++)s[r[t]]=e.delta.body.substring(i[t],i[t]+n[t]);return{type:"message",senderID:h(t.actorFbId.toString()),body:e.delta.body||"",threadID:h((t.threadKey.threadFbId||t.threadKey.otherUserFbId).toString()),messageID:t.messageId,attachments:(e.delta.attachments||[]).map((e=>g(e))),mentions:s,timestamp:t.timestamp,isGroup:!!t.threadKey.threadFbId,participantIDs:e.delta.participants||[]}},formatProxyPresence:function(e,t){return void 0===e.lat||void 0===e.p?null:{type:"presence",timestamp:1e3*e.lat,userID:t,statuses:e.p}},formatPresence:function(e,t){return{type:"presence",timestamp:1e3*e.la,userID:t,statuses:e.a}},formatTyp:function(e){return{isTyping:!!e.st,from:e.from.toString(),threadID:h((e.to||e.thread_fbid||e.from).toString()),fromMobile:!e.hasOwnProperty("from_mobile")||e.from_mobile,userID:(e.realtime_viewer_fbid||e.from).toString(),type:"typ"}},formatDeltaReadReceipt:function(e){return{reader:(e.threadKey.otherUserFbId||e.actorFbId).toString(),time:e.actionTimestampMs,threadID:h((e.threadKey.otherUserFbId||e.threadKey.threadFbId).toString()),type:"read_receipt"}},formatCookie:x,formatThread:function(e){return{threadID:h(e.thread_fbid.toString()),participants:e.participants.map(h),participantIDs:e.participants.map(h),name:e.name,nicknames:e.custom_nickname,snippet:e.snippet,snippetAttachments:e.snippet_attachments,snippetSender:h((e.snippet_sender||"").toString()),unreadCount:e.unread_count,messageCount:e.message_count,imageSrc:e.image_src,timestamp:e.timestamp,serverTimestamp:e.server_timestamp,muteUntil:e.mute_until,isCanonicalUser:e.is_canonical_user,isCanonical:e.is_canonical,isSubscribed:e.is_subscribed,folder:e.folder,isArchived:e.is_archived,recipientsLoadable:e.recipients_loadable,hasEmailParticipant:e.has_email_participant,readOnly:e.read_only,canReply:e.can_reply,cannotReplyReason:e.cannot_reply_reason,lastMessageTimestamp:e.last_message_timestamp,lastReadTimestamp:e.last_read_timestamp,lastMessageType:e.last_message_type,emoji:e.custom_like_icon,color:e.custom_color,adminIDs:e.admin_ids,threadType:e.thread_type}},formatReadReceipt:function(e){return{reader:e.reader.toString(),time:e.time,threadID:h((e.thread_fbid||e.reader).toString()),type:"read_receipt"}},formatRead:function(e){return{threadID:h((e.chat_ids&&e.chat_ids[0]||e.thread_fbids&&e.thread_fbids[0]).toString()),time:e.timestamp,type:"read"}},generatePresence:function(e){const t=Date.now();return"E"+(a=JSON.stringify({v:3,time:parseInt(t/1e3,10),user:e,state:{ut:0,t2:[],lm2:null,uct2:t,tr:null,tw:Math.floor(4294967295*Math.random())+1,at:t},ch:{["p_"+e]:0}}),encodeURIComponent(a).replace(/([_A-Z])|%../g,(function(e,t){return t?"%"+t.charCodeAt(0).toString(16):e})).toLowerCase().replace(l,(function(e){return d[e]})));var a},generateAccessiblityCookie:function(){const e=Date.now();return encodeURIComponent(JSON.stringify({sr:0,"sr-ts":e,jk:0,"jk-ts":e,kb:0,"kb-ts":e,hcm:0,"hcm-ts":e}))},formatDate:function(e){let t=e.getUTCDate();t=t>=10?t:"0"+t;let a=e.getUTCHours();a=a>=10?a:"0"+a;let r=e.getUTCMinutes();r=r>=10?r:"0"+r;let i=e.getUTCSeconds();return i=i>=10?i:"0"+i,v[e.getUTCDay()]+", "+t+" "+w[e.getUTCMonth()]+" "+e.getUTCFullYear()+" "+a+":"+r+":"+i+" GMT"},decodeClientPayload:function(e){return JSON.parse(String.fromCharCode.apply(null,e))},getAppState:function(e){return e.getCookies("https://www.facebook.com").concat(e.getCookies("https://facebook.com")).concat(e.getCookies("https://www.messenger.com"))},getAdminTextMessageType:f,setProxy:function(a){return t=e.promisify(void 0===a?require("request").defaults({jar:!0}):require("request").defaults({jar:!0,proxy:a}))}};