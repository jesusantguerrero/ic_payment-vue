<template lang="pug">
   .modal.fade(tabindex="-1", role="dialog", id="add-extra-modal")
    .modal-dialog.modal-lg(role="document")
      .modal-content
        .modal-header
          button(type="button", class="close", data-dismiss="modal", aria-label="Close"): span(aria-hidden="true") &times;
          h4.modal-title {{ modalTitle }}
        .modal-body
          .tab-container
            ul.nav.nav-tabs(role="tablist")
              li(role="presentation" class="active"): a(href="#extra-contract" aria-controls="extra-contract" role="tab" data-toggle="tab") Contrato
              li(role="presentation"): a(href="#extra-service" aria-controls="extra-service" role="tab" data-toggle="tab") Servicio
              li(role="presentation"): a(href="#extra-extension" aria-controls="extra-extension" role="tab" data-toggle="tab") Extender Contrato
              li(role="presentation"): a(href="#extra-upgrade" aria-controls="extra-upgrade" role="tab" data-toggle="tab") Mejorar Contrato


            .tab-content
              .tab-pane.active.fade.in#extra-contract(role="tabpanel")
                form
                  .row
                    .col-md-6
                      h4 Datos del contrato
                      .form-group
                        label(for="client-dni") Cedula(sin guiones)
                        PhoneInput(placeholder="cedula", types="text",ids="client-dni" role="dni" data="cedula", :value="store.client.cedula" v-on:change="inputChange", class="form-control")
                      .form-group
                        label(for="client-name") Cliente
                        input(type="text", class="form-control", id="client-name", tabindex="1", v-model="store.client.nombres")
                      .form-group
                        label(for="client-name") Codigo IP
                        input(type="text", class="form-control", id="client-name", tabindex="1", v-model="store.client.nombres")

                    .col-md-6
                      h4.placeholder ...
                      .form-group
                        label(for="client-lastname") Codigo del Contrato
                        input(type="text", class="form-control", id="client-lastname", tabindex="2", v-model="store.client.apellidos")
                      .form-group
                        label(for="client-phone") Servicio
                        input(type="text", class="form-control", id="client-name", tabindex="1", v-model="store.client.nombres")

              .tab-pane.fade.in#extra-service(role="tabpanel")
                form
                  .row
                    .col-md-6
                      h4 Dirección
                      .form-group
                        label(for="client-provincia") Servicio
                        select(type="text", class="form-control password-confirm", id="client-provincia", list="provincias" tabindex="5", v-model="store.client.provincia")
                        datalist#provincias
                          option(value="La Romana")
                          option(value="Santo Domingo")
                          option(value="La Altagracia")

                      .form-group
                        label(for="cient-sector") Sector
                        input(class="form-control", id="client-sector", tabindex="6", v-model="store.client.sector")

                    .col-md-6
                      h4.placeholder ...
                      .form-group
                        label(for="client-street") Calle
                        input(type="text", class="form-control", id="client-street", tabindex="6", v-model="store.client.calle")

                      .form-group
                        label(for="client-house") Casa #
                        input(type="text", class="form-control", id="client-house", tabindex="7", v-model="store.client.casa")

                    .col-md-12
                    .form-group
                      label(for="u-client-house") Detalle de Direccion
                      textarea(name="", class="form-control", id="extra-service-details", tabindex="8", cols="30", rows="5", v-model="store.client.direccion")

              .tab-pane.fade.in#extra-extension(role="tabpanel")
                form
                  .row
                    .col-md-6
                      h4 Datos Personales +
                      .form-group
                        label(for="client-job") Lugar de Trabajo
                        input(type="text", class="form-control", id="client-job", v-model="store.client.lugar_trabajo")
                      .form-group
                        label(for="client-salary") Salario
                        input(type="number", class="form-control", id="client-salary", value="0", v-model="store.client.ingresos")

                    .col-md-6
                      h4.placeholder ...
                      .form-group
                        label(for="client-job-number") Telefono del trabajo
                        input(type="tel", class="form-control", id="client-job-telephone", v-model="store.client.tel_trabajo")

        .modal-footer
          button(type="button", class="btn", data-dismiss="modal") Cancelar
          button(type="button", class="btn save", id="btn-save-client", @click.stop.prevent='save') {{ buttonTitle }}
</template>
