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
   * Поведение для анимированной формы поиска.
   */
  Drupal.behaviors.ghostwebSearchToggle = {
    attach: function (context, settings) {
      once('search-toggle', '.header-search-form', context).forEach(function (searchBlock) {
        const searchButton = searchBlock.querySelector('.button');
        const searchInput = searchBlock.querySelector('.form-text');

        if (!searchButton || !searchInput) {
          return;
        }

        searchButton.addEventListener('click', function (event) {
          if (searchBlock.classList.contains('is-expanded')) {
            if (searchInput.value.trim() === '') {
              event.preventDefault();
              searchBlock.classList.remove('is-expanded');
            }
          } else {
            event.preventDefault();
            searchBlock.classList.add('is-expanded');
            searchInput.focus();
          }
        });

        document.addEventListener('click', function(event) {
          if (!searchBlock.contains(event.target)) {
            searchBlock.classList.remove('is-expanded');
          }
        });
      });
    }
  };

})(Drupal, once);