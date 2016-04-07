function getNewURL(url) {
    var layerId = 4; // 1-5
    var matches = [
        new RegExp("\/Stream\\(0[1-5^" + layerId + "]\\)\/","g"),
        new RegExp("_Layer[1-5^" + layerId + "]_vod\.m3u8","g"),
        new RegExp("\/Layer[1-5^" + layerId + "]\/","g")
    ];
    var replaces = [
        "/Stream(0" + layerId + ")/",
        "_Layer" + layerId + "_vod.m3u8",
        "/Layer" + layerId + "/"
    ];
    for (index = 0; index < matches.length; ++index) { 
        if (replaces[index] != null && url.match(matches[index])) {
            return url.replace(matches[index], replaces[index]);
        }
    }
}

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    return {
        redirectUrl: getNewURL(details.url)
    };
}, {
    urls: [
        "*://*/session/*"
    ],
    tabId: -1
}, ["blocking"]);
