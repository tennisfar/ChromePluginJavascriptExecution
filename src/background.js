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


// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "executePost") {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(apiData => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (data) => {
              // Use the API data in the page context
              console.log('POST: ', data);
              // You can call functions or update the DOM here
            },
            args: [apiData]
          });
        });
      });
  }

  if (message.action === "executeCode") {
    // fetch('https://raw.githubusercontent.com/tennisfar/ChromePluginJavascriptExecution/refs/heads/master/src/script.js')
    //   .then(response => response.text())
    //   .then(jsCode => {
    //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //       chrome.scripting.executeScript({
    //         target: { tabId: tabs[0].id },
    //         func: (code) => { (new Function(code))(); },
    //         args: [jsCode]
    //       });
    //     });
    //   });


    fetch('https://jsonplaceholder.typicode.com/todos/1')
    // fetch('https://raw.githubusercontent.com/tennisfar/ChromePluginJavascriptExecution/refs/heads/master/src/script.js')
      .then(response => response.json())
      .then(apiData => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: (data) => {
              // Use the API data in the page context
              console.log('GET: ', data);
              // You can call functions or update the DOM here
            },
            args: [apiData]
          });
        });
      });
  }
});


// background.js (Manifest V3)
// chrome.action.onClicked.addListener(async (tab) => {
// Fetch JS code from your API
// async function init() {
//   const response = await fetch('https://raw.githubusercontent.com/tennisfar/ChromePluginJavascriptExecution/refs/heads/master/src/script.js');
//   const jsCode = await response.text();
//
// // Inject and execute the code in the current tab
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: (code) => {
//       // Use Function constructor to execute fetched code
//       (new Function(code))();
//     },
//     args: [jsCode]
//   });
// }
//
// await init();

// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "executeCode") {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         func: (code) => { (new Function(code))(); },
//         args: [message.code]
//       });
//     });
//   }
// });