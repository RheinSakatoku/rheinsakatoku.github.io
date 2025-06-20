(function(){
  let copyHandler = null;

  window.initEmailCopy = function(){
    const emailButton = document.getElementById("copy-email");
    if (!emailButton) return;

    copyHandler = function(e) {
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
    };

    emailButton.addEventListener("click", copyHandler);
  };

  window.destroyEmailCopy = function() {
    const emailButton = document.getElementById("copy-email");
    if (!emailButton || !copyHandler) return;
    emailButton.removeEventListener("click", copyHandler);
    copyHandler = null;
  };
})();
