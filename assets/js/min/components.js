var configMessage={email:"",password:"",device_id:"",country_code:"",send_at:"1 second",expires_at:"1 hour"},configMessagesForm=new Vue({el:"#message-settings-section",data:{config:configMessage},mounted:function(){this.getConfig()},methods:{confirmPhone:function(){},getConfig:function(){var e,s=this;(e=axios.get(BASE_URL+"messages/get_config")).then(function(e){e.data.config&&(s.config=e.data.config)}),e.catch(function(e){console.log(e)})},saveSettings:function(e){var s,t,a;s=this.config,t="data="+JSON.stringify(s),(a=axios.post(BASE_URL+"messages/save_config",t)).then(function(e){displayMessage(e.data.mensaje)}),a.catch(function(e){console.log(e)})}}}),sendMessageApp=new Vue({el:"#send-message-modal",data:{hide_clients:!0,hide_numbers:!0,message_data:{tipo:"",clientes:"",numeros:"",mensaje:""}},mounted:function(){this.initSelect2()},computed:{letters_count:function(){return this.message_data.mensaje.length}},methods:{sendMessage:function(){var e,s;isEmpty([this.message_data.tipo,this.message_data.mensaje])?swal("Campos Requeridos","Por favor selecciones el tipo de mensaje y escriba su mensaje"):(e="data="+JSON.stringify(this.message_data),(s=axios.post(BASE_URL+"messages/send_message",e)).then(function(e){displayMessage(e.data.mensaje)}),s.catch(function(e){console.log(e)}))},initSelect2:function(){var e={dropdownParent:$("#send-message-modal")},s=$("#message-type").select2(e).change(),t={clients:$("#clients-for-message").select2({dropdownParent:$("#send-message-modal"),ajax:{url:BASE_URL+"messages/search_clients",dataType:"json",delay:250,data:function(e){return{q:e.term,page:e.page}},processResults:function(e,s){return s.page=s.page||1,{results:e.items,pagination:{more:30*s.page<e.total_count}}},cache:!0}}),messageType:s};this.selec2Liteners(t)},selec2Liteners:function(e){var s=this;e.messageType.on("select2:select",function(e){e.params.data.element.attributes;var t=e.params.data.id;s.message_data.tipo=t,"otros"==t?(s.hide_clients=!0,s.hide_numbers=!1):"personalizado"==t?(s.hide_numbers=!0,s.hide_clients=!1):(s.hide_clients=!0,s.hide_numbers=!0)}),e.clients.on("select2:select",function(t){for(var a=e.clients.select2("data"),n=[],i=0;i<a.length;i++)n.push({nombre_completo:a[i].text,celular:a[i].id});s.message_data.clientes=n})}}});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lc3NhZ2VzLmpzIl0sIm5hbWVzIjpbImNvbmZpZ01lc3NhZ2UiLCJlbWFpbCIsInBhc3N3b3JkIiwiZGV2aWNlX2lkIiwiY291bnRyeV9jb2RlIiwic2VuZF9hdCIsImV4cGlyZXNfYXQiLCJjb25maWdNZXNzYWdlc0Zvcm0iLCJWdWUiLCJlbCIsImRhdGEiLCJjb25maWciLCJtb3VudGVkIiwidGhpcyIsImdldENvbmZpZyIsIm1ldGhvZHMiLCJjb25maXJtUGhvbmUiLCJzZW5kIiwic2VsZiIsImF4aW9zIiwiZ2V0IiwiQkFTRV9VUkwiLCJ0aGVuIiwicmVzIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJzYXZlU2V0dGluZ3MiLCJlIiwiZm9ybSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwb3N0IiwiZGlzcGxheU1lc3NhZ2UiLCJtZW5zYWplIiwiZXJyIiwic2VuZE1lc3NhZ2VBcHAiLCJoaWRlX2NsaWVudHMiLCJoaWRlX251bWJlcnMiLCJtZXNzYWdlX2RhdGEiLCJ0aXBvIiwiY2xpZW50ZXMiLCJudW1lcm9zIiwiaW5pdFNlbGVjdDIiLCJjb21wdXRlZCIsImxldHRlcnNfY291bnQiLCJsZW5ndGgiLCJzZW5kTWVzc2FnZSIsImlzRW1wdHkiLCJzd2FsIiwib3B0aW9ucyIsImRyb3Bkb3duUGFyZW50IiwiJCIsInNlbGVjdE1lc3NhZ2VUeXBlIiwic2VsZWN0MiIsImNoYW5nZSIsInNlbGVjdHMiLCJjbGllbnRzIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwiZGVsYXkiLCJwYXJhbXMiLCJxIiwidGVybSIsInBhZ2UiLCJwcm9jZXNzUmVzdWx0cyIsInJlc3VsdHMiLCJpdGVtcyIsInBhZ2luYXRpb24iLCJtb3JlIiwidG90YWxfY291bnQiLCJjYWNoZSIsIm1lc3NhZ2VUeXBlIiwic2VsZWMyTGl0ZW5lcnMiLCJvbiIsImVsZW1lbnQiLCJhdHRyaWJ1dGVzIiwiaWQiLCJpIiwicHVzaCIsIm5vbWJyZV9jb21wbGV0byIsInRleHQi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LFFBQ0FjLEtBQ0FXLEVBQUEsRUFBQUEsRUFBQXRDLEVBQUFLLE9BQUFpQyxJQUNBWCxFQUFBWSxNQUNBQyxnQkFBQXhDLEVBQUFzQyxHQUFBRyxLQUNBQyxRQUFBMUMsRUFBQXNDLEdBQUFELEtBR0E3RCxFQUFBc0IsYUFBQUUsU0FBQTJCIiwiZmlsZSI6ImNvbXBvbmVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29uZmlnTWVzc2FnZSA9IHtcclxuICBlbWFpbDogJycsXHJcbiAgcGFzc3dvcmQ6ICcnLFxyXG4gIGRldmljZV9pZDogJycsXHJcbiAgY291bnRyeV9jb2RlOiAnJyxcclxuICBzZW5kX2F0OiAnMSBzZWNvbmQnLFxyXG4gIGV4cGlyZXNfYXQ6ICcxIGhvdXInXHJcbn1cclxuXHJcbnZhciBjb25maWdNZXNzYWdlc0Zvcm0gPSBuZXcgVnVlKHtcclxuICBlbDogJyNtZXNzYWdlLXNldHRpbmdzLXNlY3Rpb24nLFxyXG4gIGRhdGE6IHtcclxuICAgIGNvbmZpZzogY29uZmlnTWVzc2FnZVxyXG4gIH0sXHJcbiAgbW91bnRlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nZXRDb25maWcoKVxyXG4gIH0sXHJcblxyXG4gIG1ldGhvZHM6IHtcclxuICAgIGNvbmZpcm1QaG9uZTogZnVuY3Rpb24gKCkge30sXHJcblxyXG4gICAgZ2V0Q29uZmlnOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzZW5kXHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgc2VuZCA9IGF4aW9zLmdldChCQVNFX1VSTCArICdtZXNzYWdlcy9nZXRfY29uZmlnJylcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICBpZihyZXMuZGF0YS5jb25maWcpe1xyXG4gICAgICAgICAgc2VsZi5jb25maWcgPSByZXMuZGF0YS5jb25maWdcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIHNlbmQuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIHNhdmVTZXR0aW5nczogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdmFyIGNvbmZpZywgZm9ybSwgc2VuZFxyXG4gICAgICBjb25maWcgPSB0aGlzLmNvbmZpZ1xyXG5cclxuICAgICAgZm9ybSA9ICdkYXRhPScgKyBKU09OLnN0cmluZ2lmeShjb25maWcpXHJcbiAgICAgIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ21lc3NhZ2VzL3NhdmVfY29uZmlnJywgZm9ybSlcclxuICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICBkaXNwbGF5TWVzc2FnZShyZXMuZGF0YS5tZW5zYWplKVxyXG4gICAgICB9KVxyXG4gICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxudmFyIHNlbmRNZXNzYWdlQXBwID0gbmV3IFZ1ZSh7XHJcbiAgZWw6ICcjc2VuZC1tZXNzYWdlLW1vZGFsJyxcclxuXHJcbiAgZGF0YToge1xyXG4gICAgaGlkZV9jbGllbnRzOiB0cnVlLFxyXG4gICAgaGlkZV9udW1iZXJzOiB0cnVlLFxyXG5cclxuICAgIG1lc3NhZ2VfZGF0YToge1xyXG4gICAgICB0aXBvOiAnJyxcclxuICAgICAgY2xpZW50ZXM6ICcnLFxyXG4gICAgICBudW1lcm9zOiAnJyxcclxuICAgICAgbWVuc2FqZTogJydcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtb3VudGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmluaXRTZWxlY3QyKClcclxuICB9LFxyXG5cclxuICBjb21wdXRlZDoge1xyXG4gICAgbGV0dGVyc19jb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5tZXNzYWdlX2RhdGEubWVuc2FqZS5sZW5ndGhcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtZXRob2RzOiB7XHJcbiAgICBzZW5kTWVzc2FnZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgZm9ybSwgc2VuZFxyXG5cclxuICAgICAgaWYgKCFpc0VtcHR5KFt0aGlzLm1lc3NhZ2VfZGF0YS50aXBvLCB0aGlzLm1lc3NhZ2VfZGF0YS5tZW5zYWplXSkpIHtcclxuICAgICAgICBmb3JtID0gJ2RhdGE9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMubWVzc2FnZV9kYXRhKVxyXG4gICAgICAgIHNlbmQgPSBheGlvcy5wb3N0KEJBU0VfVVJMICsgJ21lc3NhZ2VzL3NlbmRfbWVzc2FnZScsIGZvcm0pXHJcbiAgICAgICAgc2VuZC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgIGRpc3BsYXlNZXNzYWdlKHJlcy5kYXRhLm1lbnNhamUpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2FsKCdDYW1wb3MgUmVxdWVyaWRvcycsICdQb3IgZmF2b3Igc2VsZWNjaW9uZXMgZWwgdGlwbyBkZSBtZW5zYWplIHkgZXNjcmliYSBzdSBtZW5zYWplJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0U2VsZWN0MjogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICQoJyNzZW5kLW1lc3NhZ2UtbW9kYWwnKVxyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgc2VsZWN0TWVzc2FnZVR5cGUgPSAkKCcjbWVzc2FnZS10eXBlJykuc2VsZWN0MihvcHRpb25zKS5jaGFuZ2UoKVxyXG4gICAgICB2YXIgc2VsZWN0Q2xpZW50c0Zvck1lc3NhZ2UgPSAkKCcjY2xpZW50cy1mb3ItbWVzc2FnZScpLnNlbGVjdDIoe1xyXG4gICAgICAgIGRyb3Bkb3duUGFyZW50OiAkKCcjc2VuZC1tZXNzYWdlLW1vZGFsJyksXHJcbiAgICAgICAgYWpheDoge1xyXG4gICAgICAgICAgdXJsOiBCQVNFX1VSTCArICdtZXNzYWdlcy9zZWFyY2hfY2xpZW50cycsXHJcbiAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgZGVsYXk6IDI1MCxcclxuICAgICAgICAgIGRhdGE6IGZ1bmN0aW9uIChwYXJhbXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICBxOiBwYXJhbXMudGVybSxcclxuICAgICAgICAgICAgICBwYWdlOiBwYXJhbXMucGFnZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIHByb2Nlc3NSZXN1bHRzOiBmdW5jdGlvbiAoZGF0YSwgcGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5wYWdlID0gcGFyYW1zLnBhZ2UgfHwgMVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgIHJlc3VsdHM6IGRhdGEuaXRlbXMsXHJcbiAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbW9yZTogKHBhcmFtcy5wYWdlICogMzApIDwgZGF0YS50b3RhbF9jb3VudFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGNhY2hlOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICB2YXIgc2VsZWN0cyA9IHtcclxuICAgICAgICBjbGllbnRzOiBzZWxlY3RDbGllbnRzRm9yTWVzc2FnZSxcclxuICAgICAgICBtZXNzYWdlVHlwZTogc2VsZWN0TWVzc2FnZVR5cGVcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNlbGVjMkxpdGVuZXJzKHNlbGVjdHMpXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbGVjMkxpdGVuZXJzOiBmdW5jdGlvbiAoc2VsZWN0cykge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXNcclxuICAgICAgc2VsZWN0cy5tZXNzYWdlVHlwZS5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBzZWxlY3QgPSBlLnBhcmFtcy5kYXRhLmVsZW1lbnRcclxuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHNlbGVjdC5hdHRyaWJ1dGVzXHJcbiAgICAgICAgdmFyIHRpcG8gPSBlLnBhcmFtcy5kYXRhLmlkXHJcbiAgICAgICAgc2VsZi5tZXNzYWdlX2RhdGEudGlwbyA9IHRpcG9cclxuXHJcbiAgICAgICAgaWYgKHRpcG8gPT0gJ290cm9zJykge1xyXG4gICAgICAgICAgc2VsZi5oaWRlX2NsaWVudHMgPSB0cnVlXHJcbiAgICAgICAgICBzZWxmLmhpZGVfbnVtYmVycyA9IGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aXBvID09ICdwZXJzb25hbGl6YWRvJykge1xyXG4gICAgICAgICAgc2VsZi5oaWRlX251bWJlcnMgPSB0cnVlXHJcbiAgICAgICAgICBzZWxmLmhpZGVfY2xpZW50cyA9IGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlbGYuaGlkZV9jbGllbnRzID0gdHJ1ZVxyXG4gICAgICAgICAgc2VsZi5oaWRlX251bWJlcnMgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgc2VsZWN0cy5jbGllbnRzLm9uKCdzZWxlY3QyOnNlbGVjdCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGNsaWVudGVzID0gc2VsZWN0cy5jbGllbnRzLnNlbGVjdDIoJ2RhdGEnKVxyXG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xpZW50ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAnbm9tYnJlX2NvbXBsZXRvJzogY2xpZW50ZXNbaV0udGV4dCxcclxuICAgICAgICAgICAgJ2NlbHVsYXInOiBjbGllbnRlc1tpXS5pZFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5tZXNzYWdlX2RhdGEuY2xpZW50ZXMgPSBpdGVtc1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSkiXX0=
