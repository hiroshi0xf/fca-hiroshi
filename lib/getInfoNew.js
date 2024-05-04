var utils = require('./../utils');
var OTP = require('totp-generator');

module.exports.getInfo = async function (id, jar, ctx, defaultFuncs) {
  try {
  var AccessToken = await require("./getToken").getAccessToken(jar, ctx, defaultFuncs);
  var { body:Data } = await utils.get(`https://graph.facebook.com/${id}?fields=name,first_name,email,about,birthday,gender,website,hometown,link,location,quotes,relationship_status,significant_other,username,subscribers.limite(0)&access_token=${AccessToken}`, jar, null, ctx.globalOptions);
  var Format = {
    id: JSON.parse(Data).id || "Not Found",
    name: JSON.parse(Data).name || "Not Found",
    first_name: JSON.parse(Data).first_name || "Not Found",
    username: JSON.parse(Data).username || "Not Found",
    link: JSON.parse(Data).link || "Not Found",
    verified: JSON.parse(Data).verified || "Not Found",
    about: JSON.parse(Data).about || "Not Found",
    avatar: `https://graph.facebook.com/${id}/picture?height=1500&width=1500&access_token=1449557605494892|aaf0a865c8bafc314ced5b7f18f3caa6` || "Not Found",
    birthday: JSON.parse(Data).birthday || "Not Found",
    follow: JSON.parse(Data).subscribers.summary.total_count || "Not Found",
    gender: JSON.parse(Data).gender || "Not Found",
    hometown: JSON.parse(Data).hometown || "Not Found",
    email: JSON.parse(Data).email || "Not Found",
    interested_in: JSON.parse(Data).interested_in || "Not Found",
    location: JSON.parse(Data).location || "Not Found",
    locale: JSON.parse(Data).locale || "Not Found",
    relationship_status: JSON.parse(Data).relationship_status || "Not Found",
    love: JSON.parse(Data).significant_other || "Not Found",
    website: JSON.parse(Data).website || "Not Found",
    quotes: JSON.parse(Data).quotes || "Not Found",
    timezone: JSON.parse(Data).timezone || "Not Found",
    updated_time: JSON.parse(Data).updated_time || "Not Found"
  };
  return Format;
  } catch {}
}
//HORIZON