var settings = {};

chrome.storage.sync.get({
  ignore_blank : false,
  tab_shift : 0,
}, function(items) {
  settings = items;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  var key;
  for (key in changes) {
    var storageChange = changes[key];
    settings[key] = storageChange.newValue;
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    var uri = new URI(info.url);

    if (settings["ignore_blank"]) {
      uri.setQuery({ "w" : "1" });
    } else {
      uri.removeQuery("w");
    }

    if (0 < settings["tab_shift"]) {
      uri.setQuery({ "ts" : settings["tab_shift"] });
    } else {
      uri.removeQuery("ts");
    }

    return {redirectUrl: uri.toString()};
  },
  // filters
  {
    urls: [
      "https://github.com/*"
    ],
    types: ["main_frame"]
  },
  // extraInfoSpec
  ["blocking"]
);
