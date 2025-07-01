// Используем обертку, чтобы безопасно использовать $ вместо jQuery
(function ($, Drupal) {
  'use strict';

  // Создаем новое "поведение"
  Drupal.behaviors.initSpecialButton = {
    attach: function (context, settings) {
      // Ищем кнопку #specialButton только внутри нового контента (context)
      // .once() гарантирует,  что код выполнится для каждого элемента только один раз
      $('#specialButton', context).once('special-button-processed').on('click', function (e) {
        // Предотвращаем переход по ссылке, если это тег <a>
        e.preventDefault(); 
        
        // Теперь мы уверены, что special.On существует, и вызываем его
        special.On();
      });
    }
  };

})(jQuery, Drupal);