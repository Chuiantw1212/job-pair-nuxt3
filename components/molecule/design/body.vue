<template>
    <div>
        <template v-for="(item, index) in localValue" :key="index">
            <!-- Banner式 -->
            <MoleculeDesignBanner01 v-if="item.name === 'BANNER01'" v-model="localValue[index]">
            </MoleculeDesignBanner01>
            <MoleculeDesignBanner02 v-if="item.name === 'BANNER02'" v-model="localValue[index]">
            </MoleculeDesignBanner02>
            <!-- 圖文混合 -->
            <MoleculeDesignHybrid01 v-if="item.name === 'HYBRID01'" v-model="localValue[index]">
            </MoleculeDesignHybrid01>
            <MoleculeDesignHybrid02 v-if="item.name === 'HYBRID02'" v-model="localValue[index]">
            </MoleculeDesignHybrid02>
            <!-- 短文 -->
            <MoleculeDesignArticle01 v-if="item.name === 'ARTICLE01'" v-model="localValue[index]">
            </MoleculeDesignArticle01>
            <!-- 條列式 -->
            <MoleculeDesignList01 v-if="item.name === 'LIST01'" v-model="localValue[index]">
            </MoleculeDesignList01>
            <MoleculeDesignList02 v-if="item.name === 'LIST02'" v-model="localValue[index]">
            </MoleculeDesignList02>
            <!-- 投影片式 -->
            <MoleculeDesignSlide01 v-if="item.name === 'SLIDE01'" v-model="localValue[index]">
            </MoleculeDesignSlide01>
        </template>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
        }
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
</script>