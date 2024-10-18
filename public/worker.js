// Fetch/HXR запросы всё равно видны во вкладке Сеть
self.addEventListener('message', event => {
  console.log('[Worker] Сообщение получено из основного скрипта');

  const [first, second] = event.data;

  const result = first * second;

  if (isNaN(result)) {
    self.postMessage('Пожалуйста, укажите два числа');
  } else {
    console.log('[Worker] Отправка сообщения в основной скрипт');

    self.postMessage(result);
  }
});
