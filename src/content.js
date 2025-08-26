(async () => {

  window.onload = () => {
    if (location.host === 'sixth.dk') {
      init();
    }
  };

  function executeExternalScript() {
    chrome.runtime.sendMessage({ action: "executeCode" });
  }

  function executeExternalPost() {
    chrome.runtime.sendMessage({ action: "executePost" });
  }

  window.onload = () => {
    if (location.host === 'sixth.dk') {
      executeExternalScript();
      executeExternalPost();
    }
  };
  
  

  async function init() {
    chrome.storage.sync.get("selectedFooBar", ({ selectedFooBar }) => {

      // alert(`Chrome Plugin works, selected fooBar is ${selectedFooBar.foo}.`);

    });

    //   const response = await fetch('https://raw.githubusercontent.com/tennisfar/ChromePluginJavascriptExecution/refs/heads/master/src/script.js');
    //   const jsCode = await response.text();
    //
    //   // Send code to background script for execution
    //   chrome.runtime.sendMessage({ action: "executeCode", code: jsCode });
    //
    //   // Inject and execute the code in the current tab
    //   // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   //   chrome.scripting.executeScript({
    //   //     target: { tabId: tabs[0].id },
    //   //     function: (code) => {
    //   //       // Use Function constructor to execute fetched code
    //   //       (new Function(code))();
    //   //     },
    //   //     args: [jsCode]
    //   //   });
    //   // });
  }

})();

