
const REQUEST_PAYLOAD = {action: 'start_dialog'};


// entry point
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action == 'start_dialog') {
    openTarget();
  }
});
