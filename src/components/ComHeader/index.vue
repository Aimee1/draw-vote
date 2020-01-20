<template>
    <div class="header">
        <router-link v-if="url" :to="url"> <span class="back"></span></router-link>
        {{title}}
    </div>
</template>
<script>
    export default {
        name:'Header',
        props:{
            url:{
                type:String,
                default:''
            },
            title:{
                type:String,
                default:'投票'
            },
        }
    }
</script>
<style lang="less">
  .header{
      .pf();
      width: 100%;
      .lh(40px);
      background: #26a2ff;
      left: 0;
      top: 0;
      z-index: 99;
      .fs(18px,#fff);
      text-align: center;
      .back{
          .pa();
          left: 10px;
          cursor: pointer;
          width: 24px;
          height: 36px;
          .fs(14px,#fff);
          background: url("../../assets/images/back.png") no-repeat center;
          background-size: 100% auto;
      }
  }
</style>