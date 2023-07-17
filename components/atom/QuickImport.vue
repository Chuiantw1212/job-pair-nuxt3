<template>
    <div class="profile__quick">
        <h1 class="quick__header">快速建檔</h1>
        <div class="quick__desc">
            <slot>
            </slot>
        </div>
        <div class="quick__inputGroup">
            <label class="inputGroup__label">
                <input v-model="state.crawlerUrl" class="inputGroup__url" :placeholder="props.placeholder" />
            </label>
            <button class="inputGroup__button" @click="crawlUrlFromPlatform()">一鍵帶入</button>
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
<style lang="scss">
.profile__quick {
    background-color: #fee997;
    padding: 24px 32px;
    border-radius: 5px;
    margin-bottom: 45px;

    .quick__header {
        font-size: 28px;
        font-weight: bold;
    }

    .quick__desc {
        font-size: 12px;
        margin-bottom: 16px;
    }

    .quick__inputGroup {
        display: flex;
        gap: 8px;

        .inputGroup__label {
            padding: 12px 16px;
            width: 100%;
            background-color: white;
            border-radius: 10px;

            .inputGroup__url {
                width: 100%;
                border: none;

                &:focus {
                    outline: none;
                }
            }
        }

        .inputGroup__button {
            padding: 12px 16px;
            background-color: #29b0ab;
            color: white;
            border-radius: 10px;
            white-space: nowrap;
            border: none;
        }
    }
}
</style>