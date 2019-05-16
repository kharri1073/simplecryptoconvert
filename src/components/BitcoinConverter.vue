<template>
    <b-form autocomplete="off">
        <div>
          <b-jumbotron header="Simple Bitcoin Cash Converter" lead="Convert USD to Bitcoin Cash or the other way around"></b-jumbotron>
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
import Accounting from 'accounting'

export default {
  data () {
    return {
      cryptoCurrency: 'bch',
      cryptoQuantity: 1,
      convertValue: '',
      fiatCurrency: 'usd',
      fiatSymbol: '$',
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
      fiatSymbols: {
         usd: '$',
         eur: '€',
         gbp: '£',
         cny: '¥',
         cad: '$',
         sar: 'R',
         cop: '$',
         mxn: '$'
      },
      updatedCryptoQuantity: '',
      updatedConvertValue: '',
      updatedConvertFiat: ''
    }
  },
  methods: {
    init () {
      this.axios
	.get('https://api.coinbase.com/v2/prices/' + this.cryptoCurrency + '-' + this.fiatCurrency + '/spot') // https://api.coinbase.com/v2/prices/spot?currency=' + this.fiatCurrency)
        .then(response => (
          this.setValues(response.data)
        ))
      this.fiatSymbol = this.fiatSymbols[this.fiatCurrency]
    },
    setValues: function (values) {
      this.convertValue = values.data.amount
      this.updatedCryptoQuantity = 1
      this.updatedConvertValue = Accounting.formatMoney(this.convertValue, this.fiatSymbol, 2, ",", ".")
    },
    unitChanged: function () {
      this.updatedConvertValue = Accounting.formatMoney(this.convertValue * this.updatedCryptoQuantity, this.fiatSymbol, 2, ",", ".")
    },
    valueChanged: function () {
      //this.updatedCryptoQuantity = this.cryptoRound(this.updatedConvertValue / this.convertValue, 8)
      this.updatedCryptoQuantity = this.cryptoRound(Accounting.unformat(this.updatedConvertValue) / this.convertValue, 8)
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
