window.addEventListener('DOMContentLoaded', () => {
  // Инициализируем сияние кнопок
  ButtonShine.init();

  // Выпадающее меню
  const projectBtn = document.getElementById("project-button");
  const dropdown = document.getElementById("dropdown");
  
  projectBtn.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
  });
});

document.addEventListener('DOMContentLoaded', () => {
  ButtonShine.init();

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
});



