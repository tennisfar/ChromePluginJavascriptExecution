(async () => {

  window.onload = () => {
    if (location.host === 'sixth.dk') {
      init();
    }
  };

  async function init() {
    chrome.storage.sync.get("selectedFooBar", ({ selectedFooBar }) => {

      // alert(`Chrome Plugin works, selected fooBar is ${selectedFooBar.foo}.`);

    });

    const response = await fetch('https://raw.githubusercontent.com/tennisfar/ChromePluginJavascriptExecution/refs/heads/master/src/script.js?token=GHSAT0AAAAAADCAFXIYQ4PZB2KLNUXCP7JI2FNWLGA');
    const jsCode = await response.text();

    // Inject and execute the code in the current tab
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (code) => {
        // Use Function constructor to execute fetched code
        (new Function(code))();
      },
      args: [jsCode]
    });
  }

})();