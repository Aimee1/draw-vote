<template>
    <div>
        <div class="container">
            <ComHeader 
               title="五四互娱2020年会投票"
            />
            <div class="login-form">
                <ul>
                    <li><label><span>用户名：</span><input type="text" v-model="account"  @keyup.enter="handleLogin" placeholder="请输入您的OA账号"></label></li>
                    <li><label><span>密码：</span><input type="password" v-model="pwd" @keyup.enter="handleLogin" placeholder="请输入您的OA密码"></label></li>
                </ul>
            </div>
            <button class="btn" @click="handleLogin" :disabled="isDisable">登录</button>
        </div>
    </div>
</template>
<script>
    import ComHeader from "@/components/ComHeader";
    import {mapState,mapGetters,mapActions,mapMutations} from 'vuex';
     export default {
        name:"login",
        data(){
            return {
                account:'',
                pwd:'',
                isDisable: false
            }
        },
        components:{
            ComHeader
        },
        mounted(){

        },
        methods: {
            ...mapActions('login',['userLogin']),
            handleLogin(){
                this.isDisable = true;
                setTimeout(()=>{
                    this.isDisable = false;
                },1000);
                if(this.account === ''　&&　this.pwd === ''){
                    this.$toast({
                        message: '请输入完成信息',
                        duration: 1000
                    });
                    return false;
                }else　if(this.account === ''){
                    this.$toast({
                        message: '请输入您的OA账号',
                        duration: 1000
                    });
                    return false;
                }else if(this.pwd === ''){
                    this.$toast({
                        message: '请输入您的OA密码',
                        duration: 1000
                    });
                    return false;
                }
                let params={
                    username:this.account,
                    password:this.pwd
                };
                this.userLogin(params).then(res=>{
                    if(res.error_code===0){
                        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                        this.$router.push({
                            path: redirect
                        });
                    }else{
                        this.$toast({
                            message: res.error_reason,
                            duration: 1000
                        });
                        return false;
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
   .container{
       padding-top:30px;
   }
   .btn{
       display: block;
       margin:24px auto 0;
       border-radius: 6px;
       width:96%;
       height: 36px;
       .fs(16px,#fff);
       background-color: #26a2ff;
   }
   .login-form{
       padding: 2%;
       li{
           margin-top: 24px;
           border: 1px solid #efefef;
           border-radius: 6px;
           label{
               display: block;
               width: 100%;
               .lh(40px);
           }
           span{
               display: inline-block;
               vertical-align: super;
               width: 60px;
               .fs(14px,#333);
               text-align: right;
           }
           input{
               display: inline-block;
               vertical-align:super;
               width: 80%;
               .lh(20px);
               padding: 10px 0;
               .fs(14px,#333);
               background: none;
           }
       }
   }
</style>