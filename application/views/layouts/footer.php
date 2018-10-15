      <app-message-modal></app-message-modal>
      <app-petty-cash-modal :store="store" :transaction="store.pettyCashTransaction" :modal-mode="store.pettyCashMode" @save="saveTransaction"></app-petty-cash-modal>
      <app-ticket-modal></app-ticket-modal>
      <iframe src="" frameborder="0" name="printframe" width="100%" class="hide"></iframe>
    </main>
    <div class="splash-screen">
      <img class="splash-logo" src="{url}assets/img/icpayment_logo_alter.svg" alt="">
      <h1>IC Payment</h1>
    </div>
    <script>
      const baseURL = '{url}'
      const Company = '{company}'
      const CurrentUser= '{currentUser}'
    </script>
    {js}
      <script src="{link}"></script>
    {/js}
 </body>
</html>
