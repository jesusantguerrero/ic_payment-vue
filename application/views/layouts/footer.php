      <message-modal></message-modal>
      <petty-cash-modal :store="store" :money-movement="store.moneyMovement" :modal-mode="pettyCashMode" @add="addMoney" @retire="retireMoney"></petty-cash-modal>
      <ticket-modal></ticket-modal>
      <iframe src="" frameborder="0" name="printframe" width="100%" class="hide"></iframe>
    </main>

    <script>
      const baseURL = '{url}'
    </script>

    {js}
      <script src="{link}"></script>
    {/js}

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-97873154-2', 'auto');
      ga('send', 'pageview');
    </script>
 </body>
</html>
