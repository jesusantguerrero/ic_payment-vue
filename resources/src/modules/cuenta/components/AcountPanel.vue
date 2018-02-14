<template lang="pug">
  .screen.clients.row
    .left-navigation.administrador.col-md-2.hidden-xs
      ul.aside-nav
        li.aside-buttons
          a(href="#acount-section") <i class="material-icons">description</i> Cuenta

    .main-content.col-md-10
      .section-player
        slot
</template>
