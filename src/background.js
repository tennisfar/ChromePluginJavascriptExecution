const fooBars = [
  {
    foo: 'bar1',
    bar: 'baz1',
  },
  {
    foo: 'bar2',
    bar: 'baz2',
  },
];

let selectedFooBar = fooBars[0];

chrome.runtime.onInstalled.addListener(reason => {

  // initial setup for when the plugin is added to Chrome.
  // if (reason === chrome.runtime.OnInstalledReason.INSTALL || reason === chrome.runtime.OnInstalledReason.UPDATE) {
  chrome.storage.sync.set({ fooBars });
  chrome.storage.sync.set({ selectedFooBar });
  // }

});

// background.js (Manifest V3)
// chrome.action.onClicked.addListener(async (tab) => {
// Fetch JS code from your API
// const response = await fetch('https://raw.githubusercontent.com/tennisfar/ChromePluginJavascriptExecution/refs/heads/master/src/script.js?token=GHSAT0AAAAAADCAFXIYQ4PZB2KLNUXCP7JI2FNWLGA');
// const jsCode = await response.text();
//
// // Inject and execute the code in the current tab
// chrome.scripting.executeScript({
//   target: { tabId: tab.id },
//   func: (code) => {
//     // Use Function constructor to execute fetched code
//     (new Function(code))();
//   },
//   args: [jsCode]
// });
//});