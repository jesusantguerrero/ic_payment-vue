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
  }
};
