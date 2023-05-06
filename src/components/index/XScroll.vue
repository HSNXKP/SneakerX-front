<template>
    <div v-size-ob="handleChange" class="scroll-container">
        <div class="v-scroll">

        </div>
        <slot>

        </slot>
    </div>
 
</template>

<script>
export default {
    name: "XScroll",
    data() {
        s:{
            w:0;
            h:0;
        }
    },
    watch: {

    },
    created() {
        
    },
    methods: {
        handleChange(size){
            s.w = size.width;
            s.h = size.height;
            console.log(size)
        }
    },
}
</script>

<style scoped>
.scroll-container{
    outline: 4px solid red;
    width: 100%;
    height: 100%;
}

.v-scroll{
    
}
</style>