document.addEventListener('DOMContentLoaded', function() {
  // Create button element
  const backToTop = document.createElement('div');
  backToTop.className = 'back-to-top';
  document.body.appendChild(backToTop);
  
  // Show/hide based on scroll
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const firstScreenHeight = window.innerHeight;
    
    if (scrollPosition > firstScreenHeight * 0.5) { // Adjust multiplier as needed
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Smooth scroll to top
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});



// сворачивание и разворачивание блока
document.addEventListener('DOMContentLoaded', function() {
  const region = document.getElementById('menumenumenu');
  const header = region.querySelector('h2');
  const arrow = header.querySelector('.toggle-arrow');
  const menu = region.querySelector('.menu-banner');

  // Изначально меню открыто
  menu.style.transition = 'height 0.3s ease, padding 0.3s ease';
  menu.style.overflow = 'hidden';

  header.style.userSelect = 'none'; // чтобы не выделялся текст при клике

  header.addEventListener('click', () => {
    if (menu.style.height && menu.style.height !== '0px') {
      // Сворачиваем
      menu.style.height = '0';
      menu.style.paddingTop = '0';
      menu.style.paddingBottom = '0';
      arrow.style.transform = 'rotate(-90deg)';
    } else {
      // Разворачиваем - высота auto не анимируется, поэтому вычисляем scrollHeight
      menu.style.height = menu.scrollHeight + 'px';
      menu.style.paddingTop = '';
      menu.style.paddingBottom = '';
      arrow.style.transform = 'rotate(0deg)';
    }
  });

  // Устанавливаем высоту сразу, чтобы она была изначально раскрыта и корректно анимировалась
  menu.style.height = menu.scrollHeight + 'px';
});





// госулсуги фикс

// В вашем файле script.js темы, подключенном через *.libraries.yml
(function (Drupal) {
  Drupal.behaviors.myThemeFixGosuslugiHeight = {
    attach: function (context, settings) {
      // Используем Drupal.once для выполнения только один раз для каждого элемента #posWidget
      Drupal.once('gosuslugi-height-fix', '#posWidget', context).forEach(function (widgetElement) {
        // Небольшая задержка, чтобы дать другим скриптам и стилям полностью отработать.
        // Возможно, придется поэкспериментировать со временем задержки.
        // Или использовать requestAnimationFrame для большей точности перед следующим кадром.
        setTimeout(function() {
          if (document.body.contains(widgetElement)) { // Убедимся, что элемент еще на странице
            window.dispatchEvent(new Event('resize'));
          }
        }, 600); // Например, 200 миллисекунд
      });
    }
  };
})(Drupal);