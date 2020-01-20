<template>
  <div id="app">
    <transition :name="transitionName">
       <router-view class="view app-view"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name: "App",
    data(){
      return{
        transitionName: 'fold-left'
      }
    },
    created() {
      let _metaTitle = this.$route.meta.title;
      document.title = _metaTitle ? _metaTitle :'五四互娱'
    },
    // vue监听路由对象$route的方法
    watch: {
      // watch $route 决定使用哪种过渡
      '$route' (to, from) {
        const routerDeep = ['/', '/excellent','/special','/selection'];
        const toDepth = routerDeep.indexOf(to.path);
        const fromDepth = routerDeep.indexOf(from.path);
        this.transitionName = toDepth > fromDepth ? 'fold-left' : 'fold-right';
      }
    }
  };
</script>
<style lang="less">
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form, 
fieldset,input,textarea,p,blockquote,th,td { 
  margin:0; 
  padding:0; 
}
.app-view{
  .pa();
  width: 100%;
}
.fold-left-enter-active {
  .css3(animation,fold-left-in .3s);
}
.fold-left-leave-active {
  .css3(animation,fold-left-out .3s);
}

.keyframes(fold-left-in,{
  0% {
    .css3(transform,translate3d(100%, 0, 0));
  }
  100% {
    .css3(transform,translate3d(0, 0, 0));
  }
});
.keyframes(fold-left-out,{
  0% {
    .css3(transform,translate3d(0, 0, 0));
  }
  100% {
    .css3(transform,translate3d(-100%, 0, 0));
  }
});

.fold-right-enter-active {
  .css3(animation,fold-right-in .3s);
}
.fold-right-leave-active {
  .css3(animation,fold-right-out .3s);
}

.keyframes(fold-right-in,{
  0% {
    width: 100%;
    .css3(transform,translate3d(-100%, 0, 0));
  }
  100% {
    width: 100%;
    .css3(transform,translate3d(0, 0, 0));
  }
});
.keyframes(fold-right-in,{
  0% {
    width: 100%;
    .css3(transform,translate3d(-100%, 0, 0));
  }
  100% {
    width: 100%;
    .css3(transform,translate3d(0, 0, 0));
  }
});
.keyframes(fold-right-out,{
  0% {
    width: 100%;
    .css3(transform,translate3d(0, 0, 0));
  }
  100% {
    width: 100%;
    .css3(transform,translate3d(100%, 0, 0));
  }
});
</style>
