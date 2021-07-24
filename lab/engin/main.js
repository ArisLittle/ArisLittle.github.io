async function initDemo() {
  const runBtn = document.getElementById('run')
  const htmlInput = document.getElementById('code-html')
  const cssInput = document.getElementById('code-css')
  const jsInput = document.getElementById('code-js')
  const targetFrame = document.getElementById('demo')
  const targetDocument = targetFrame.contentDocument;
  
  runBtn.onclick = function() {
    loadToFrame({
      html: htmlInput.value,
      css: cssInput.value,
      js: jsInput.value
    });
  }
  
  function loadToFrame({html,css,js}) {
    resetFrameContent();
    loadHtmlToFrame(html)
    loadCssToFrame(css)
    loadJsToFrame(js)
  }
  
  function resetFrameContent() {
    targetDocument.head.innerHTML = '';
    targetDocument.body.innerHTML = '';
  }
  
  function loadHtmlToFrame(code) {
    targetDocument.body.innerHTML = code;
  }

  function loadCssToFrame(code) {
    const styleElement = document.createElement('style')
    styleElement.innerHTML = code;
    targetDocument.head.append(styleElement);
  }
  
  function loadJsToFrame(code) {
    const scriptElement = document.createElement('script')
    scriptElement.innerHTML = code;
    targetDocument.head.append(scriptElement);
  }

  const demoId = window.location.search.substring(2);
  if (demoId) {
    const { html, css, js } = await requestResourceById(demoId);
    if (html) {
      loadHtmlToFrame(html)
    }
    if (css) {
      loadCssToFrame(css)
    }
    if (js) {
      loadJsToFrame(js)
    }
  }

  async function requestResourceById(demoId) {
    const htmlRequest = createRequest(getUrlByDemoId(demoId, 'html'))
    const cssRequest = createRequest(getUrlByDemoId(demoId, 'css'))
    const jsRequest = createRequest(getUrlByDemoId(demoId, 'js'))
    return Promise.all([
        htmlRequest,
        cssRequest,
        jsRequest
      ])
      .then(res => {
        console.log(res)
        return res;
      })
      .catch(err => {
        console.log(err)
      })
  }

  async function createRequest(url) {
    
  }

  function getUrlByDemoId(demoId, type) {
    return `./${demoId}.${type}`;
  }
}

initDemo();
