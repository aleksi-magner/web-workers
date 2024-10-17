import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h2>Web Workers. Базовый пример</h2>
  
  <h4>Получить результат умножения двух чисел</h4>
  
  <form>
    <div class="form-control__wrap">
      <label class="form-control__label" for="number1">Первое число</label>
      
      <input
        id="number1"
        class="form-control"
        type="number"
        placeholder="Введите число"
        autocomplete="off"
        autocapitalize="none"
        inputmode="tel"
        tabindex="0"
        min="0"
        value="0"
      />
    </div>
    
    <div class="form-control__wrap">
      <label class="form-control__label" for="number2">Второе число</label>
      
      <input
        id="number2"
        class="form-control"
        type="number"
        placeholder="Введите число"
        autocomplete="off"
        autocapitalize="none"
        inputmode="tel"
        tabindex="0"
        min="0"
        value="0"
      />
    </div>
  </form>

  <p class="result"></p>
`;

const first = <HTMLInputElement>document.querySelector('#number1');
const second = <HTMLInputElement>document.querySelector('#number2');

const result = <HTMLParagraphElement>document.querySelector('.result');

if ('Worker' in window) {
  const worker = new Worker('worker.js');

  [first, second].forEach((input: HTMLElement): void => {
    input.onchange = function() {
      worker.postMessage([first.value, second.value]);

      console.log('[Script] Сообщение отправлено в Worker');
    };
  });

  worker.addEventListener('message', (event: MessageEvent): void => {
    if (typeof event.data === 'number') {
      result.textContent = event.data > 0 ? `${first.value} x ${second.value} = ${event.data}` : '';

      console.log('[Script] Сообщение получено из Worker\'а');
    } else {
      result.textContent = event.data;
    }
  });
} else {
  console.log('Этот браузер не поддерживает Web Workers');
}