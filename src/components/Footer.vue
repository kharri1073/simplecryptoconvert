<template>
  <footer>
    <div style="min-height:300px;"></div>

    <div>
      <div class="fluid-container footer">
        <p class="text-center">Copyright &copy; {{ copyDate.getFullYear() }}, SimpleCryptoConvert.com All Rights Reserved.</p>
      </div>
    </div>

  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      copyDate: new Date
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fluid-container.footer{
}
.fluid-container.footer > *:last-child {
    margin-bottom: 0px;
    color: #000;
}
</style>
