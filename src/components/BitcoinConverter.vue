<template>
  <div>
    <router-link to="/"><img alt="Vue logo" width="200" src="/img/logo.png" style="margin:0 0 2em 0"></router-link>
    <b-form autocomplete="off">
        <div>
          <b-jumbotron :header="header" :lead="lead"></b-jumbotron>
        </div>

        <b-container style="max-width:50em">
          <b-row no-gutters>
            <b-col cols="2">
              <b-form-input type="text" id="updatedCryptoQuantity" v-model="updatedCryptoQuantity" v-on:keyup="unitChanged" size="lg" />
            </b-col>
            <b-col cols="3">
              <b-dropdown v-model="cryptoCurrency" :options="cryptoDropdown" :text="selectedCrypto" id="crypto-dropdown" class="m-2">
                <b-dropdown-item v-for="option in cryptoDropdown" :selected="option.value == 'bch'" :value="option.value" :to="'/'+option.value.toLowerCase()+'/'+fiatCurrency" v-bind:key="option.value" text="derp" @click="cryptoChanged(option)">{{option.text}}</b-dropdown-item>
              </b-dropdown>
            </b-col>
            <b-col cols="1" style="font-size:2em">
              =
            </b-col>
            <b-col cols="3">
              <b-form-input type="text" id="updatedConvertValue" v-model="updatedConvertValue" v-on:keyup="valueChanged" size="lg" />
            </b-col>
            <b-col cols="3">
              <b-dropdown v-model="fiatCurrency" :options="fiatDropdown" :text="selectedFiat" id="fiat-dropdown" class="m-2">
		<b-dropdown-item v-for="option in fiatDropdown" :selected="option.value == 'usd'" :value="option.value" :to="'/'+cryptoCurrency.toLowerCase()+'/'+option.value" v-bind:key="option.value" @click="fiatChanged(option)">{{option.text}}</b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>
        </b-container>
    </b-form>
    <div style="position: relative; height:200px; width:60%; margin:2em auto 0;">
      <MonthlyChart />
    </div>
    <Footer/>
  </div>
</template>

<script>
import Vue2Filters from 'vue2-filters'
import Accounting from 'accounting'

import MonthlyChart from './MonthlyChart'
import Footer from './Footer'

export default {
  data () {
    return {
      cryptoCurrency: typeof this.$route.params.crypto !== "undefined" ? this.$route.params.crypto.toUpperCase() : 'BCH',
      cryptoQuantity: 1,
      cryptoCurrencyUpdated: '',
      convertValue: '',
      fiatCurrency: typeof this.$route.params.fiat !== "undefined" ? this.$route.params.fiat : 'usd',
      fiatSymbol: '$',
      cryptoDropdown: [
        { text: "Bitcoin", value: "BTC" },
        { text: "Bitcoin Cash", value: "BCH" },
        { text: "Bitcoin SV", value: "BSV" },
        { text: "Ethereum", value: "ETH" },
        { text: "Ethereum Classic", value: "ETC" },
        { text: "Litecoin", value: "LTC" },
        { text: "XRP", value: "XRP" },
        { text: "Stellar", value: "XLM" }
      ],
      fiatDropdown: [
        { text: 'US Dollar', value: 'usd' },
        { text: 'Euro', value: 'eur' },
        { text: 'Pound Sterling', value: 'gbp' },
	{ text: 'Japanese Yen', value: 'jpy' },
        { text: 'Chinese Yen', value: 'cny' },
        { text: 'Canadian Dollar', value: 'cad' },
        { text: 'South African Rand', value: 'zar' },
        { text: 'Colombian Peso', value: 'cop' },
        { text: 'Mexican Peso', value: 'mxn' },
        { text: 'Indian Rupee', value: 'inr' },
        { text: 'Swiss Franc', value: 'chf' },
        { text: 'Russian Ruble', value: 'rub' },
        { text: 'Saudi Riyal', value: 'sar' },
        { text: 'Taiwan Dollar', value: 'twd' },
        { text: 'Hong Kong Dollar', value: 'hkd' },
        { text: 'Brazilian Real', value: 'brl' }
      ],
      fiatSymbols: {
         usd: '$',
         eur: '€',
         gbp: '£',
         jpy: '¥',
         cny: '¥',
         cad: '$',
         zar: 'R',
         cop: '$',
         mxn: 'Mex$',
         inr: '₹',
         chf: '₣',
         rub: '₽',
         sar: '﷼',
         twd: 'NT$',
         hkd: 'HK$',
         brl: 'R$'
      },
      header: 'Simple '+this.selectedCrypto+' Converter',
      lead: 'Convert '+this.selectedFiat+' to '+this.selectedCrypto+' or the other way around',
      uriParams: typeof this.$route.params.crypto !== "undefined" ? this.$route.params : { crypto: 'BCH' },
      selectedCrypto: typeof this.$route.params.crypto !== "undefined" ? this.$route.params.crypto : 'Bitcoin Cash',
      selectedFiat: typeof this.$route.params.crypto !== "undefined" ? this.$route.params.fiat : 'US Dollars',
      updatedCryptoQuantity: '',
      updatedConvertValue: '',
      updatedConvertFiat: ''
    }
  },
  methods: {
    init () {
      var crypto = this.cryptoCurrencyUpdated !== '' ? this.cryptoCurrencyUpdated : this.uriParams.crypto
      this.axios
	.get('https://api.coinbase.com/v2/prices/' + crypto + '-' + this.fiatCurrency + '/spot') // https://api.coinbase.com/v2/prices/spot?currency=' + this.fiatCurrency)
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
    fiatChanged: function(options) {
      this.selectedFiat = options.text
      this.fiatCurrency = options.value
      this.lead = 'Convert '+options.text+'s to '+this.selectedCrypto+' or the other way around'
      this.init()
    },
    cryptoChanged: function(options) {
      this.selectedCrypto = options.text
      this.cryptoCurrencyUpdated = options.value
      this.cryptoCurrency = options.value
      this.header = 'Simple ' + options.text + ' Converter'
      this.lead = 'Convert '+this.selectedFiat+'s to '+options.text+' or the other way around'
      this.init()
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
    },
    findCrypto: function(crypto) {
      var cryptoName
      cryptoName = this.cryptoDropdown.filter(p => p.value == crypto.toUpperCase())
      this.header = 'Simple '+cryptoName[0].text+' Converter'
      this.selectedCrypto = cryptoName[0].text
    },
    findFiat: function(fiat) {
      var fiatName
      fiatName = this.fiatDropdown.filter(p => p.value == fiat)
      this.lead = 'Convert '+fiatName[0].text+'s to '+this.selectedCrypto+' or the other way around'
      this.selectedFiat = fiatName[0].text
    }
  },
  mounted () {
    this.init()
    this.findCrypto(this.cryptoCurrency)
    this.findFiat(this.fiatCurrency)
  },
  computed: {
  },
  created: function () {
  },
  components: {
    MonthlyChart,
    Footer
  },
  mixins: [Vue2Filters.mixin]

}
</script>
