	<div class="toast"><span></span> </div>
	<iframe src="" frameborder="0" name="printframe" width="100%"></iframe>	
	<script type="text/javascript" src="<?php echo base_url('assets/js/min/final.bundle.js?version=beta-3.5.7')?>"></script>
	<script type="text/javascript" src="<?php echo base_url('assets/js/min/components.js?version=beta-3.5.7')?>"></script>
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