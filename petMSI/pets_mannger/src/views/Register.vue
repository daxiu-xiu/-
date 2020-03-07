<template>
    <div>
        <div v-if="status">
            <registeredadministrator :title="title[0]" :status="status"/>
        </div>
        <div v-else>
                  <registeredbusinesses :title="title[1]" :status="status"/>
         </div>

         <!-- <hh/> -->
                
    </div>
</template>

<script>
// 引入组件
import registeredadministrator from "../components/registeredadministrator/registeredadministrator";
import registeredbusinesses from "../components/registeredbusinesses/registeredbusinesses";
// import hh from "../components/head/head"
//引入辅助函数
import {createNamespacedHelpers} from "vuex";
const {mapState} = createNamespacedHelpers("register")

    export default {
       components:{
           registeredadministrator,
           registeredbusinesses,
        //    hh
       },
       computed:{
             ...mapState(["title","status"])
       },
       mounted(){
        //    console.log(this.status)
       }
    }
</script>

<style lang="scss" scoped>

</style>