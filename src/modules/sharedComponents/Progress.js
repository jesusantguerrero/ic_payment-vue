export default class Progress {
  constructor(type, text = 'Cargando ...') {
    this.type = type;
    this.content = `
    <div class="heavy-loader active">
      <div class="circle-load"></div>
      <div class="message"> ${text}</div>
    </div>`;
    this.$heavy = null;
    this.$body = $('body');
    this.$line = $('.loader');
  }

  play() {
    this.stop();
    if (this.type === 'heavy') {
      $('body').append(this.content);
      this.$heavy = $('.heavy-loader');
      $('body').css({ overflow: 'hidden' });
    } else {
      $('.loader').css({
        display: 'block'
      });
    }
  }

  stop() {
    if (this.type === 'heavy' && this.$heavy) {
      this.$heavy.remove();
      $('body').css({ overflow: 'auto' });
    } else {
      $('.loader').css({ display: 'none' });
    }
  }
}
