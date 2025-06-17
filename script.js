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


