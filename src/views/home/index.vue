<template>
    <div>
        <div class="container">
            <ComHeader 
               title="五四互娱2020年会投票"
            />
            <div class="banner">
                <img src="../../assets/images/banner.jpg" class="m-img" alt="">
            </div>
            <div class="vote-time">
                <h2>请选择您希望参与的投票</h2>
                 <p>（投票时间{{startTime}}-{{endTime}}）</p>
            </div>
            <div class="route-container">
                <router-link :to="item.path" v-for="(item,index) in routeData" :key="index">
                    <button class="btn" type="primary">{{item.name}}</button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import {get} from '../../http';
    import ComHeader from "@/components/ComHeader";
     export default {
        name:"home",
        data(){
            return {
                routeData:[
                    {name:'全场最优着装',path:'/excellent'},
                    {name:'全场最个性着装',path:'/special'},
                    {name:'年会节目评选',path:'/selection'}
                ],
                startTime:'',
                endTime :''
            }
        },
        components:{
            ComHeader
        },
        mounted(){
            get('/api/vote/getActivityTime').then(res=>{
                if(res.error_code===0){
                    this.startTime = res.start_time;
                    this.endTime = res.end_time;
                }else{
                    this.$messageBox(res.error_reason);
                }
            })
        },
        methods: {
        }
    }
</script>
<style lang="less" scoped>
   .container{
       padding-top:30px;
   }
  .vote-time{
      text-align: center;
      padding: 6px 0;
      border-bottom: 1px solid #ccc;
      h2{
          .fs(18px,#333);
      }
      p{
          .fs(14px,#333)
      }
  }
  .route-container{
      padding: 12px;
      button{
          width: 100%;
          margin-top: 40px
      }
  }
  .btn{
        display: block;
        margin: 0 auto;
        border-radius: 6px;
        width:96%;
        height: 36px;
        .fs(16px,#fff);
        background-color: #26a2ff;
  }
</style>