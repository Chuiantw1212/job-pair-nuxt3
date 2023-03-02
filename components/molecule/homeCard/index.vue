<template>
    <div class="homeCard">
        <template v-if="device.state.isDesktop">
            <img src="./Group899.svg">
            <div class="homeCard__jobPairDesc">
                {{ jobPairDesc }}
            </div>
            <img class="homeCard__crown" src="./Group.svg">
            <div class="homeCard__title">
                {{ title }}
            </div>
            <div class="homeCard__othersDesc">
                {{ othersDesc }}
            </div>
        </template>
        <template v-else>
            <img src="./Group898.svg">
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
        </template>
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

@media screen and (min-width:992px) {
    .homeCard {
        .homeCard__jobPairDesc {
            position: absolute;
            top: 58px;
            right: 110px;
            font-size: 36px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #317292;
            transform: translate(50%, 0%);
            width: fit-content;
        }

        .homeCard__title {
            position: absolute;
            top: 50%;
            left: 451px;
            font-size: 30px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: center;
            color: #fff;
            max-width: 362px;
        }

        .homeCard__crown {
            position: absolute;
            right: -56px;
            top: -24px;
            width: 125.7px;
            height: 114.9px;
        }

        .homeCard__othersDesc {
            position: absolute;
            top: 58px;
            left: 117px;
            font-size: 36px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #317292;
            transform: translate(-50%, 0%);
            width: fit-content;
        }
    }

}
</style>