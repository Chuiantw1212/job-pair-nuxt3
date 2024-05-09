<template>
    <div class="design" :class="{ container: device.state.isLarge }">
        <div class="design__panel"
            :class="{ 'design__panel--isOpen': state.isOpen, 'design__panel--isHidden': !state.isOpen }">
            <div class="panel__background  d-lg-none" @click="slidePanel()">

            </div>
            <div class="panel__content">
                <div class="content__blocks">
                    <div class="blocks__title">
                        選擇布局
                    </div>
                    <ul class="blocks__list">
                        <li data-name="BANNER01" class="list__item" :class="{ 'list__item--draggable': isDraggable }"
                            :draggable="isDraggable" @mouseenter="setTemplateName($event)"
                            @mouseleave="state.isDragging = false">
                            <img class="item__imaage" src="@/assets/admin/design/Top1.webp" draggable="false">
                            <div class="item__desc">適合 Banner ，大圖襯底，大標、副標和按鈕</div>
                        </li>
                        <li data-name="HYBRID01" class="list__item" :class="{ 'list__item--draggable': isDraggable }"
                            :draggable="isDraggable" @mouseenter="setTemplateName($event)"
                            @mouseleave="state.isDragging = false">
                            <img class="item__imaage" src="@/assets/admin/design/Model4.webp" draggable="false">
                            <div class="item__desc">適合公司介紹，圖片至左，加上大標、內文和更多資訊</div>
                        </li>
                        <li data-name="HYBRID02" class="list__item" :class="{ 'list__item--draggable': isDraggable }"
                            :draggable="isDraggable" @mouseenter="setTemplateName($event)"
                            @mouseleave="state.isDragging = false">
                            <img class="item__imaage" src="@/assets/admin/design/Model3.webp" draggable="false">
                            <div class="item__desc">適合 Banner ，大圖襯底，大標、副標和按鈕</div>
                        </li>
                        <li data-name="ARTICLE01" class="list__item" :class="{ 'list__item--draggable': isDraggable }"
                            :draggable="isDraggable" @mouseenter="setTemplateName($event)"
                            @mouseleave="state.isDragging = false">
                            <img class="item__imaage" src="@/assets/admin/design/Frame967.webp" draggable="false">
                            <div class="item__desc">適合公司介紹，大標、內文</div>
                        </li>
                        <li data-name="LIST01" class="list__item" :class="{ 'list__item--draggable': isDraggable }"
                            :draggable="isDraggable" @mouseenter="setTemplateName($event)"
                            @mouseleave="state.isDragging = false">
                            <img class="item__imaage" src="@/assets/admin/design/Model7.png" draggable="false">
                            <div class="item__desc">適合公司服務介紹，三個區塊，Icon、標題、內文</div>
                        </li>
                        <li data-name="LIST02" class="list__item" :class="{ 'list__item--draggable': isDraggable }"
                            :draggable="isDraggable" @mouseenter="setTemplateName($event)"
                            @mouseleave="state.isDragging = false">
                            <img class="item__imaage" src="@/assets/admin/design/Model6.png" draggable="false">
                            <div class="item__desc">適合凸顯特色，不論是企業文化、優勢、福利，甚至是產品服務。</div>
                        </li>
                        <li data-name="LIST03" class="list__item" :class="{ 'list__item--draggable': isDraggable }"
                            :draggable="isDraggable" @mouseenter="setTemplateName($event)"
                            @mouseleave="state.isDragging = false">
                            <img class="item__imaage" src="@/assets/admin/design/Model_env.png" draggable="false">
                            <div class="item__desc">公司環境照片</div>
                        </li>
                        <li data-name="SLIDE01" class="list__item" :class="{ 'list__item--draggable': isDraggable }"
                            :draggable="isDraggable" @mouseenter="setTemplateName($event)"
                            @mouseleave="state.isDragging = false">
                            <img class="item__imaage" src="@/assets/admin/design/Comment3.webp" draggable="false">
                            <div class="item__desc">可置入三項內容，一頁一項。可用於團隊介紹、口碑宣傳、客戶回饋等內容。</div>
                        </li>
                        <li data-name="SLIDE02" class="list__item" :class="{ 'list__item--draggable': isDraggable }"
                            :draggable="isDraggable" @mouseenter="setTemplateName($event)"
                            @mouseleave="state.isDragging = false">
                            <img class="item__imaage" src="@/assets/admin/design/Comment2.webp" draggable="false">
                            <div class="item__desc">可置入三項內容，一頁兩項。可用於團隊介紹、口碑宣傳、客戶回饋等內容。</div>
                        </li>
                    </ul>
                </div>
                <button class="content__btn" @click="slidePanel()">
                    <img class="btn__arrow" :class="{ 'btn__arrow--isOpen': !state.isOpen }"
                        src="@/assets/admin/design/Frame1036.svg">
                </button>
            </div>
        </div>
        <div class="design__body">
            <OrganismDesignBody v-model="state.organizationDesign.templates" @click="slidePanel(false)">
                <template #default="defaultProps">
                    <div v-if="isDraggable" class="preview__template"
                        :class="{ 'preview__template--outline': state.isDragging }"
                        @drop="insertTemplate($event, defaultProps.index)" @dragover="allowDrop($event)">
                        請拖曳布局至此
                    </div>
                    <div v-else class="preview__template">
                        你的模板已達上限，如果需要增加，請升級進階付費方案！
                    </div>
                </template>
            </OrganismDesignBody>
            <div v-if="isDraggable" class="preview__template preview__template--initial"
                :class="{ 'preview__template--outline': state.isDragging }"
                @drop="insertTemplate($event, state.organizationDesign.templates.length)" @dragover="allowDrop($event)">
                請拖曳布局至此
            </div>
            <div v-else class="preview__template">
                你的模板已達上限，如果需要增加，請升級進階付費方案！
            </div>
        </div>
        <div class="design__footer">
            <!-- <div class="footer__desc">
                需升級後才能發佈唷！
            </div> -->
            <LazyAtomBtnSimple class="footer_btn" @click="saveDraft()">存為草稿</LazyAtomBtnSimple>
            <LazyOrganismSeoModal v-model="state.organizationDesign"
                :disabled="!state.organizationDesign.templates.length" @confirm="publishDesign()">發布
            </LazyOrganismSeoModal>
            <NuxtLink v-if="state.organizationDesign.seoName" target="_blank" class="footer__link"
                :to="{ name: 'company-id', params: { id: state.organizationDesign.seoName } }"
                :disabled="!state.organizationDesign.templates.length">
                <LazyAtomBtnSimple class="footer_btn">
                    檢視頁面
                </LazyAtomBtnSimple>
            </NuxtLink>
        </div>
    </div>
</template>
<script setup>
const { $sweet, } = useNuxtApp()
const repoAuth = useRepoAuth()
const repoOrganizationDesign = useRepoOrganizationDesign()
const device = useDevice()
const runTimeConfig = useRuntimeConfig()
const state = reactive({
    lastTemplateName: '',
    organizationDesign: {
        templates: [],
        status: 'draft', // status: ['active', 'draft', 'closed']
        organizationId: '',
        seoName: '',
        description: '',
    },
    isOpen: false,
})
watch(() => repoAuth.state.company, async (newValue) => {
    initializeDesign()
}, { immediate: true })
const isDraggable = computed(() => {
    return state.organizationDesign.templates?.length < 5
})
// methods
function extractContent(content) {
    const target = content.replaceAll("<[^>]*>", "");
    return target
}
function slidePanel(isOpen) {
    if ([null, undefined].includes(isOpen)) {
        state.isOpen = !state.isOpen
    } else {
        state.isOpen = isOpen
    }
}
function setTemplateName(ev) {
    state.isDragging = true
    state.lastTemplateName = ev.target.dataset.name
}
async function initializeDesign() {
    const isFectched = state.organizationDesign.id
    if (!repoAuth.state.user || isFectched) {
        return
    }
    const response = await repoOrganizationDesign.getDraft({
        organizationId: repoAuth.state.company.id
    })
    const { data = {} } = response
    const organizationDesign = Object.assign(state.organizationDesign, data)
    if (organizationDesign.id) {
        // has existed item
        state.organizationDesign = organizationDesign
        setDefaultTemplates()
        return
    }
    // Post first draft
    state.organizationDesign.organizationId = repoAuth.state.company.id
    if (!state.organizationDesign.seoName) {
        state.organizationDesign.seoName = repoAuth.state.company.id
    }
    if (!state.organizationDesign.description) {
        state.organizationDesign.description = extractContent(repoAuth.state.company.description)
    }
    await repoOrganizationDesign.postItem(state.organizationDesign)
    setDefaultTemplates()
}
function setDefaultTemplates() {
    if (!state.organizationDesign.templates.length) {
        const defaultTemplates = [
            {
                name: 'BANNER01',
            },
            {
                name: 'HYBRID01',
            },
            {
                name: 'ARTICLE01',
            },
        ]
        state.organizationDesign.templates.push(...defaultTemplates)
    }
}
function insertTemplate(ev, index = 0) {
    ev.preventDefault();
    state.organizationDesign.templates.splice(index, 0, {
        name: state.lastTemplateName,
    })
    state.isDragging = false
}
function allowDrop(ev) {
    ev.preventDefault();
}
async function saveDraft() {
    $sweet.loader(true)
    state.organizationDesign.status = 'draft'
    state.organizationDesign.organizationId = repoAuth.state.company.id
    await repoOrganizationDesign.putItem(state.organizationDesign)
    $sweet.loader(false)
}
async function publishDesign() {
    $sweet.loader(true)
    state.organizationDesign.status = 'active'
    state.organizationDesign.organizationId = repoAuth.state.company.id
    await repoOrganizationDesign.putItem(state.organizationDesign)
    $sweet.loader(false)
}
</script>
<style lang="scss" scoped>
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline {
    padding: 0;
}

.design {
    padding: 20px 0px;

    * {
        -webkit-user-select: none;
        /* Safari */
        -ms-user-select: none;
        /* IE 10 and IE 11 */
        user-select: none;
        /* Standard syntax */
    }

    .design__panel {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 1070;

        .panel__background {
            background-color: rgba(0, 0, 0, 0.3);
            position: absolute;
            top: 0;
            left: 0;
            max-width: 100vw;
            height: 100vh;
            width: 100vw;
            z-index: 1050;
            transition: all 0.3s;
            opacity: 0;
            cursor: pointer;
        }

        .panel__content {
            position: fixed;
            left: 0;
            width: 100%;
            z-index: 1060;
            border-right: solid 1px #d3d3d3;
            height: 100%;
            background-color: white;
            width: calc(100% - 52px);
            transform: translateX(-100%);
            transition: all 0.3s;

            .content__btn {
                background-color: rgba(0, 0, 0, 0.5);
                border: none;
                border-radius: 0px 10px 10px 0px;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translate(100%, -50%);
                padding: 0;
                width: 41px;
                height: 91px;

                .btn__arrow {
                    transform: scaleX(1);
                    transition: all 0.3s;
                }

                .btn__arrow--isOpen {
                    transform: scaleX(-1);
                }
            }
        }

        .content__blocks {
            font-size: 20px;
            font-weight: bold;
            padding: 20px;

            .blocks__list {
                list-style: none;
                padding: 0px;
                margin-top: 20px;
                margin-bottom: 0px;
                max-height: calc(100vh - 70px);
                overflow-y: auto;
                padding: 2px;
                border-top: solid 1px #d3d3d3;

                .list__item {
                    border-bottom: solid 1px #d3d3d3;
                    font-size: 16px;
                    font-weight: normal;
                    padding: 20px 0px;

                    .item__imaage {
                        display: block;
                        max-width: 100%;
                    }

                    .item__desc {
                        margin-top: 10px;
                    }
                }

                .list__item--draggable {
                    cursor: grab;

                    &:hover {
                        outline: 2px dashed #d60b00;
                    }
                }

                .list__item--selected {
                    cursor: grabbing;
                }
            }
        }
    }

    .design__panel--isOpen {
        .panel__background {
            opacity: 1;
        }

        .panel__content {
            transform: translateX(0%);
        }
    }

    .design__panel--isHidden {
        width: 0;
        height: 0;
        overflow: hidden;
    }

    .design__body {

        .preview__template {
            border: dashed 2px #5ea88e;
            background-color: rgba(94, 168, 142, 0.1);
            max-width: 100%;
            height: 44px;
            line-height: 44px;
            font-size: 20px;
            text-align: center;
        }

        .preview__template--outline {
            border-color: #d60b00;
        }

        .preview__template--initial {
            height: 313px;
            line-height: 313px;
        }
    }

    .design__footer {
        position: fixed;
        bottom: 0;
        left: 0;
        font-size: 20px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 20px;
        border-top: solid 1px #d3d3d3;
        align-items: center;
        background-color: white;
        width: 100vw;
        z-index: 1060;

        .footer__desc {
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #d60b00;
        }

        .footer_btn {
            font-size: 14px;
        }

        .footer__link {
            text-decoration: none;
        }
    }

}

@media screen and (min-width:992px) {

    .design {

        .design__panel {
            .panel__content {
                width: 360px;

            }
        }

        .design__footer {
            position: fixed;
            bottom: 0;
            left: 0;
            font-size: 20px;
            display: flex;
            justify-content: flex-end;
            gap: 30px;
            padding: 20px 50px;
            border-top: solid 1px #d3d3d3;
            align-items: center;
            background-color: white;
            width: 100vw;

            .footer_btn {
                padding: 15px 30px;
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: center;
                color: #fff;
                text-decoration: none !important;
            }

            .footer__desc {
                font-size: 20px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #d60b00;
            }
        }
    }
}
</style>