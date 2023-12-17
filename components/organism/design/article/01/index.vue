<template>
    <div v-if="localValue.controllable" class="columns">
        <template v-if="readonly">
            <div class="columns__body" :style="{
                'background-image': `url(${localValue.controllable.background.url})`,
                'background-position': localValue.controllable.background.position,
                'background-size': localValue.controllable.background.size,
                'background-repeat': 'no-repeat'
            }">
                <div v-html="localValue.controllable.title.html" class="body__title"></div>
                <div v-html="localValue.controllable.desc.html" class="body__desc"></div>
            </div>
        </template>
        <template v-else>
            <AtomDesignBackground class="columns__body" v-model="localValue.controllable.background"
                @remove="emit('remove')" @moveUp="emit('moveUp')" @moveDown="emit('moveDown')">
                <LazyAtomInputCkeditorInline class="body__title" v-model="localValue.controllable.title.html"
                    :toolbar="state.titleToolbar">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline class="body__desc" v-model="localValue.controllable.desc.html">
                </LazyAtomInputCkeditorInline>
            </AtomDesignBackground>
        </template>
    </div>
</template>
<script setup>
const repoOrganizationDesign = useRepoOrganizationDesign()
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const emit = defineEmits(['update:modelValue', 'remove', 'moveUp', 'moveDown'])
const state = reactive({
    titleToolbar: [
        'bold',
        'fontColor',
    ],
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'ARTICLE01',
            }
        }
    },
    readonly: {
        type: Boolean,
        default: false
    }
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
watch(() => localValue.value, (newValue) => {
    if (newValue.controllable) {
        return
    }
    const { company = {} } = repoAuth.state
    const { jobBenefits = '暫不公開' } = company
    const defaultValue = {
        name: 'ARTICLE01',
        controllable: {
            title: {
                html: '<p><span><strong>公司福利</strong></span></p>'
            },
            desc: {
                html: jobBenefits
            },
            background: {
                url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Group.webp',
                size: 'contain',
            }
        }
    }
    const mergedItem = Object.assign(defaultValue, newValue)
    localValue.value = mergedItem

}, { immediate: true })
</script>
<style lang="scss" scoped>
.columns {

    .columns__body {
        background-repeat: no-repeat;
        background-position: bottom right;
        background-size: contain;
        background-color: white;
        align-items: center;
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .body__title {
            font-size: 20px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
        }

        .body__desc {
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.42;
            letter-spacing: normal;
        }
    }
}


@media screen and (min-width: 992px) {
    .columns {
        flex-direction: row;
        justify-content: space-evenly;
        background-size: contain;

        .columns__body {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
            gap: 100px;

            .body__title {
                font-size: 36px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
            }

            .body__desc {
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.42;
                letter-spacing: normal;
            }
        }
    }
}
</style>