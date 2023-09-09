<template>
    <div class="bullet">
        <!-- <h2>公司福利</h2> -->
        <LazyAtomInputCkeditorInline v-model="controllable.title.html">
        </LazyAtomInputCkeditorInline>
        <LazyAtomInputCkeditorInline v-model="controllable.desc.html" :toolbar="state.toolbar">
        </LazyAtomInputCkeditorInline>
    </div>
</template>
<script setup>
const controllable = reactive({
    title: {
        html: '<p><span style="color:hsl( 163, 60%, 41% );font-size:36px;"><strong>公司福利</strong></span></p>'
    },
    desc: {
        html: '<ul><li><span style="font-size:24px;">彈性自由的工作環境</span></li><li><span style="font-size:24px;">優於勞基法的休假制度</span></li><li><span style="font-size:24px;">每月NT1,000學習補貼，鼓勵員工主動學習</span></li><li><span style="font-size:24px;">三節禮金</span></li></ul>'
    }
})
const state = reactive({
    toolbar: [
        // 'undo',
        // 'redo',
        // '|',
        // 'heading',
        // '|',
        'fontSize',
        '|',
        'bold',
        // 'italic',
        'fontColor',
        // '|',
        // 'link',
        // 'mediaEmbed',
        '|',
        // 'alignment',
        'bulletedList',
        'numberedList',
        // '|',
        // 'removeFormat'
    ]
})
</script>
<style lang="scss" scoped>
.bullet {
    display: flex;
    align-items: center;
    flex-direction: column;
}


@media screen and (min-width: 992px) {
    .bullet {
        flex-direction: row;
        justify-content: space-evenly;
    }
}
</style>