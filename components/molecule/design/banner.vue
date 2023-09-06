<template>
    <div class="banner" ref="banner">
        <img class="banner__image" src="https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Bg.webp"
            draggable="false">
        <div class="banner__preview">
            <div v-html="state.controllable.title.html" class="preview__item">

            </div>
            <div v-html="state.controllable.desc.html" class="preview__item">

            </div>
            <div class="preview__item">
                <AtomBtnSimple class="item__btn btnSimple--outline--light">查看所有職缺</AtomBtnSimple>
            </div>
        </div>

        <!-- <LazyAtomControllable class="banner__title" v-model="state.controllable['title']"
            @move="handlePosition($event, 'title')" ref="title">
            <LazyAtomInputCkeditorInline v-model="state.content" class="editorGroup__editor" @focus="handleFocus('title')"
                @click="handleFocus('title')" @blur="handleBlur('title')">
            </LazyAtomInputCkeditorInline>
        </LazyAtomControllable> -->
        <!-- <LazyAtomControllable class="banner__desc" v-model="state.controllable['desc']"
                @move="handlePosition($event, 'desc')" disabled ref="desc">
                <LazyAtomInputCkeditorInline v-model="state.description" class="editorGroup__editor"
                    @focus="handleFocus('desc')" @click="handleFocus('desc')" @blur="handleBlur('desc')">
                </LazyAtomInputCkeditorInline>
            </LazyAtomControllable> -->
    </div>
</template>
<script setup>
const state = reactive({
    controllable: {
        title: {
            isFocused: false,
            position: {
                left: 0,
                top: 0,
            },
            html: '<p><span style="color:hsl(0,0%,100%);font-size:72px;"><strong>找工作就像談戀愛</strong></span></p>'
            // size: {
            //     width: '100%'
            // }
        },
        desc: {
            isFocused: false,
            position: {
                left: 0,
                top: 0,
            },
            html: '<p><span style="color:hsl(0,0%,100%);font-size:30px;">快來配對屬於自己的職缺</span></p>'
        }
    },
    // controllable: {
    //     isFocused: false,
    //     position: {
    //         left: 0,
    //         top: 0,
    //     },
    // },
    // controllable2: {
    //     isFocused: false,
    //     position: {
    //         left: 0,
    //         top: 0,
    //     },
    // },
})
const currentInstance = getCurrentInstance()
// methods
function handlePosition(event, type) {
    const { left = 0, top = 0, offsetWidth, offsetHeight, } = event
    const area = currentInstance.refs.banner
    const { clientHeight, clientWidth } = area
    const boundLeft = Math.min(left, clientWidth - offsetWidth)
    const boundHeight = Math.min(top, clientHeight - offsetHeight)
    state.controllable[type].position = {
        left: boundLeft,
        top: boundHeight
    }
}
function handleFocus(type) {
    console.log(type);
    state.controllable[type].isFocused = true
}
function handleBlur(type) {
    state.controllable[type].isFocused = false
}
</script>
<stylte lang="scss" scoped>
.banner {
    position: relative;

    .banner__preview {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 100%;

        .preview__item {
            width: 100%;

            .item__btn {
                margin: auto;
                width: 200px;
            }
        }
    }

    .banner__image {
        width: 100%;
    }

    .banner__controllable {
        width: 200px;
        position: absolute;
        top: 0;
        border: 1px dashed rgba(0, 0, 0, 0);
        position: absolute;
        top: 0px;
        padding: 2px;
        background-color: #1a73e8;
    }

}
</stylte>