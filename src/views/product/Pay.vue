<template>
<div>
   <div class="ui top attached segment" style="text-align: center">
           <h2 class="m-text-500">SneakerX支付系统</h2>
    </div>
       <div class="ui attached segment m-padding-bottom-large">
           s s s 测试
        </div>
 </div>
</template>

<script>
export default {
   name: "Pay",
   data(){
       return{
       }
   },
   created() {
   },
   computed: {
     orderNumber(){
       return this.$route.params.orderNumber
     }
   },
   methods: {
   }
}
</script>

<style>

</style>