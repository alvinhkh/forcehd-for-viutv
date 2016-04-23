function getNewUrl(url) {
  var matches = [
    new RegExp("\/Stream\\(0[1235]\\)\/","g"),
    new RegExp("_Layer[1235]_vod\\.m3u8","g"),
    new RegExp("\/Layer[1235]\/","g"),
    new RegExp("\/stream[1235]\/stream","g"),
  ];
  var replaces = [
    "/Stream(04)/",
    "_Layer4_vod.m3u8",
    "/Layer4/",
    "/stream4/stream"
  ];
  for (index = 0; index < matches.length; ++index) { 
    if (replaces[index] != null && url.match(matches[index])) {
      return {
        redirectUrl: url.replace(matches[index], replaces[index])
      };
    }
  }
}

var requestFilter = {
  urls: [
    "*://*/session/*",
    "*://nowtv100-i.akamaihd.net/hls/live/*"
  ]
};

chrome.webRequest.onBeforeRequest.addListener(function (details) {
  return getNewUrl(details.url);
}, requestFilter, ["blocking"]);