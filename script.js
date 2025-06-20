window.addEventListener('DOMContentLoaded', () => {
  let buttonShineLoaded = false;
  let unloadTimer = null;

  const projectBtn = document.getElementById("project-button");
  const dropdown = document.getElementById("dropdown");

  projectBtn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  // Копирование email в буфер обмена
  const emailButton = document.getElementById("copy-email");
  emailButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = emailButton.dataset.email;

    navigator.clipboard.writeText(email).then(() => {
      emailButton.textContent = "Скопировано!";
      setTimeout(() => {
        emailButton.textContent = "Email";
      }, 1500);
    }).catch(() => {
      alert("Не удалось скопировать email :(");
    });
  });

  // Наведение на любую кнопку
  document.querySelectorAll('.justabutton').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      // Если не загружено — подгружаем
      if (!buttonShineLoaded) {
        const script = document.createElement('script');
        script.src = 'button-shine.js';
        script.onload = () => {
          if (window.ButtonShine) {
            ButtonShine.init();
          }
        };
        document.body.appendChild(script);
        buttonShineLoaded = true;
      }

      // Если был таймер выгрузки — отменим
      if (unloadTimer) {
        clearTimeout(unloadTimer);
        unloadTimer = null;
      }
    });

    btn.addEventListener('mouseleave', () => {
      // Ставим таймер на выгрузку
      unloadTimer = setTimeout(() => {
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
});
