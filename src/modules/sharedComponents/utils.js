export default {
  isEmpty(values) {
    let props = [];
    if (Array.isArray(values)) {
      props = values;
    } else {
      const keys = Object.keys(values);
      props = [];
      keys.forEach((key) => {
        props.push(values[key]);
      });
    }
    return props.some(val => (val == null || val === ''));
  },

  prueba(num) {
    return num2 => num + num2;
  },

  fromCurrency(num) {
    const realNum = num.replace('RD$ ', '');
    return Number(realNum);
  },

  // al credits to the author
  CurrencyFormat(number) {
    const decimalplaces = 2;
    const decimalcharacter = '.';
    const thousandseparater = ',';
    number = parseFloat(number);
    const sign = number < 0 ? '-' : '';
    let formatted = String(number.toFixed(decimalplaces));
    if (decimalcharacter.length && decimalcharacter !== '.') { formatted = formatted.replace(/\./, decimalcharacter); }
    let integer = '';
    let fraction = '';
    const strnumber = String(formatted);
    const dotpos = decimalcharacter.length ? strnumber.indexOf(decimalcharacter) : -1;
    if (dotpos > -1) {
      if (dotpos) { integer = strnumber.substr(0, dotpos); }
      fraction = strnumber.substr(dotpos + 1);
    } else { integer = strnumber; }
    if (integer) { integer = String(Math.abs(integer)); }
    while (fraction.length < decimalplaces) { fraction += '0'; }
    const temparray = [];
    while (integer.length > 3) {
      temparray.unshift(integer.substr(-3));
      integer = integer.substr(0, integer.length - 3);
    }
    temparray.unshift(integer);
    integer = temparray.join(thousandseparater);
    return sign + integer + decimalcharacter + fraction;
  },

  // values: array
  sum(values) {
    let numbers = [];

    if (Array.isArray(values)) {
      numbers = values;
    } else {
      console.log(values);
      const keys = Object.keys(values);
      numbers = [];
      keys.forEach((key) => {
        numbers.push(values[key]);
      });
    }

    for (let i = 0; i < values.length; i += 1) {
      sumResult += parseFloat(values[i]);
    }
    return numbers.reduce((sum, number) => sum += number, 0);
  },

  now() {
    return new Date().toLocaleDateString();
  },

  dateSpanishFormat() {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = new Date();

    const day = date.getDate();
    const monthYear = `De ${months[date.getMonth()]} de ${date.getFullYear()}`;
    const dayWeek = days[date.getDay()];

    return {
      day,
      monthYear,
      dayWeek
    };
  },

  spyLeftNavigation() {
    $('body').scroll(() => {
      const position = $('body').scrollTop();
      const movableNav = $('.aside-nav-container, .aside-wide-left');
      if (position >= 50) {
        if (!movableNav.hasClass('moved')) { movableNav.addClass('moved'); }
      } else {
        movableNav.removeClass('moved');
      }
    });
  },

  heavyLoad(stop) {
    function removeLoader() {
      const loader = $('.heavy-loader');
      loader.remove();
      $('body').css({ overflow: 'auto' });
    }

    if (!stop) {
      const html = `
        <div class="heavy-loader active">
          <div class="circle-load"></div>
          <div class="message">Preparando los datos</div>
        </div>`;

      $('body').append(html);
      $('body').css({ overflow: 'hidden' });
      const message = $('.heavy-loader .message');

      setTimeout(() => {
        message.text('Configurando...');
      }, 4000);
      setTimeout(() => {
        message.text('Casi Terminamos ...');
      }, 8000);
      setTimeout(() => {
        message.text('Terminando el proceso ...');
        removeLoader();
      }, 15000);
    } else {
      removeLoader();
    }
  },

  lineLoad(stop) {
    if (!stop) {
      $('.loader').css({
        display: 'block'
      });
    } else {
      $('.loader').css({ display: 'none' });
    }
  }
};
