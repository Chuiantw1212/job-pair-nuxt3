<template>
    <div class="banner">
        <div class="banner__body">
            <!-- <LazyAtomInputCkeditorInline v-model="controllable.welcome.html">
            </LazyAtomInputCkeditorInline> -->
            <LazyAtomInputCkeditorInline v-model="controllable.title.html">
            </LazyAtomInputCkeditorInline>
            <LazyAtomInputCkeditorInline v-model="controllable.desc.html">
            </LazyAtomInputCkeditorInline>
            <AtomBtnSimple class="body__btn">
                查看所有職缺
            </AtomBtnSimple>
        </div>
        <div class="banner__imageWrap">
            <img src="./Image.webp">
        </div>
    </div>
</template>
<script>
export default {
    name: 'banner2',
}
</script>
<script setup>
const controllable = reactive({
    title: {
        html: '<p><span style="font-size:60px;"><strong>找工作就像談戀愛</strong></span></p>'
    },
    desc: {
        html: '<p><span style="font-size:18px;">快來配對屬於自己的職缺</span></p>'
    }
})
</script>
<style lang="scss">
.banner {
    display: flex;
    justify-content: space-evenly;
    background-color: #e5e5e5;
    align-items: center;
    padding: 96px 0px;

    .banner__body {
        .body__btn {
            margin-top: 30px;
            margin-left: 10px;
        }
    }

    .banner__imageWrap {
        border-radius: 20px;
        overflow: hidden;
    }
}
</style>