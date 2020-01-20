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
                <h2>请选出您心中的最佳着装（每人一票）</h2>
            </div>
            <div class="menu-container">
                <div class="menu-list">
                    <dl v-for="(item,index) in userData" :key="index"  :class="{'current':num==index}" @click="getActor(item,index)">
                        <dt><img v-lazy="item.img" :alt="item.name"/></dt>
                        <dd>{{item.name}}</dd>
                        <dd><span></span>投TA一票</dd>
                    </dl>
                </div>
            </div>
            <div class="foot">
                <button class="btn" @click="sendSelectActor">确认投票</button>
            </div>
        </div>
    </div>
</template>
<script>
    import ComHeader from "@/components/ComHeader";
    import {mapState,mapActions,mapMutations,mapGetters} from 'vuex';
    export default {
        name:"excellent",
        data(){
            return {
                num:0,
                value:'-1',
                name:''
            }
        },
        components:{
           ComHeader
        },
        computed:{
            ...mapState('   ',['userData'])
        },
       async mounted(){
            await this.getAllActor();
        },
        methods: {
            ...mapActions('excellent',['getAllActor','vote']),
            getActor(item,index){
                this.num = index;
                this.value = item.id;
                this.name = item.name;
            },
            sendSelectActor(){
                let name = this.name?this.name:this.userData[0].name,
                    receiveUserId = this.value!=='-1'?this.value:this.userData[0].id;
                let params = {
                    type    : 1,
                    receive_user_id : receiveUserId
                };
                this.$messageBox.confirm(`确认将“全场最佳着装”<br>投票给“${name}”吗？`).then(action => {
                    if(action==="confirm"){
                        this.vote(params).then(res=>{
                            if(res.error_code===0){
                                this.$messageBox.alert('已经完成投票，请耐心等待结果');
                                return false;
                            }else{
                                this.$messageBox.alert(res.error_reason);
                                return false;
                            }
                        });
                    }
                },() => {});
            },
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
      padding: 0 2% 60px;
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
             transition: all .25s;
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
                     vertical-align: middle;
                    &:after{
                        content: " ";
                        border-radius: 100%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 8px;
                        height: 8px;
                        margin: -4px 0 0 -4px;
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
     }
  }
  .foot{
      .pf();
      left: 0;
      bottom: 0;
      width: 100%;
      height: 36px;
      text-align: center;
      button{
          display: block;
          margin: 0 auto;
          border-radius: 6px;
          width:96%;
          height: 36px;
          .fs(16px,#fff);
          background-color: #26a2ff;
      }
  }
</style>