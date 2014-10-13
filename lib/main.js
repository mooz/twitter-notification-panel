var { ToggleButton } = require("sdk/ui/button/toggle");
var { Panel } = require("sdk/panel");
var self = require("sdk/self");

var iconNeutral = {
  "16": "./icon-16.png",
  "32": "./icon-32.png",
  "64": "./icon-64.png"
};

var iconNotify = {
  "16": "./icon-notify-16.png",
  "32": "./icon-notify-32.png",
  "64": "./icon-notify-64.png"
};

var notificationButton = ToggleButton({
  id: "notifications-button",
  label: "Notifications",
  icon: iconNeutral,
  onChange: handleButtonStateChange
});

var notificationPanel = Panel({
  contentURL        : "https://twitter.com/i/notifications",
  height            : 500,
  width             : 400,
  contentStyleFile  : self.data.url("panel.css"),
  contentScriptFile : self.data.url("panel.js"),
  onHide            : handleNotificationPanelHide
});

function handleButtonStateChange(state) {
  if (state.checked) {
    notificationPanel.show({
      position: notificationButton
    });
  }
}

function handleNotificationPanelHide() {
  notificationButton.state("window", { checked: false });
}

notificationPanel.port.on("data-notification-count", function (notificationCount) {
  notificationButton.state("window", {
    label: (notificationCount > 0 ? notificationCount : "No") + " notifications",
    icon: notificationCount > 0 ? iconNotify : iconNeutral
  });
  console.log("Updated. NotificationCount " + notificationCount);
});
