<template lang="pug">
  .nav-container.mobile(:class="{expanded: menuExpanded}")
    nav.main-nav.animated.baunceInLeft
      li: router-link(to="/", @click.native="changeMenu").nav-button Inicio
      li: router-link(to="/clientes", @click.native="changeMenu").nav-button Clientes
      li: router-link(to="/servicios", @click.native="changeMenu").nav-button Servicios
      li: router-link(to="/contratos", @click.native="changeMenu").nav-button Contratos
      li: router-link(to="/extras", @click.native="changeMenu").nav-button Extras
      li: router-link(to="/secciones", @click.native="changeMenu").nav-button Secciones
      li: router-link(to="/reportes", @click.native="changeMenu").nav-button Reportes
</template>

<script>
  export default {
    name: 'HomeHeader',
    data() {
      return {
        menuExpanded: false,
      };
    },

    mounted() {
      const self = this;
      window.appBus.$on('toggle-menu', () => {
        self.changeMenu();
      });

      window.appBus.$on('hide-menu', () => {
        self.hideMenu();
      });
    },

    methods: {
      changeMenu() {
        this.expandMenu();
        if (!this.menuExpanded) {
          this.menuExpanded = true;
        } else {
          setTimeout(() => {
            this.menuExpanded = false;
          }, 600);
        }
      },

      expandMenu() {
        const icon = this.menuExpanded ? 'menu' : 'clear';
        if (this.menuExpanded) {
          this.hideMenu();
        } else {
          this.showMenu();
        }
        this.animateCss('.hamburger-menu', 'rotateIn', icon);
      },

      showMenu() {
        this.animateCss('.nav-container', 'bounceInLeft', 'clear');
      },

      hideMenu() {
        this.animateCss('.nav-container', 'bounceOutLeft', 'menu');
      },

      animateCss(element, transitionName, icon) {
        const theClass = `animated ${transitionName}`;
        $(element)
          .removeClass(theClass)
          .addClass(theClass)
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', (e) => {
            const $this = $(e.target);
            $this.removeClass(theClass);
            if (icon) $this.find('i').text(icon);
          });
      }
    }
  };
</script>


<style lang="sass" scoped>
  @import  './../assets/css/1-base/_colors.sass'
  @import  './../assets/css/1-base/_vars.sass'

  $dark-color: #000
  .nav-container.mobile,
  .hamburger-menu
    display: flex
    justify-self: flex-end
    overflow: hidden
    align-self: flex-end
    margin-left: auto
    align-items: center
    display: none

  .hamburger-menu
    display: none

  .main-nav
    display: table
    color: $primary-color
    list-style: none
    height: 100%
    li
      display: table-cell
      padding: 0 8px
  .nav-button
    color: lighten($dark-color, 10%)
    display: block
    padding:
      top: 5px
      bottom: 5px
    font:
      size: 16px
      weight: bolder
    text-decoration: none
    transition: all ease .5s
    position: relative
    &:after
      content: ''
      position: absolute
      height: 3px
      width: 0
      bottom: 3px
      left: 0
      background: $contrast-color
      border-radius: 3px
      transition: all ease .5s
    &:hover
      text-decoration: none
      color: $contrast-color
      &:after
        width: 100%

  @media (max-width: 960px)
    .nav-container.mobile
      display: none
      &.expanded
        display: block
        position: absolute
        width: 100%
        height: 100vh
        top: 70px
        right: 0
        z-index: 101
        background: white
        display: flex
        flex-direction: column
        align-content: center
        .main-nav
          display: block
          height: fit-content
          margin-top: 10%
          width: 100%
          li
            display: flex
            padding: 2% 20%
            text-align: center
            justify-content: center
        .nav-button
          font-size: 22px
    .hamburger-menu
      display: block
      font:
        size: 20px
        weight: 900
    .name
      font-size: 18px
    .statement
      font-size: 7px
</style>

