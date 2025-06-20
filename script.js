window.addEventListener('DOMContentLoaded', () => {
  let buttonShineLoaded = false;
  let copyEmailLoaded = false;

  let shineScriptTag = null;
  let copyScriptTag = null;

  let unloadShineTimer = null;
  let unloadCopyTimer = null;

  const projectBtn = document.getElementById("project-button");
  const dropdown = document.getElementById("dropdown");
  const emailButton = document.getElementById("copy-email");

  // Универсальная функция загрузки скрипта с коллбэками
  function loadScript(src, onLoad, onError) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        if (onLoad) onLoad();
        resolve(script);
      };
      script.onerror = () => {
        if (onError) onError();
        reject(new Error(`Failed to load script ${src}`));
      };
      document.body.appendChild(script);
    });
  }

  // Функция выгрузки скрипта и удаления глобальных переменных
  function unloadScript(scriptTag, globalsToDelete = []) {
    if (!scriptTag) return;
    scriptTag.remove();
    globalsToDelete.forEach(name => {
      delete window[name];
    });
  }

  // Обработчик для shine
  function onButtonMouseEnter() {
    if (!buttonShineLoaded) {
      loadScript('button-shine.js', () => {
        if (window.ButtonShine) window.ButtonShine.init();
      }).then(script => {
        shineScriptTag = script;
        buttonShineLoaded = true;
      }).catch(console.error);
    }
    if (unloadShineTimer) {
      clearTimeout(unloadShineTimer);
      unloadShineTimer = null;
    }
  }

  function onButtonMouseLeave() {
    unloadShineTimer = setTimeout(() => {
      if (window.ButtonShine) {
        window.ButtonShine.destroy();
      }
      unloadScript(shineScriptTag, ['ButtonShine']);
      shineScriptTag = null;
      buttonShineLoaded = false;
    }, 5000);
  }

  // Обработчик для email copy
  function onEmailMouseEnter() {
    if (!copyEmailLoaded) {
      loadScript('copy-email.js', () => {
        if (window.initEmailCopy) window.initEmailCopy();
      }).then(script => {
        copyScriptTag = script;
        copyEmailLoaded = true;
      }).catch(console.error);
    }
    if (unloadCopyTimer) {
      clearTimeout(unloadCopyTimer);
      unloadCopyTimer = null;
    }
  }

  function onEmailMouseLeave() {
    unloadCopyTimer = setTimeout(() => {
      if (window.destroyEmailCopy) window.destroyEmailCopy();
      unloadScript(copyScriptTag, ['initEmailCopy', 'destroyEmailCopy']);
      copyScriptTag = null;
      copyEmailLoaded = false;
    }, 5000);
  }

  // Привязываем обработчики
  document.querySelectorAll('.justabutton').forEach(btn => {
    btn.addEventListener('mouseenter', onButtonMouseEnter);
    btn.addEventListener('mouseleave', onButtonMouseLeave);
  });

  emailButton.addEventListener('mouseenter', onEmailMouseEnter);
  emailButton.addEventListener('mouseleave', onEmailMouseLeave);

  // Дропдаун кнопка
  projectBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });
});
