<template>
    <b-form autocomplete="off">
	<div>
	  <b-jumbotron header="Simple Bitcoin Cash Converter" lead="Convert USD to Bitcoin Cash"></b-jumbotron>
	</div>

	<b-container style="max-width:50em">
	  <b-row no-gutters>
	    <b-col cols="3">
	      <b-form-input type="text" id="updatedCryptoQuantity" v-model="updatedCryptoQuantity" v-on:keyup="unitChanged" size="lg" />
	    </b-col>
	    <b-col cols="2" style="font-size:2em">
	      BCH
	    </b-col>
	    <b-col cols="1" style="font-size:2em">
	      =
	    </b-col>
	    <b-col cols="3">
	      <b-form-input type="text" id="updatedConvertValue" v-model="updatedConvertValue" v-on:keyup="valueChanged" size="lg" />
	    </b-col>
            <b-col cols="3">
              <b-form-select v-model="fiatCurrency" :options="fiatDropdown" @change="init" size="lg"></b-form-select>
            </b-col>
	  </b-row>
        </b-container>

    </b-form>
</template>

<script>
import Vue2Filters from 'vue2-filters'

export default {
  data () {
    return {
      cryptoQuantity: 1,
      convertValue: '',
      fiatCurrency: 'usd',
      fiatDropdown: [
        { text: 'US Dollar', value: 'usd' },
        { text: 'Euro', value: 'eur' },
        { text: 'Pound Sterling', value: 'gbp' },
        { text: 'Chinese Yen', value: 'cny' },
        { text: 'Canadian Dollar', value: 'cad' },
        { text: 'South African Rand', value: 'sar' },
        { text: 'Colombian Peso', value: 'cop' },
        { text: 'Mexican Peso', value: 'mxn' }
      ],
      updatedCryptoQuantity: '',
      updatedConvertValue: '',
      updatedConvertFiat: '',
      fiatSymbol: '$'
    }
  },
  methods: {
    init () {
      this.axios
        // .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .get('https://index-api.bitcoin.com/api/v0/cash/price/' + this.fiatCurrency)
        .then(response => (
          this.setValues(response)
        ))
    },
    setValues: function (values) {
      this.convertValue = parseFloat(Math.round(values.data.price) / 100).toFixed(2)
      this.updatedCryptoQuantity = 1
      this.updatedConvertValue = this.roundWithComma(this.convertValue)
    },
    unitChanged: function () {
      this.updatedConvertValue = this.fiatRound(this.convertValue * this.updatedCryptoQuantity)
    },
    valueChanged: function () {
      this.updatedCryptoQuantity = this.cryptoRound(this.updatedConvertValue / this.convertValue, 8)
    },
    fiatRound: function (number) {
      return this.fiatSymbol + this.roundWithComma(parseFloat(Math.round(number * 100) / 100).toFixed(2))
    },
    roundWithComma: function (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    cryptoRound: function (number, precision) {
      'use strict'
      precision = precision ? +precision : 0

      var sNumber = number + ''
      var periodIndex = sNumber.indexOf('.')
      var factor = Math.pow(10, precision)

      if (periodIndex === -1 || precision < 0) {
        return Math.round(number * factor) / factor
      }

      number = +number

      // sNumber[periodIndex + precision + 1] is the last digit
      if (sNumber[periodIndex + precision + 1] >= 5) {
        // Correcting float error
        // factor * 10 to use one decimal place beyond the precision
        number += (number < 0 ? -1 : 1) / (factor * 10)
      }

      return +number.toFixed(precision)
    }
  },
  mounted () {
    this.init()
  },
  computed: {
  },
  created: function () {
  },
  mixins: [Vue2Filters.mixin]

}
</script>
