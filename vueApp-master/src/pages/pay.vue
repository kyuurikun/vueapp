<template>
  <div class="pay-tool">
    <div class="pay-tool-title border-bottom">
      <span class="icon icon-back"></span><strong>请输入交易密码</strong>
      <span style="float:right;margin-right:2rem;font-size: 1rem;line-height: 1.5rem;margin-left:-2rem;" @click="hello">x</span>
    </div>
    <div class="pay-tool-content">
      <div class="pay-tool-inputs">
        <div class="item" v-for="(index,i) in items">
        		<span v-show="Span>index-1">●</span>
        </div>
      </div>
    </div>
    <div class="pay-tool-keyboard">
      <ul>
        <li @click="keyUpHandle($event,index)" v-for="val in keys">
          {{ val }}
        </li>
        <li class="del" @click="delHandle"><span class="icon-del"></span></li>
      </ul>
    </div>
  </div>
</template>
<script>
  const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
  // let sendFlag = true // 防止重复发送密码
  export default {
    data () {
      return {
        items: [0, 1, 2, 3, 4, 5],
        keys: keys(),
       	Span:-1,
        password: []
      }
    },
    methods: {
    	hello(){
    		  this.$emit('change-type');
    	},
      keyUpHandle (e) {
        let text = e.currentTarget.innerText
        let len = this.password.length
        if (!text || len >= 6) return
        this.password.push(text)
        this.Span=len;
        this.ajaxData()
     	},
      delHandle () {
        if (this.password.length <= 0) return false
        this.password.shift()
        this.Span--;
      },
      ajaxData () {
        if (this.password.length >= 6) {
          console.log(parseInt(this.password.join(' ').replace(/\s/g, '')));
        }
        return false
      },
      clearPasswordHandle: function () {
        this.password = []
      }
    }
  }
</script>
 
<style lang="scss" scoped>
  .pay-tool {
    position: relative;
    height: 18.93333333rem;
    background-color: #fff;
    overflow: hidden;
    &-title {
      width: 100%;
      height: 2.08888888rem;
      padding: 0 0.8rem;
      line-height: 2.08888888rem;
      text-align: center;
      overflow: hidden;
      .icon {
        float: left;
        margin-top: 0.72222222rem;
      }
      strong {
        font-size: 0.8rem;
      }
    }
    &-content {
      .pay-tool-inputs {
        width: 14.46666666rem;
        height: 2.31111111rem;
        margin: 1.28888888rem auto 0;
        border: 1px solid #b9b9b9;
        border-radius: 0.26666666rem;
        box-shadow: 0 0 1px #e6e6e6;
        display: flex;
        .item {
          width: 16.66666666%;
          height: 2.31111111rem;
          border-right: 1px solid #b9b9b9;
          line-height: 2.31111111rem;
          text-align: center;
          &:last-child {
            border-right: none;
          }
          .icon_dot {
            display: inline-block;
            width: 0.51111111rem;
            height: 0.51111111rem;
           /* background: url("../../assets/images/icon_dot.png") no-repeat;*/
            background-size: cover;
          }
        }
      }
 
    }
    .pay-tool-keyboard {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 33%;
          height: 2.25442834rem;
          line-height: 2.25442834rem;
          text-align: center;
          border-right: 1px solid #aeaeae;
          border-bottom: 1px solid #aeaeae;
          font-size: 0.8rem;
          font-weight: bold;
          &:nth-child(1), &:nth-child(2), &:nth-child(3) {
            border-top: 1px solid #eee;
          }
          &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
            border-right: none;
          }
          &:nth-child(10), &:nth-child(11), &:nth-child(12) {
            border-bottom: none;
          }
          &:nth-child(10), &:nth-child(12), &:active {
            background-color: #d1d4dd;
          }
          &:nth-child(12):active {
            background-color: #fff;
          }
        }
      }
    }
  }
</style>