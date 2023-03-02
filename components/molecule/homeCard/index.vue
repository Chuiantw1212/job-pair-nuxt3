<template>
    <div class="homeCard">
        <template v-if="device.state.isDesktop">
            <img src="./Group899.svg">
        </template>
        <template v-else>
            <img src="./Group898.svg">
        </template>
        <div class="homeCard__jobPair">
            Job Pair
        </div>
        <div class="homeCard__jobPairDesc">
            {{ jobPairDesc }}
        </div>
        <img class="homeCard__crown" src="./Group.svg">
        <div class="homeCard__title">
            {{ title }}
        </div>
        <div class="homeCard__others">
            一般求職平台
        </div>
        <div class="homeCard__othersDesc">
            {{ othersDesc }}
        </div>
        <!-- <template v-else>
            <div class="homeCard__jobPair">
                Job Pair
            </div>
            <div class="homeCard__">
                {{ jobPairDesc }}
            </div>
            <img src="./Group898.svg">
            <div>
                一般求職平台
            </div>
            <div>
                {{ othersDesc }}
            </div>
        </template> -->
    </div>
</template>
<script setup>
const device = useDevice()
const props = defineProps({
    jobPairDesc: {
        type: String,
        default: '有'
    },
    othersDesc: {
        type: String,
        default: '無'
    },
    title: {
        type: String,
        default: ''
    }
})
</script>
<style lang="scss">
.homeCard {
    position: relative;
    width: fit-content;

    .homeCard__jobPair {
        position: absolute;
        top: 20px;
        left: 81px;
        font-size: 14px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #317292;
    }

    .homeCard__jobPairDesc {
        position: absolute;
        top: 15px;
        right: 46px;
        font-size: 18px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #317292;
    }

    .homeCard__title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 197px;
        font-size: 16px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        color: #fff;
    }

    .homeCard__crown {
        position: absolute;
        right: -16px;
        top: 0px;
        width: 55.1px;
        height: 50.4px;
    }

    .homeCard__others {
        position: absolute;
        bottom: 17px;
        left: 72px;
        font-size: 14px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #317292;
    }

    .homeCard__othersDesc {
        position: absolute;
        right: 68px;
        bottom: 15px;
        font-size: 18px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        color: #317292;
    }
}
</style>