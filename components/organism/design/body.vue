<template>
    <div>
        <template v-for="(item, index) in localValue" :key="index">
            <!-- Banner式 -->
            <OrganismDesignBanner01 v-if="item.name === 'BANNER01'" v-model="localValue[index]" :readonly="readonly">
            </OrganismDesignBanner01>
            <OrganismDesignBanner02 v-if="item.name === 'BANNER02'" v-model="localValue[index]" :readonly="readonly">
            </OrganismDesignBanner02>
            <!-- 圖文混合 -->
            <OrganismDesignHybrid01 v-if="item.name === 'HYBRID01'" v-model="localValue[index]" :readonly="readonly">
            </OrganismDesignHybrid01>
            <OrganismDesignHybrid02 v-if="item.name === 'HYBRID02'" v-model="localValue[index]" :readonly="readonly">
            </OrganismDesignHybrid02>
            <!-- 短文 -->
            <OrganismDesignArticle01 v-if="item.name === 'ARTICLE01'" v-model="localValue[index]" :readonly="readonly">
            </OrganismDesignArticle01>
            <!-- 條列式 -->
            <OrganismDesignList01 v-if="item.name === 'LIST01'" v-model="localValue[index]" :readonly="readonly">
            </OrganismDesignList01>
            <OrganismDesignList02 v-if="item.name === 'LIST02'" v-model="localValue[index]" :readonly="readonly">
            </OrganismDesignList02>
            <!-- 投影片式 -->
            <OrganismDesignSlide01 v-if="item.name === 'SLIDE01'" v-model="localValue[index]" :readonly="readonly">
            </OrganismDesignSlide01>
            <OrganismDesignSlide02 v-if="item.name === 'SLIDE02'" v-model="localValue[index]" :readonly="readonly">
            </OrganismDesignSlide02>
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
</script>