var configMessage={email:"",password:"",device_id:"",country_code:"",send_at:"1 second",expires_at:"1 hour"},configMessagesForm=new Vue({el:"#message-settings-section",data:{config:configMessage},mounted:function(){this.getConfig()},methods:{confirmPhone:function(){},getConfig:function(){var e,s=this;(e=axios.get(BASE_URL+"messages/get_config")).then(function(e){e.data.config&&(s.config=e.data.config)}),e.catch(function(e){console.log(e)})},saveSettings:function(e){var s,t,a;s=this.config,t="data="+JSON.stringify(s),(a=axios.post(BASE_URL+"messages/save_config",t)).then(function(e){displayMessage(e.data.mensaje)}),a.catch(function(e){console.log(e)})}}}),sendMessageApp=new Vue({el:"#send-message-modal",data:{hide_clients:!0,hide_numbers:!0,message_data:{tipo:"",clientes:"",numeros:"",mensaje:""}},mounted:function(){this.initSelect2()},computed:{letters_count:function(){return this.message_data.mensaje.length}},methods:{sendMessage:function(){var e,s;isEmpty([this.message_data.tipo,this.message_data.mensaje])?swal("Campos Requeridos","Por favor selecciones el tipo de mensaje y escriba su mensaje"):(e="data="+JSON.stringify(this.message_data),(s=axios.post(BASE_URL+"messages/send_message",e)).then(function(e){displayMessage(e.data.mensaje)}),s.catch(function(e){console.log(e)}))},initSelect2:function(){var e={dropdownParent:$("#send-message-modal")},s=$("#message-type").select2(e).change(),t={clients:$("#clients-for-message").select2({dropdownParent:$("#send-message-modal"),ajax:{url:BASE_URL+"messages/search_clients",dataType:"json",delay:250,data:function(e){return{q:e.term,page:e.page}},processResults:function(e,s){return s.page=s.page||1,{results:e.items,pagination:{more:30*s.page<e.total_count}}},cache:!0}}),messageType:s};this.selec2Liteners(t)},selec2Liteners:function(e){var s=this;e.messageType.on("select2:select",function(e){e.params.data.element.attributes;var t=e.params.data.id;s.message_data.tipo=t,"otros"==t?(s.hide_clients=!0,s.hide_numbers=!1):"personalizado"==t?(s.hide_numbers=!0,s.hide_clients=!1):(s.hide_clients=!0,s.hide_numbers=!0)}),e.clients.on("select2:select",function(t){for(var a=e.clients.select2("data"),n=[],i=0;i<a.length;i++)n.push({nombre_completo:a[i].text,celular:a[i].id});s.message_data.clientes=n})}}});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lc3NhZ2VzLmpzIl0sIm5hbWVzIjpbImNvbmZpZ01lc3NhZ2UiLCJlbWFpbCIsInBhc3N3b3JkIiwiZGV2aWNlX2lkIiwiY291bnRyeV9jb2RlIiwic2VuZF9hdCIsImV4cGlyZXNfYXQiLCJjb25maWdNZXNzYWdlc0Zvcm0iLCJWdWUiLCJlbCIsImRhdGEiLCJjb25maWciLCJtb3VudGVkIiwidGhpcyIsImdldENvbmZpZyIsIm1ldGhvZHMiLCJjb25maXJtUGhvbmUiLCJzZW5kIiwic2VsZiIsImF4aW9zIiwiZ2V0IiwiQkFTRV9VUkwiLCJ0aGVuIiwicmVzIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJzYXZlU2V0dGluZ3MiLCJlIiwiZm9ybSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwb3N0IiwiZGlzcGxheU1lc3NhZ2UiLCJtZW5zYWplIiwiZXJyIiwic2VuZE1lc3NhZ2VBcHAiLCJoaWRlX2NsaWVudHMiLCJoaWRlX251bWJlcnMiLCJtZXNzYWdlX2RhdGEiLCJ0aXBvIiwiY2xpZW50ZXMiLCJudW1lcm9zIiwiaW5pdFNlbGVjdDIiLCJjb21wdXRlZCIsImxldHRlcnNfY291bnQiLCJsZW5ndGgiLCJzZW5kTWVzc2FnZSIsImlzRW1wdHkiLCJzd2FsIiwib3B0aW9ucyIsImRyb3Bkb3duUGFyZW50IiwiJCIsInNlbGVjdE1lc3NhZ2VUeXBlIiwic2VsZWN0MiIsImNoYW5nZSIsInNlbGVjdHMiLCJjbGllbnRzIiwiYWpheCIsInVybCIsImRhdGFUeXBlIiwiZGVsYXkiLCJwYXJhbXMiLCJxIiwidGVybSIsInBhZ2UiLCJwcm9jZXNzUmVzdWx0cyIsInJlc3VsdHMiLCJpdGVtcyIsInBhZ2luYXRpb24iLCJtb3JlIiwidG90YWxfY291bnQiLCJjYWNoZSIsIm1lc3NhZ2VUeXBlIiwic2VsZWMyTGl0ZW5lcnMiLCJvbiIsImVsZW1lbnQiLCJhdHRyaWJ1dGVzIiwiaWQiLCJpIiwicHVzaCIsIm5vbWJyZV9jb21wbGV0byIsInRleHQi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LFFBQ0FjLEtBQ0FXLEVBQUEsRUFBQUEsRUFBQXRDLEVBQUFLLE9BQUFpQyxJQUNBWCxFQUFBWSxNQUNBQyxnQkFBQXhDLEVBQUFzQyxHQUFBRyxLQUNBQyxRQUFBMUMsRUFBQXNDLEdBQUFELEtBR0E3RCxFQUFBc0IsYUFBQUUsU0FBQTJCIiwiZmlsZSI6ImNvbXBvbmVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxudmFyIGNvbmZpZ01lc3NhZ2UgPSB7XHJcbiAgZW1haWw6ICcnLFxyXG4gIHBhc3N3b3JkOiAnJyxcclxuICBkZXZpY2VfaWQ6ICcnLFxyXG4gIGNvdW50cnlfY29kZTogJycsXHJcbiAgc2VuZF9hdDogJzEgc2Vjb25kJyxcclxuICBleHBpcmVzX2F0OiAnMSBob3VyJ1xyXG59XHJcblxyXG52YXIgY29uZmlnTWVzc2FnZXNGb3JtID0gbmV3IFZ1ZSh7XHJcbiAgZWw6ICcjbWVzc2FnZS1zZXR0aW5ncy1zZWN0aW9uJyxcclxuICBkYXRhOiB7XHJcbiAgICBjb25maWc6IGNvbmZpZ01lc3NhZ2VcclxuICB9LFxyXG4gIG1vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2V0Q29uZmlnKClcclxuICB9LFxyXG5cclxuICBtZXRob2RzOiB7XHJcbiAgICBjb25maXJtUGhvbmU6IGZ1bmN0aW9uICgpIHt9LFxyXG5cclxuICAgIGdldENvbmZpZzogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgc2VuZFxyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgIHNlbmQgPSBheGlvcy5nZXQoQkFTRV9VUkwgKyAnbWVzc2FnZXMvZ2V0X2NvbmZpZycpXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgaWYocmVzLmRhdGEuY29uZmlnKXtcclxuICAgICAgICAgIHNlbGYuY29uZmlnID0gcmVzLmRhdGEuY29uZmlnXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBzZW5kLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBzYXZlU2V0dGluZ3M6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHZhciBjb25maWcsIGZvcm0sIHNlbmRcclxuICAgICAgY29uZmlnID0gdGhpcy5jb25maWdcclxuXHJcbiAgICAgIGZvcm0gPSAnZGF0YT0nICsgSlNPTi5zdHJpbmdpZnkoY29uZmlnKVxyXG4gICAgICBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdtZXNzYWdlcy9zYXZlX2NvbmZpZycsIGZvcm0pXHJcbiAgICAgIHNlbmQudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgZGlzcGxheU1lc3NhZ2UocmVzLmRhdGEubWVuc2FqZSlcclxuICAgICAgfSlcclxuICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbnZhciBzZW5kTWVzc2FnZUFwcCA9IG5ldyBWdWUoe1xyXG4gIGVsOiAnI3NlbmQtbWVzc2FnZS1tb2RhbCcsXHJcblxyXG4gIGRhdGE6IHtcclxuICAgIGhpZGVfY2xpZW50czogdHJ1ZSxcclxuICAgIGhpZGVfbnVtYmVyczogdHJ1ZSxcclxuXHJcbiAgICBtZXNzYWdlX2RhdGE6IHtcclxuICAgICAgdGlwbzogJycsXHJcbiAgICAgIGNsaWVudGVzOiAnJyxcclxuICAgICAgbnVtZXJvczogJycsXHJcbiAgICAgIG1lbnNhamU6ICcnXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbW91bnRlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5pbml0U2VsZWN0MigpXHJcbiAgfSxcclxuXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGxldHRlcnNfY291bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZV9kYXRhLm1lbnNhamUubGVuZ3RoXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgbWV0aG9kczoge1xyXG4gICAgc2VuZE1lc3NhZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGZvcm0sIHNlbmRcclxuXHJcbiAgICAgIGlmICghaXNFbXB0eShbdGhpcy5tZXNzYWdlX2RhdGEudGlwbywgdGhpcy5tZXNzYWdlX2RhdGEubWVuc2FqZV0pKSB7XHJcbiAgICAgICAgZm9ybSA9ICdkYXRhPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLm1lc3NhZ2VfZGF0YSlcclxuICAgICAgICBzZW5kID0gYXhpb3MucG9zdChCQVNFX1VSTCArICdtZXNzYWdlcy9zZW5kX21lc3NhZ2UnLCBmb3JtKVxyXG4gICAgICAgIHNlbmQudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICBkaXNwbGF5TWVzc2FnZShyZXMuZGF0YS5tZW5zYWplKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc2VuZC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc3dhbCgnQ2FtcG9zIFJlcXVlcmlkb3MnLCAnUG9yIGZhdm9yIHNlbGVjY2lvbmVzIGVsIHRpcG8gZGUgbWVuc2FqZSB5IGVzY3JpYmEgc3UgbWVuc2FqZScpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdFNlbGVjdDI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgIGRyb3Bkb3duUGFyZW50OiAkKCcjc2VuZC1tZXNzYWdlLW1vZGFsJylcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHNlbGVjdE1lc3NhZ2VUeXBlID0gJCgnI21lc3NhZ2UtdHlwZScpLnNlbGVjdDIob3B0aW9ucykuY2hhbmdlKClcclxuICAgICAgdmFyIHNlbGVjdENsaWVudHNGb3JNZXNzYWdlID0gJCgnI2NsaWVudHMtZm9yLW1lc3NhZ2UnKS5zZWxlY3QyKHtcclxuICAgICAgICBkcm9wZG93blBhcmVudDogJCgnI3NlbmQtbWVzc2FnZS1tb2RhbCcpLFxyXG4gICAgICAgIGFqYXg6IHtcclxuICAgICAgICAgIHVybDogQkFTRV9VUkwgKyAnbWVzc2FnZXMvc2VhcmNoX2NsaWVudHMnLFxyXG4gICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgIGRlbGF5OiAyNTAsXHJcbiAgICAgICAgICBkYXRhOiBmdW5jdGlvbiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgcTogcGFyYW1zLnRlcm0sXHJcbiAgICAgICAgICAgICAgcGFnZTogcGFyYW1zLnBhZ2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICBwcm9jZXNzUmVzdWx0czogZnVuY3Rpb24gKGRhdGEsIHBhcmFtcykge1xyXG4gICAgICAgICAgICBwYXJhbXMucGFnZSA9IHBhcmFtcy5wYWdlIHx8IDFcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICByZXN1bHRzOiBkYXRhLml0ZW1zLFxyXG4gICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG1vcmU6IChwYXJhbXMucGFnZSAqIDMwKSA8IGRhdGEudG90YWxfY291bnRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjYWNoZTogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgdmFyIHNlbGVjdHMgPSB7XHJcbiAgICAgICAgY2xpZW50czogc2VsZWN0Q2xpZW50c0Zvck1lc3NhZ2UsXHJcbiAgICAgICAgbWVzc2FnZVR5cGU6IHNlbGVjdE1lc3NhZ2VUeXBlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZWxlYzJMaXRlbmVycyhzZWxlY3RzKVxyXG4gICAgfSxcclxuXHJcbiAgICBzZWxlYzJMaXRlbmVyczogZnVuY3Rpb24gKHNlbGVjdHMpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgIHNlbGVjdHMubWVzc2FnZVR5cGUub24oJ3NlbGVjdDI6c2VsZWN0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgc2VsZWN0ID0gZS5wYXJhbXMuZGF0YS5lbGVtZW50XHJcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBzZWxlY3QuYXR0cmlidXRlc1xyXG4gICAgICAgIHZhciB0aXBvID0gZS5wYXJhbXMuZGF0YS5pZFxyXG4gICAgICAgIHNlbGYubWVzc2FnZV9kYXRhLnRpcG8gPSB0aXBvXHJcblxyXG4gICAgICAgIGlmICh0aXBvID09ICdvdHJvcycpIHtcclxuICAgICAgICAgIHNlbGYuaGlkZV9jbGllbnRzID0gdHJ1ZVxyXG4gICAgICAgICAgc2VsZi5oaWRlX251bWJlcnMgPSBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGlwbyA9PSAncGVyc29uYWxpemFkbycpIHtcclxuICAgICAgICAgIHNlbGYuaGlkZV9udW1iZXJzID0gdHJ1ZVxyXG4gICAgICAgICAgc2VsZi5oaWRlX2NsaWVudHMgPSBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZWxmLmhpZGVfY2xpZW50cyA9IHRydWVcclxuICAgICAgICAgIHNlbGYuaGlkZV9udW1iZXJzID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIHNlbGVjdHMuY2xpZW50cy5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBjbGllbnRlcyA9IHNlbGVjdHMuY2xpZW50cy5zZWxlY3QyKCdkYXRhJylcclxuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsaWVudGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgJ25vbWJyZV9jb21wbGV0byc6IGNsaWVudGVzW2ldLnRleHQsXHJcbiAgICAgICAgICAgICdjZWx1bGFyJzogY2xpZW50ZXNbaV0uaWRcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYubWVzc2FnZV9kYXRhLmNsaWVudGVzID0gaXRlbXNcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn0pIl19
