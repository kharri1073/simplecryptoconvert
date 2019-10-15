<template>
  <div>
    <router-link to="/"><img alt="Vue logo" width="200" src="/img/logo.png"></router-link>
    <b-form autocomplete="off">
        <div>
          <b-jumbotron :header="header" :lead="lead"></b-jumbotron>
        </div>

        <b-container fluid style="padding:0">
          <b-row no-gutters>

            <b-col class="col-sm-12 content">
              <b-form-input type="text" id="updatedCryptoQuantity" v-model="updatedCryptoQuantity" v-on:keyup="unitChanged" size="lg" inputmode="decimal" />
              <b-dropdown v-model="cryptoCurrency" :options="cryptoDropdown" :text="selectedCrypto" id="crypto-dropdown" class="m-2">
                <b-dropdown-item v-for="option in cryptoDropdown" :selected="option.value == 'bch'" :value="option.value" :to="'/'+option.value.toLowerCase()+'/'+fiatCurrency" v-bind:key="option.value" text="derp" @click="cryptoChanged(option)">{{option.text}}</b-dropdown-item>
              </b-dropdown>
              =
              <b-form-input type="text" id="updatedConvertValue" v-model="updatedConvertValue" v-on:keyup="valueChanged" size="lg" inputmode="decimal" />
              <b-dropdown v-model="fiatCurrency" :options="fiatDropdown" :text="selectedFiat" id="fiat-dropdown" class="m-2">
		<b-dropdown-item v-for="option in fiatDropdown" :selected="option.value == 'usd'" :value="option.value" :to="'/'+cryptoCurrency.toLowerCase()+'/'+option.value" v-bind:key="option.value" @click="fiatChanged(option)">{{option.text}}</b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col id="right" style="display:block;min-width:400px;min-height:225px;padding:10px 0" class="col-sm-12">
              <div style="overflow:hidden;height:225px;width:400px;margin:0 auto;" class="crypto-player-container"><crypto-instream></crypto-instream></div>
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

<style scoped>

.display-3 {
    font-size: 1.75rem;
    font-weight:700;
}

.no-gutters input {
    margin-bottom:10px;
}

.jumbotron {
    padding:2rem 1rem;
}
.m-2 {
    height: 48px;
    margin:0 !important;
}
.form-control {
    display:inline-block;
    margin:0 2px;
}
.btn-group {
    vertical-align:top;
}
.crypto-player-container {
    overflow:hidden;
    height:225px;
    width:400px;
    margin:0 auto;
}
#updatedCryptoQuantity {
    max-width: 8em;
}
#updatedConvertValue {
    max-width:10em;
}
#right {
    display:none;
}

@media (min-width: 576px) {

  .display-3 {
      font-size: 2rem;
  }

  .no-gutters input {
      margin-bottom:0px;
  }

}

@media (min-width: 768px) {

  .display-3 {
      font-size: 3rem;
      font-weight:300;
  }

}

@media (min-width: 992px) {

  .display-3 {
      font-size: 3.5rem;
  }

}

@media (min-width: 1200px) {

  .display-3 {
      font-size: 4.5rem;
  }

}

</style>

<script>
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
      lead: 'Convert '+this.selectedFiat+' to '+this.selectedCrypto+' and the other way around',
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
      this.lead = 'Convert '+options.text+'s to '+this.selectedCrypto+' and the other way around'
      this.init()
    },
    cryptoChanged: function(options) {
      this.selectedCrypto = options.text
      this.cryptoCurrencyUpdated = options.value
      this.cryptoCurrency = options.value
      this.header = 'Simple ' + options.text + ' Converter'
      this.lead = 'Convert '+this.selectedFiat+'s to '+options.text+' and the other way around'
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
      this.lead = 'Convert '+fiatName[0].text+'s to '+this.selectedCrypto+' and the other way around'
      this.selectedFiat = fiatName[0].text
    }
  },
  mounted () {
    this.init()
    this.findCrypto(this.cryptoCurrency)
    this.findFiat(this.fiatCurrency)

      const adsbygoogle = document.createElement("script");
      adsbygoogle.setAttribute(
        "src",
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      );
      adsbygoogle.async = true;
      document.head.appendChild(adsbygoogle);
      const adsbygoogle2 = document.createElement('script');
      adsbygoogle2.innerHTML = "(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: \"ca-pub-9384138852637196\",enable_page_level_ads: true});"
      document.head.appendChild(adsbygoogle2);

    if(this.$route.params.crypto == 'xlm') {
      const plugin = document.createElement("script");
      plugin.setAttribute(
        "src",
        "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
      );
      plugin.async = true;
      document.head.appendChild(plugin);
      const player = document.createElement("script");
      player.setAttribute(
        "src",
        "https://player.railplayer.com/player-test2.js"
      );
      player.async = true;
      document.getElementById("right").appendChild(player)
    }


  },
  computed: {
  },
  created: function () {
  },
  components: {
    MonthlyChart,
    Footer
  },
  metaInfo () {
    return {
      title: this.selectedCrypto + ' to ' + this.selectedFiat + ' Converter',
      titleTemplate: '%s Calculator',
      meta: [
        {'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
        {name: 'description', content: 'Simple crypto calculator to '+this.lead},
        {property: 'og:title', content: this.header},
        {property: 'og:site_name', content: 'Simple Crypto Convert'},
        // The list of types is available here: http://ogp.me/#types
        {property: 'og:type', content: 'website'},
        // Should the the same as your canonical link, see below.
        {property: 'og:url', content: 'https://simplecryptoconvert.com' + this.$route.path },
        {property: 'og:image', content: 'https://simplecryptoconvert.com/img/logo.png'},
        {property: 'og:description', content: this.lead},

        // Twitter card
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:site', content: 'https://simplecryptoconvert.com' + this.$route.path },
        {name: 'twitter:title', content: this.header},
        {name: 'twitter:description', content: 'Simple Crypto Converter'},
        {name: 'twitter:creator', content: '@kharri1073'},
        {name: 'twitter:image:src', content: 'https://simplecryptoconvert.com/img/logo.png'},

        // Google / Schema.org markup:
        {itemprop: 'name', content: this.header},
        {itemprop: 'description', content: this.lead},
        {itemprop: 'image', content: 'https://simplecryptoconvert.com/img/logo.png'}
      ],
      link: [
        {rel: 'canonical', href: 'https://simplecryptoconvert.com' + this.$route.path}
      ]
    }
  }
}
</script>
