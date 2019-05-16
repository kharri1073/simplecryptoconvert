<template>
  <footer>
    <div style="min-height:300px;"></div>
    <div>
      <div class="fluid-container footer">
        <b-container style="max-width:50em">
          <b-row style="height:160px">
            <b-col cols="4">
              <span>Who We Are</span>
              <p>No one really, just a webdev who couldn't find a good simple converter aside from <a href="http://preev.com/">preev.com</a>. Simple crypto converter is just that, a simple crypto converter.</p>
            </b-col>
            <b-col cols="1" style="font-size:2em">

            </b-col>
            <b-col cols="2">
              <span>Contact</span>
              <ul>
                <li><a href="https://github.com/kharri1073/simplecryptoconvert">Github</a></li>
                <li><a href="https://twitter.com/kharri1073">twitter</a></li>
              </ul>
            </b-col>
            <b-col cols="2">

            </b-col>
            <b-col cols="3">
                In code we trust.
		<br /><br />
                <a href="https://nakamotoinstitute.org/bitcoin/">Bitcoin Whitepaper</a>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <span>Is this useful?</span>
              <p>
                BTC: <a href="bitcoin:1DmMGUi9KxrHkwaCvBBb88mcqRgp114gEu">1DmMGUi9KxrHkwaCvBBb88mcqRgp114gEu</a><br>
                BCH: <a href="bitcoincash:qzxqfwk2qgnux2gyrpl4xx85h9scck2nhgxj2x7cyh">qzxqfwk2qgnux2gyrpl4xx85h9scck2nhgxj2x7cyh</a>
              </p>
            </b-col>
          </b-row>
        </b-container>

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
ol, ul, li {
    list-style: none outside none;
    margin:0;
    padding:0;
}
p {
    font-size:.8em;
}
.fluid-container.footer{
    background:#ccc;
    text-align:left;
}
.fluid-container.footer > *:last-child {
    margin-bottom: 0px;
    color: #000;
}
</style>
