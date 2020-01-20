<template>
    <div>
        <div class="container">
            <ComHeader 
               url="/"
               title="五四互娱2020年会投票"
            />
            <div class="banner">
                <img src="../../assets/images/banner.jpg" class="m-img" alt="">
            </div>
            <div class="vote-time">
                <h2>投票时间已结束</h2>
                <p>投票结果如下：</p>
            </div>
            <div class="menu-container">
                <div class="menu-list" v-if="rankData.zy">
                    <h2>本场最优着装奖：</h2>
                    <dl v-for="(item,index) in rankData.zy" :key="index">
                        <dt><img v-lazy="item.img" :alt="item.name"></dt>
                        <dd>{{item.name}}-{{item.score}}票</dd>
                    </dl>
                </div>
                <div class="menu-list" v-if="rankData.gx">
                    <h2>本场最个性着装奖：</h2>
                    <dl v-for="(item,index) in rankData.gx" :key="index">
                        <dt><img v-lazy="item.img" :alt="item.name"></dt>
                        <dd>{{item.name}}-{{item.score}}票</dd>
                    </dl>
                </div>
                <div class="menu-list" v-if="rankData.rq && rankData.by && rankData.td && rankData.cy">
                    <h2>优秀节目奖：</h2>
                    <ul>
                        <li>最佳人气奖：{{rankData.rq.name}}--{{rankData.rq.score}}票</li>
                        <li>最佳表演奖：{{rankData.by.name}}--{{rankData.by.score}}票</li>
                        <li>最佳团队奖：{{rankData.td.name}}--{{rankData.td.score}}票</li>
                        <li>最佳才艺奖：{{rankData.cy.name}}--{{rankData.cy.score}}票</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ComHeader from "@/components/ComHeader";
    import {mapGetter,mapActions,mapState,mapMutations} from 'vuex';
    export default {
        name:"result",
        data(){
            return {
                num:0,
                value:'-1'
            }
        },
        components:{
           ComHeader
        },
        computed:{
            ...mapState('result',['rankData'])
        },
        mounted(){
           this.getResult();

        },
        methods: {
            ...mapActions('result',['getRank']),
            getResult(){
                this.getRank();
            }
        }
    }
</script>
<style lang="less" scoped>
  .vote-time{
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      h2{
          .fs(18px,#333);
      }
      p{
          .fs(14px,#333)
      }
  }
  .menu-container{
      padding: 0 2% 20px;
      h2{
          .fs(18px,#333);
          text-align: center;
          padding-top: 16px;
      }
     .menu-list{
         overflow: hidden;
         dl{
             width: 30%;
             text-align: center;
             border: 1px solid #efefef;
             border-radius: 4px;
             overflow: hidden;
             cursor: pointer;
             padding-top: 130px;
             .pr();
             margin: 12px 1.666% 0;
             float: left;
             box-sizing: border-box;
             &.current{
                 border: 1px solid #26a2ff;
                 box-shadow: 0 0 10px #26a2ff;
                 dd{
                     span{
                         background-color: #26a2ff;
                         border-color: #26a2ff;
                         &:after{
                             background-color: #fff;
                             -webkit-transform: scale(1);
                             transform: scale(1);
                         }
                     }
                 }
             }
             img{
                 height: 120px;
                 .pa();
                 left: 50%;
                 top: 0;
                 .css3(transform,translate(-50%));
             }
             dd{
                 .fs(14px,#333);
                 padding-bottom: 6px;
                 span{
                    box-sizing: border-box;
                    display: inline-block;
                    background-color: #fff;
                    border-radius: 100%;
                    border: 1px solid #ccc;
                    position: relative;
                    width: 16px;
                    height: 16px;
                    margin: 0 6px;
                    display: inline-block;
                    vertical-align: middle;
                    &:after{
                        content: " ";
                        border-radius: 100%;
                        top: 3px;
                        left: 3px;
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        -webkit-transition: -webkit-transform .2s;
                        transition: -webkit-transform .2s;
                        transition: transform .2s;
                        transition: transform .2s,-webkit-transform .2s;
                        -webkit-transform: scale(0);
                        transform: scale(0);
                    }
                 }
             }
         }
         ul{
             li{
                 padding-top: 16px;
                 .fs(14px,#333);
                 text-align: left;
             }
         }
     }
  }
</style>