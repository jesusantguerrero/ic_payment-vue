	<div class="toast"><span></span> </div>
	
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-97873154-2', 'auto');
		ga('send', 'pageview');
	</script>
	<script type="text/javascript" src="<?php echo base_url('assets/js/min/final.bundle.js?version=4.1.46')?>"></script>
	<script>
		$(function(){
			$('[type="tel"]').inputmask({"mask": "(999) 999-9999",greede: false});
			$('[role="cedula"]').inputmask({"mask": ["999-9999999-9","**-*******-*","************"],greede: false});
			$('[id*="dni"]').inputmask({"mask": ["999-9999999-9","**-*******","*{1,20}"],greede: false});

			window.getVal = function (element){
				return element.inputmask('unmaskedvalue');
			}

			window.isComplete = function(element){
				return element.inputmask('isComplete');
			}
			 
			 $('input').iCheck({
			  checkboxClass: 'icheckbox_square-blue',
			  radioClass: 'iradio_square-blue',
			  increaseArea: '20%' // optional
  		 });
		})
		
	</script>
 </body>
</html>