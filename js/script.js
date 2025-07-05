/**
 * @file
 * Глобальные скрипты темы Ghostweb, написанные с использованием Drupal Behaviors.
 */
(function (Drupal, once) {

  /**
   * Поведение для кнопки "Наверх".
   */
  Drupal.behaviors.ghostwebBackToTop = {
    attach: function (context, settings) {
      // Ищем body только один раз
      once('back-to-top-init', 'body', context).forEach(function (body) {
        // Проверяем, существует ли кнопка, перед созданием новой
        if (body.querySelector('.back-to-top')) {
          return;
        }

        const backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        body.appendChild(backToTop);

        window.addEventListener('scroll', function () {
          const scrollPosition = window.scrollY || document.documentElement.scrollTop;
          if (scrollPosition > window.innerHeight * 0.5) {
            backToTop.classList.add('visible');
          } else {
            backToTop.classList.remove('visible');
          }
        });

        backToTop.addEventListener('click', function () {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      });
    }
  };

  /**
   * Поведение для сворачиваемого блока-меню.
   */
  Drupal.behaviors.ghostwebCollapsibleMenu = {
    attach: function (context, settings) {
      // Ищем наш блок и выполняем код только один раз для него
      once('collapsible-menu', '#menumenumenu', context).forEach(function (region) {
        // Проверка на существование элементов внутри
        const header = region.querySelector('h2');
        const arrow = header ? header.querySelector('.toggle-arrow') : null;
        const menu = region.querySelector('.menu-banner');

        if (!header || !arrow || !menu) {
          return; // Если чего-то нет, ничего не делаем
        }
        
        menu.style.transition = 'height 0.3s ease, padding 0.3s ease';
        menu.style.overflow = 'hidden';
        header.style.userSelect = 'none';

        header.addEventListener('click', () => {
          if (menu.classList.contains('is-collapsed')) {
            menu.style.height = menu.scrollHeight + 'px';
            arrow.style.transform = 'rotate(0deg)';
            menu.classList.remove('is-collapsed');
          } else {
            menu.style.height = '0';
            arrow.style.transform = 'rotate(-90deg)';
            menu.classList.add('is-collapsed');
          }
        });

        // Изначально меню раскрыто
        menu.style.height = menu.scrollHeight + 'px';
      });
    }
  };

  /**
   * Поведение для фикса виджета Госуслуг.
   */
  Drupal.behaviors.ghostwebGosuslugiFix = {
    attach: function (context, settings) {
      once('gosuslugi-height-fix', '#posWidget', context).forEach(function (widgetElement) {
        setTimeout(function() {
          if (document.body.contains(widgetElement)) {
            window.dispatchEvent(new Event('resize'));
          }
        }, 600);
      });
    }
  };


/**
 * Поведение для раскрываемого блока "Версия для слабовидящих".
 */
Drupal.behaviors.ghostwebAccessibilityToggle = {
  attach: function (context, settings) {
    // Ищем блок по его существующему классу
    once('accessibility-toggle', '.blind-version-block', context).forEach(function (block) {
      // Добавляем класс "is-expanded" при наведении мыши
      block.addEventListener('mouseenter', function () {
        block.classList.add('is-expanded');
      });

      // Убираем класс "is-expanded", когда мышь уходит
      block.addEventListener('mouseleave', function () {
        block.classList.remove('is-expanded');
      });
    });
  }
};

})(Drupal, once); // Убедитесь, что эта строка в вашем файле только одна, в самом конце