<template>
    <div class="profile__quick">
        <h2 class="quick__header">快速建檔</h2>
        <div class="quick__desc">
            <slot>
            </slot>
        </div>
        <div class="quick__inputGroup">
            <div class="inputGroup__nameGroup">
                網站連結
            </div>
            <label class="inputGroup__label">
                <input v-model="state.crawlerUrl" class="label__input" :placeholder="props.placeholder" />
            </label>
            <LazyAtomBtnSimpleV2 class="inputGroup__button" @click="crawlUrlFromPlatform()">一鍵帶入</LazyAtomBtnSimpleV2>
            <!-- <button class="inputGroup__button" @click="crawlUrlFromPlatform()"></button> -->
        </div>
    </div>
</template>
<script setup>
const { $sweet, } = useNuxtApp()
const emit = defineEmits(['click'])
const state = reactive({
    crawlerUrl: ''
})
const props = defineProps({
    placeholder: {
        type: String,
        default: 'www.104.com.tw/companyInfo/*, www.yourator.co/companies/*'
    }
})
function crawlUrlFromPlatform() {
    if (!String(state.crawlerUrl)) {
        $sweet.alert('格式不符')
        return
    }
    emit('click', state.crawlerUrl)
}
</script>
<style lang="scss" scoped>
.profile__quick {
    border-radius: 5px;

    .quick__header {
        color: var(--Grays-Seco, #484848);
        /* H2-20-Regular */
        font-family: "PingFang TC";
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .quick__desc {
        color: var(--Grays-Seco, #484848);
        /* SPAN-14-Regular */
        font-family: "PingFang TC";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        /* 157.143% */
        margin-top: 30px;
    }

    .quick__inputGroup {
        // display: flex;
        gap: 8px;
        margin-top: 10px;

        .inputGroup__nameGroup {
            color: #484848;

            /* P-16-Rugular */
            font-family: "PingFang TC";
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 26px;
            /* 162.5% */

            .nameGroup__required {
                color: #FF3B30;

                /* P-16-Rugular */
                font-family: "PingFang TC";
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: 26px;
                /* 162.5% */
                margin-right: 4px;
            }

            .nameGroup__text {
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.57;
                letter-spacing: normal;
                text-align: left;
                color: #222;
            }
        }

        .inputGroup__label {
            color: #484848;
            padding: 15px 20px;
            border-radius: 10px;
            border: 1px solid var(--Grays-Quat, #EDEAEA);

            /* P-16-Rugular */
            font-family: "PingFang TC";
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 26px;
            width: 100%;
            /* 162.5% */

            :deep(.label__input) {
                border: none;
                width: 100%;

                &:focus {
                    outline: none;
                }

                &::placeholder {
                    color: #d3d3d3;
                }
            }
        }

        .inputGroup__button {
            width: 100%;
            margin-top: 40px;
        }
    }
}
</style>