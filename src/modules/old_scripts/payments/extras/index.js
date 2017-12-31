export default Extras = {
  remove: function (id) {
    var id_cliente, send;

    id_cliente = $('#detail-client-id').val()
    form = "data=" + JSON.stringify({id: id,id_cliente: id_cliente});
    send = axios.post(BASE_URL + 'extra/delete_extra', form);
    send.then(function(res){
      var data = res.data;
      displayMessage(data.mensaje);
      extraTable.refresh(data.extras);
    });

    send.catch(function(error){
      console.log(error);
    });

  }
}
