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
                <h2>请给您喜欢的节目投上一票</h2>
                <p>（每人只能选择一个奖项投出一票）</p>
            </div>
            <div class="selection-container">
                <div class="select-list">
                    <h2>请选择您要投票的奖项类型</h2>
                    <label>
                        <select v-model="selectedType" >
                            <option :value="item.id" v-for="(item,index) in selectType" :key="index">{{item.value}}</option>
                        </select>
                    </label>
                </div>
                <div class="select-list">
                    <h2>请选择您要投票的节目</h2>
                    <label>
                        <select v-model="selectedMenu">
                            <option :value="item.id" v-for="(item,index) in selectMenu" :key="index">{{item.name}}</option>
                        </select>
                    </label>
                </div>
            </div>
            <div class="select-info">
                <h2>普通员工投票每人为1票，专业评委每人投票为10票，<br/>最终解释权归组委会所有~</h2>
                <p>优胜节目剧组将获得特别奖品</p>
            </div>
            <div class="foot">
                <button class="btn" @click="sendSelectActor">确认投票</button>
            </div>
        </div>
    </div>
</template>
<script>
    import ComHeader from "@/components/ComHeader";
    import { mapState,mapMutations,mapActions,mapGetters } from 'vuex';
    export default {
        name:"selection",
        data(){
            return {
                selectedType:'',
                selectedMenu:''
            }
        },
        computed:{
            ...mapState('selection',['selectType','selectMenu'])
        },
        components:{
           ComHeader
        },
        mounted(){
            this.getAllMenus().then(res=>{
                this.selectedType = res.type[0].id;
                this.selectedMenu = res.program[0].id;
            });
        },
        methods: {
            ...mapActions('selection',['getAllMenus','vote']),
            sendSelectActor(){
               let params = {
                   type:this.selectedType,
                   receive_user_id: this.selectedMenu
               };
               let mType = '',
                   mMenu = '';
                this.selectType.map(item=>{
                   if(item.id===this.selectedType) {
                       mType = item.value
                   }
                });
                this.selectMenu.map(item=>{
                   if(item.id===this.selectedMenu) {
                       mMenu = item.name;
                   }
                });
                this.$messageBox.confirm(`确认将“${mType}”<br>投给“${mMenu}”吗？`).then(action => {
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
                },()=>{});
            }
        }
    }
</script>
<style lang="less" scoped>
    .container{
        padding: 40px 0;
    }
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
  .selection-container{
      padding: 12px;
      .select-list{
          padding-bottom: 24px;
          h2{
              .fs(16px,#333);
              text-align: center;
          }
          select{
              width: 100%;
              border: 1px solid #d7dde4;
              padding: 6px;
              background: #d7dde4;
              border-radius: 4px;
              .fs(14px,#333);
          }
      }
  }
  .select-info{
      padding: 24px 0;
      text-align: center;
      h2{
          .fs(14px,#333);
      }
      p{
          .fs(12px,#666);
          padding: 6px 0;
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