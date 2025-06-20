window.addEventListener('DOMContentLoaded', () => {
  let buttonShineLoaded = false;
  let copyEmailLoaded = false;
  let unloadShineTimer = null;
  let unloadCopyTimer = null;

  const projectBtn = document.getElementById("project-button");
  const dropdown = document.getElementById("dropdown");
  const emailButton = document.getElementById("copy-email");

  // Тоггл дропдауна
  projectBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  // Обработка кнопок для ButtonShine
  document.querySelectorAll('.justabutton').forEach(btn => {
    // Наведение — подгружаем shine, если надо
    btn.addEventListener('mouseenter', () => {
      if (!buttonShineLoaded) {
        const script = document.createElement('script');
        script.src = 'button-shine.js';
        script.onload = () => {
          if (window.ButtonShine) ButtonShine.init();
        };
        document.body.appendChild(script);
        buttonShineLoaded = true;
      }
      if (unloadShineTimer) {
        clearTimeout(unloadShineTimer);
        unloadShineTimer = null;
      }
    });

    btn.addEventListener('mouseleave', () => {
      unloadShineTimer = setTimeout(() => {
        if (window.ButtonShine) {
          ButtonShine.destroy();
          const script = document.querySelector('script[src*="button-shine.js"]');
          if (script) script.remove();
          delete window.ButtonShine;
          buttonShineLoaded = false;
        }
      }, 5000);
    });
  });

  // Наведение на кнопку Email — подгружаем скрипт копирования и инициализируем
  emailButton.addEventListener('mouseenter', () => {
    if (!copyEmailLoaded) {
      const script = document.createElement('script');
      script.src = 'copy-email.js';
      script.onload = () => {
        if(window.initEmailCopy) window.initEmailCopy();
      };
      document.body.appendChild(script);
      copyEmailLoaded = true;
    }
    if (unloadCopyTimer) {
      clearTimeout(unloadCopyTimer);
      unloadCopyTimer = null;
    }
  });

  // Уход мыши с email — через 5 секунд выгружаем копирование
  emailButton.addEventListener('mouseleave', () => {
    unloadCopyTimer = setTimeout(() => {
      if(window.destroyEmailCopy) window.destroyEmailCopy();
      const script = document.querySelector('script[src*="copy-email.js"]');
      if (script) script.remove();
      delete window.initEmailCopy;
      delete window.destroyEmailCopy;
      copyEmailLoaded = false;
    }, 5000);
  });
});
