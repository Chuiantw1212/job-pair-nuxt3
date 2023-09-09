<template>
    <div class="columns" :style="{ 'background-image': `url(${image})` }">
        <!-- <h2>公司福利</h2> -->
        <div class="columns__body">
            <LazyAtomInputCkeditorInline v-model="controllable.title.html">
            </LazyAtomInputCkeditorInline>
            <LazyAtomInputCkeditorInline v-model="controllable.desc.html" :toolbar="state.toolbar">
            </LazyAtomInputCkeditorInline>
        </div>
        <!-- <img src="./Group.webp" /> -->
    </div>
</template>
<script setup>
import image from './Group.webp'
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
<style lang="scss">
.columns {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: contain;
}


@media screen and (min-width: 992px) {
    .columns {
        flex-direction: row;
        justify-content: space-evenly;
        background-size: contain;

        .columns__body {
            display: flex;
            align-items: center;
            gap: 100px;
        }
    }
}
</style>