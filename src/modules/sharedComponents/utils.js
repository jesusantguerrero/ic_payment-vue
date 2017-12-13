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

  prueba() {
    console.log('prueba');
  }
};
