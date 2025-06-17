(function() {
  // Проверяем, не инициализирована ли анимация
  if (window.buttonShineInitialized) return;
  window.buttonShineInitialized = true;
  
  // Храним обработчики для кнопок
  const buttonHandlers = new WeakMap();
  
  function handleMouseEnter(e) {
    const button = e.currentTarget;
    
    // Сбрасываем предыдущую анимацию
    button.classList.remove('shine-effect', 'animating');
    void button.offsetWidth; // Trigger reflow
    
    // Запускаем новую анимацию
    button.classList.add('shine-effect', 'animating');
    
    // Удаляем классы после анимации
    setTimeout(() => {
      button.classList.remove('shine-effect', 'animating');
    }, 900);
  }
  
  // Публичный API
  window.ButtonShine = {
    init: function() {
      const buttons = document.querySelectorAll('.justabutton');
      
      buttons.forEach(button => {
        if (!buttonHandlers.has(button)) {
          const handler = handleMouseEnter.bind(this);
          button.addEventListener('mouseenter', handler);
          buttonHandlers.set(button, handler);
        }
      });
    },
    
    destroy: function() {
      const buttons = document.querySelectorAll('.justabutton');
      
      buttons.forEach(button => {
        if (buttonHandlers.has(button)) {
          const handler = buttonHandlers.get(button);
          button.removeEventListener('mouseenter', handler);
          buttonHandlers.delete(button);
          button.classList.remove('shine-effect', 'animating');
        }
      });
      
      window.buttonShineInitialized = false;
    }
  };
})();
