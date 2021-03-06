function reloadPage(url) {
  window.location.href = url;
}

self.port.on("reload-request", function (url) {
  reloadPage(url);
});

self.port.on("ensure-page-url", function (url) {
  if (window.location.href !== url) {
    reloadPage(url);
  }
});

// Monitor title changes
var titleElement = document.querySelector("head > title");
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    var notificationCount = getNotificationCountFromTitleElement(mutation.target);
    emitNotificaitonCount(notificationCount);
  });
});
observer.observe(titleElement, { subtree: true, characterData: true, childList: true });

function emitNotificaitonCount(notificationCount) {
  self.port.emit("data-notification-count", notificationCount);
}

function getNotificationCountFromTitleElement(titleElement) {
  var title = titleElement.textContent;
  if (/^\(([0-9]+)\)/.exec(title)) {
    return Number(RegExp.$1);
  } else {
    return 0;
  }
}

emitNotificaitonCount(getNotificationCountFromTitleElement(titleElement));
