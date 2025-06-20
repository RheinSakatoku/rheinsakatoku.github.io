// copy-email.js
(function(){
  window.initEmailCopy = function(){
    const emailButton = document.getElementById("copy-email");
    if (!emailButton) return;

    function copyHandler(e) {
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
    }

    emailButton.addEventListener("click", copyHandler);
  };
})();
