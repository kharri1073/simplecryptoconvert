<template>
  <div id="app">
    <a href="/"><img alt="Vue logo" width="200" src="/img/logo.png" style="margin:0 0 2em 0"></a>
    <BitcoinConverter />
    <div style="position: relative; height:200px; width:60%; margin:2em auto 0;">
    <MonthlyChart />
    </div>
    <Footer />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import BitcoinConverter from './components/BitcoinConverter.vue'
import Footer from './components/Footer.vue'
import MonthlyChart from './components/MonthlyChart'

export default {
  name: 'app',
  components: {
    // HelloWorld,
    BitcoinConverter,
    Footer,
    MonthlyChart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
