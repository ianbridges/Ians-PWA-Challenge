const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible';
  
    butInstall.addEventListener('click', () => {
      event.prompt();
      butInstall.setAttribute('disabled', true);
      butInstall.textContent = 'Installed!';
    });
});

butInstall.addEventListener('click', async (event) => {
    event.preventDefault();
        if (typeof CodeMirror === 'undefined') {
            throw new Error('CodeMirror not loaded');
          }
          console.log(CodeMirror);
});

window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'appinstalled', event);
});