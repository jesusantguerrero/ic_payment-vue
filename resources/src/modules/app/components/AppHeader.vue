<template lang="pug">
  .header-container.hide-xs
    .top-header.row
    header.row
      .brand-name
        .logo-box
          h1.name IC Services
          small.statement La red que te conecta con los tuyos
      .nav-container(:class="{expanded: menuExpanded}")
        nav.main-nav
          li: a(href="#slide", @click="changeMenu").nav-button Inicio
          li: a(href="#beneficios", @click="changeMenu").nav-button Beneficios
          li: a(href="#servicios", @click="changeMenu").nav-button Servicios
          li: a(href="#noticias", @click="changeMenu").nav-button Noticias
          li: a(href="#contacto", @click="changeMenu").nav-button.special Contacto
      .hamburger-menu(@click="changeMenu"): i.material-icons menu
</template>

<script>
  export default {
    name: 'HomeHeader',
    data() {
      return {
        menuExpanded: false,
      };
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
        this.animateCss('.nav-container', 'bounceInRight');
      },

      hideMenu() {
        this.animateCss('.nav-container', 'bounceOutRight');
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
  @import  './../../../assets/css/1-base/_colors.sass'
  @import  './../../../assets/css/1-base/_vars.sass'

  $dark-color: #000

  .header-container
    position: fixed
    width: 100%
    z-index: 100
  .top-header
    height: 20px
    background: whitesmoke
    padding: 0 50px
    text-align: right
    border-bottom: 1px sold #ccc
    display: none
  .responsive-img
    height: 100%
    margin-right: 15px
  header.row
    width: 100%
    margin: 0
    padding: 15px 50px
    background: #fff
    height: 90px
    box-shadow: 1px 2px 2px transparentize(#000, .8)
    display: flex
    align-content: center
    position: relative
    &:after
      content: ''
      height: 7px
      background: $primary-color
      width: 10%
      position: absolute
      bottom: -7px
      right: 0
      box-shadow: 1px 2px 2px transparentze(#000, .8)

  .brand-name
    display: flex
    align-items: center
    height: 100%
    cursor: pointer
    .logo-box
      +makeFlex(100%, column, flex-start, center)
      .name
        margin-bottom: 0
        width: 100%
        color: $primary-color
      .statement
        color: $contrast-color
    a
      color: $primary-color
      text-decoration: none
      transition: all ease .5s
      &:hover
        color: $light-color

  .nav-container,
  .hamburger-menu
    display: flex
    justify-self: flex-end
    overflow: hidden
    align-self: flex-end
    margin-left: auto
    align-items: center

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

  .special
    background: $primary-color
    color: #fff
    width: 150px
    border-radius: 3px
    text-align: center
    position: relative
    &:after
      content: ''
      position: absolute
      height: 100%
      width: 0
      top: 0
      left: 0
      background: transparentize(#fff,.87)
      border-radius: 3px
      transition: all ease .2s
    &:hover
      color: #fff
      &:after
        width: 100%
  @media (max-width: 960px)
    .top-header
      display: none
    header.row
      justify-content: left
      height: 70px
      padding:
        left: 7%
        right: 7%
    .responsive-img
      margin-right: 7px
    .nav-container
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

