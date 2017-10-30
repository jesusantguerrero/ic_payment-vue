var RetirementReport = new Vue({
  el: '#retiros',
  data: {
   table: '',
   tableHTML: '',
   between: {
     first_date: '',
     second_date: ''
   }
  },
  methods: {
    getReport: function () {
      var form = 'data=' + JSON.stringify(this.between)
      axios.post(BASE_URL + 'contract/getCancelations/')
      .then(function (res) {
        console.log(res)
      })
    },

    fillTable: function(dataHTML) {
      
    }
  }
})