<template>
    <div>
        <h1>Thank You for Shopping</h1>
        <a @click="continueshopping()" class="continueshopping_wrapper" style="color:white">Continue Shopping</a>
    </div>
</template>
<script>
export default {
    props:["fblogin"],
    name:'Thank You',
    methods:{
        continueshopping:function(){
           this.$router.replace("/") 
        }
    },
}
</script>
<style scoped>
.continueshopping_wrapper{
        background: rgb(50, 156, 146); 
        letter-spacing: 2px;
        display:block;
        padding:8px 0;
        color:#fff;
        text-decoration:none;
        margin:13px auto;
        cursor:pointer;
        width:300px;
        text-align:center;
        float:left;
        font-size:15px
}
</style>