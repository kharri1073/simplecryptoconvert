<script>
import { Line } from 'vue-chartjs'
 
export default {
  extends: Line,
  data () {
    return {
      data: {
        labels: [],
        datasets: [
          {
            label: 'Bitcoin Cash previous 30 Days in USD',
            backgroundColor: '#F59332', // color from bitcoin.com logo page
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        pointRadius: 2,
        pointHoverRadius: 2
      },
      months: [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ]
    }
  },
  methods: {
    init () {
      this.axios
        .get('https://min-api.cryptocompare.com/data/histoday?aggregate=1&e=CCCAGG&extraParams=CryptoCompare&fsym=BCH&limit=30&tryConversion=false&tsym=USD')
        .then(response => (
          this.setValues(response.data)
        ))
    },
    setValues: function (values) {
        Array.prototype.forEach.call(values.Data, day=>{
          var daydate = new Date(day.time*1000)
          this.data.labels.push(this.months[daydate.getMonth()].substr(0,3) + ' ' + daydate.getDate())
          this.data.datasets[0].data.push(day.close)
	}
      )
      this.chartIt()
    },
    chartIt: function () {
      this.renderChart(this.data, this.chartOptions)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
