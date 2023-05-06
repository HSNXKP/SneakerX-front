<template>
  <div class="demo"> 
    <div class="container">
        <XScrool>
            <div class="card-list">
                <div class="card">
                    <imag src="https://cdn.staticaly.com/gh/HSNXKP/imgSnkers@master/img/SneakerBlog-1-1200x800.jpg" />
                </div>
                <div class="card">
                    <imag src="https://cdn.staticaly.com/gh/HSNXKP/imgSnkers@master/img/COllectiblesblog-1-1200x800.jpeg" />
                </div>
                   <div class="card">
                    <imag src="https://cdn.staticaly.com/gh/HSNXKP/imgSnkers@master/img/swblog-1-1200x800.png'" />
                </div>
            </div>
        </XScrool>
    </div>
  </div>
</template>

<script>
import XScrool from "@/components/index/XScroll.vue";

export default {
    name: "Demo",
    components: {
        XScrool
    },
    props: {
    },
}
</script>

<style>

</style>