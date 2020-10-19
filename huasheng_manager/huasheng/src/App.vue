<template>
  <div id="app" @click="show">
      <loading v-show="bLoading"></loading>   
        <navbar ref="children" :showValue="showValue"></navbar>

    <div class="all-content">
    <footbar v-show="bFoot" ></footbar>
        <transition
          enter-active-class="animated fadeIn"
        >
          <router-view></router-view>
        </transition>

    </div>



   
  </div>
</template>

<script>

import navbar from './components/navbar'
import footbar from './components/footbar'
import { mapGetters} from 'vuex';
// import { constants } from 'http2';

export default {
  name: 'App',
    data(){
    return{
      showValue:false
      
    }
  },
  methods:{
    show(){
      console.log("111111111111")
      this.$refs.children.say();
    }
  },
  components:{
    navbar,footbar
  },
    computed:mapGetters([
    'bFoot',"bLoading"
  ]),

  created(){

  }

  
}
</script>
<style scoped>
#app{ 
  display: flex;
  flex-direction: column;
}
.all-content{
  display: flex;
  flex: 1;
}
</style>





