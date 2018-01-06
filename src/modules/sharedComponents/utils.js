
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

  getDataForm(object) {
    return `data=${JSON.stringify(object)}`;
  },

  startInputMask(InputMask) {
    const TelSelector = document.querySelectorAll('[type="tel"]');
    const dniSelector = document.querySelectorAll('[role="cedula"], [id*="dni"]');
    InputMask({ mask: '(999) 999-9999', greede: false }).mask(TelSelector);
    InputMask({ mask: '**[*]-*******-[*][*{1,20}]', greede: false }).mask(dniSelector);
  },

  // values: array
  sum(values) {
    let numbers = [];

    if (Array.isArray(values)) {
      numbers = values;
    } else {
      const keys = Object.keys(values);
      numbers = [];
      keys.forEach((key) => {
        numbers.push(values[key]);
      });
    }

    return numbers.reduce((sum, number) => sum += parseFloat(number), 0);
  },

  now() {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  },

  dateSpanishFormat() {
    const { days, months } = this.dates;
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

  dates: {
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
  }

};
