<template>
  <div class="loading">
    <div class="loadingIn">
      <div class="round_box_box">
        <div class="round_box">
          <div class="round round_01"></div>
          <div class="round round_02"></div>
          <div class="round round_03"></div>
          <div class="round round_04"></div>
          <div class="round round_05"></div>
          <div class="round round_06"></div>
          <div class="round round_07"></div>
          <div class="round round_08"></div>
          <div class="round round_09"></div>
          <div class="round round_10"></div>
          <div class="round round_11"></div>
          <div class="round round_12"></div>
        </div>
      </div>
      <MaskBox />
    </div>
  </div>
</template>

<script>
import MaskBox from '../components/MaskBox'
export default {
  name: 'Loading',
  data () {
    return {}
  },
  methods: {},
  components: {
    MaskBox
  }
}
</script>

<style scoped>
.loading{ width: 100vw; height: 100vh; position: fixed;top: 0;z-index: 10;}
.loadingIn{ position: relative; width: 100vw; height: 100vh;}
.round_box_box{
  width: 150px; height: 150px; background: rgba(0,0,0,0.6); position: absolute;
  transform: translateX(-50%)translateY(-50%);left: 50%;top: 50%; z-index: 20;border-radius: 5px;
}
.round_box{
  position: absolute; top:50%; left:50%; height: 150px; width: 150px;
  transform: translateX(-50%) translateY(-50%) rotateY(180deg) scale(0.5);
}
.round {
  position: absolute; width: 40px; height: 15px; border-radius: 10px;
}
.round_01{
  top: 50%; transform: translateY(-50%); background: #DEDEDE ; animation: round_01  1s infinite;
}
.round_02{
  transform: rotateZ(30deg);left: 7px;top: 39px;background: #D5D5D5;animation: round_02  1s infinite;
}
.round_03{
  transform: rotateZ(60deg);left: 28px;top: 19px;background: #CBCBCB;animation: round_03 1s infinite;
}
.round_04{
  transform: rotateZ(90deg);left: 56px;top: 14px;background: #BDBDBD;animation: round_04  1s infinite;
}
.round_05{
  transform: rotateZ(120deg);right: 28px;top: 19px;background: #B4B4B4;animation: round_05  1s infinite;
}
.round_06{
  transform: rotateZ(150deg);right: 7px;top: 39px;background: #ABABAB;animation: round_06  1s infinite;
}
.round_07{
  top: 50%;transform: translateY(-50%);right: 0px;background: #A1A1A1;animation: round_07  1s infinite;
}
.round_08{
  transform: rotateZ(30deg);right: 7px;bottom: 40px;background: #969696;animation: round_08  1s infinite;
}
.round_09{
  transform: rotateZ(60deg);right: 28px;bottom: 19px;background: #8C8C8C;animation: round_09  1s infinite;
}
.round_10{
  transform: rotateZ(90deg);left: 56px;bottom: 14px;background: #828282;animation: round_10  1s infinite;
}
.round_11{
  transform: rotateZ(120deg);left: 28px;bottom: 19px;background: #757575 ;animation: round_11  1s infinite;
}
.round_12{
  transform: rotateZ(150deg);left: 7px;bottom: 39px;background: #6E6E6E ;animation: round_12  1s infinite;
}
@keyframes round_01{
  0% { background: #DEDEDE ; }
  8.3%{ background: #D5D5D5;}
  16.6% { background: #CBCBCB;}
  24.9% {background: #BDBDBD;}
  33.2% { background: #B4B4B4;}
  41.5% { background: #ABABAB;}
  49.8% { background: #A1A1A1;}
  58.1% { background: #969696;}
  66.4% { background: #8C8C8C;}
  74.7% { background: #828282;}
  83% { background: #757575 ;}
  91.3% {background: #6E6E6E ; }
  100% {background: #DEDEDE ;}
}
@keyframes round_02{
  0% { background: #D5D5D5; }
  8.3%{ background: #CBCBCB; }
  16.6% { background: #BDBDBD; }
  24.9% { background: #B4B4B4;}
  33.2% { background: #ABABAB;}
  41.5% { background: #A1A1A1;}
  49.8% { background: #969696;}
  58.1% { background: #8C8C8C;}
  66.4% { background: #828282;}
  74.7% { background: #757575 ;}
  83% { background: #6E6E6E ;}
  91.3% { background: #DEDEDE ;}
  100% { background: #D5D5D5;}
}
@keyframes round_03{
  0% { background: #CBCBCB;  }
  8.3%{ background: #BDBDBD; }
  16.6% { background: #B4B4B4; }
  24.9% { background: #ABABAB; }
  33.2% { background: #A1A1A1; }
  41.5% { background: #969696; }
  49.8% { background: #8C8C8C; }
  58.1% { background: #828282; }
  66.4% { background: #757575 ; }
  74.7% { background: #6E6E6E ; }
  83% { background: #DEDEDE ; }
  91.3% { background: #D5D5D5; }
  100% { background: #CBCBCB; }
}
@keyframes round_04{
  0% { background: #BDBDBD; }
  8.3%{ background: #B4B4B4; }
  16.6% { background: #ABABAB; }
  24.9% { background: #A1A1A1; }
  33.2% { background: #969696; }
  41.5% { background: #8C8C8C; }
  49.8% { background: #828282; }
  58.1% { background: #757575 ; }
  66.4% { background: #6E6E6E ; }
  74.7% { background: #DEDEDE ; }
  83% { background: #D5D5D5; }
  91.3% { background: #CBCBCB; }
  100% { background: #BDBDBD; }
}
@keyframes round_05{
  0% {  background: #B4B4B4;  }
  8.3%{ background: #ABABAB; }
  16.6% { background: #A1A1A1; }
  24.9% { background: #969696;}
  33.2% { background: #8C8C8C; }
  41.5% { background: #828282;}
  49.8% { background: #757575 ;}
  58.1% { background: #6E6E6E ;}
  66.4% { background: #DEDEDE ;}
  74.7% { background: #D5D5D5;}
  83% { background: #CBCBCB; }
  91.3% { background: #BDBDBD;}
  100% { background: #B4B4B4; }
}
@keyframes round_06{
  0% { background: #ABABAB;  }
  8.3%{ background: #A1A1A1; }
  16.6% {  background: #969696;}
  24.9% { background: #8C8C8C;}
  33.2% { background: #828282;}
  41.5% { background: #757575 ;}
  49.8% { background: #6E6E6E ;}
  58.1% { background: #DEDEDE ;}
  66.4% { background: #D5D5D5;}
  74.7% { background: #CBCBCB; }
  83% { background: #BDBDBD;}
  91.3% { background: #B4B4B4;}
  100% { background: #ABABAB; }
}
@keyframes round_07{
  0% { background: #A1A1A1; }
  8.3%{  background: #969696; }
  16.6% { background: #8C8C8C; }
  24.9% { background: #828282;}
  33.2% {  background: #757575 ;}
  41.5% { background: #6E6E6E ;}
  49.8% { background: #DEDEDE ;}
  58.1% { background: #D5D5D5;}
  66.4% { background: #CBCBCB; }
  74.7% { background: #BDBDBD;}
  83% { background: #B4B4B4;}
  91.3% { background: #ABABAB; }
  100% { background: #A1A1A1;}
}
@keyframes round_08{
  0% { background: #969696; }
  8.3%{ background: #8C8C8C; }
  16.6% { background: #828282; }
  24.9% { background: #757575 ;}
  33.2% { background: #6E6E6E ;}
  41.5% { background: #DEDEDE ;}
  49.8% { background: #D5D5D5;}
  58.1% { background: #CBCBCB; }
  66.4% { background: #BDBDBD;}
  74.7% { background: #B4B4B4;}
  83% { background: #ABABAB;  }
  91.3% { background: #A1A1A1;}
  100% { background: #969696;}
}
@keyframes round_09{
  0% { background: #8C8C8C; }
  8.3%{ background: #828282; }
  16.6% { background: #757575 ; }
  24.9% { background: #6E6E6E ;}
  33.2% { background: #DEDEDE ;}
  41.5% { background: #D5D5D5;}
  49.8% { background: #CBCBCB; }
  58.1% { background: #BDBDBD;}
  66.4% { background: #B4B4B4;}
  74.7% { background: #ABABAB; }
  83% { background: #A1A1A1;}
  91.3% { background: #969696;}
  100% { background: #8C8C8C; }
}
@keyframes round_10{
  0% { background: #828282; }
  8.3%{ background: #757575 ; }
  16.6% { background: #6E6E6E ; }
  24.9% { background: #DEDEDE ; }
  33.2% { background: #D5D5D5; }
  41.5% { background: #CBCBCB; }
  49.8% { background: #BDBDBD; }
  58.1% { background: #B4B4B4; }
  66.4% { background: #ABABAB; }
  74.7% { background: #A1A1A1; }
  83% { background: #969696;}
  91.3% { background: #8C8C8C; }
  100% {background: #828282; }
}
@keyframes round_11{
  0% { background: #757575 ; }
  8.3%{ background: #6E6E6E ; }
  16.6% { background: #DEDEDE ; }
  24.9% { background: #D5D5D5;  }
  33.2% { background: #CBCBCB; }
  41.5% { background: #BDBDBD; }
  49.8% { background: #B4B4B4; }
  58.1% { background: #ABABAB; }
  66.4% { background: #A1A1A1;  }
  74.7% { background: #969696; }
  83% { background: #8C8C8C;  }
  91.3% { background: #828282;  }
  100% { background: #757575 ; }
}
@keyframes round_12{
  0% { background: #6E6E6E ; }
  8.3%{  background: #DEDEDE ;}
  16.6% {  background: #D5D5D5; }
  24.9% {  background: #CBCBCB; }
  33.2% { background: #BDBDBD;  }
  41.5% { background: #B4B4B4; }
  49.8% { background: #ABABAB; }
  58.1% { background: #A1A1A1;}
  66.4% { background: #969696; }
  74.7% { background: #8C8C8C; }
  83% { background: #828282; }
  91.3% {  background: #757575 ;}
  100% { background: #6E6E6E ;}
}
</style>
