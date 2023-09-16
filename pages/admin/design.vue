<template>
    <div class="container design">
        <div v-if="false" class="design__panel">
            <div class="category__color">
                <div class="color__titleGroup">
                    <div class="titleGroup__title">
                        主色調
                    </div>
                    <div class="titleGroup__desc">
                        可調整按鈕以及大標題顏色
                    </div>
                </div>
                <LazyAtomInputColor v-model="state.color"></LazyAtomInputColor>
            </div>
            <hr class="category__line">
            <div class="category__blocks">
                <div class="blocks__title">
                    選擇布局
                </div>
                <ul class="blocks__list">
                    <li class="list__item">
                        <img class="item__imaage" src="@/assets/admin/design/Top1.webp">
                        <div class="item__desc">適合 Banner ，大圖襯底，大標、副標和按鈕</div>
                    </li>
                    <li class="list__item">
                        <img class="item__imaage" src="@/assets/admin/design/Top2.webp">
                        <div class="item__desc">適合 Banner ，大圖襯底，大標、副標和按鈕</div>
                    </li>
                    <li class="list__item">
                        <img class="item__imaage" src="@/assets/admin/design/Model4.webp">
                        <div class="item__desc">適合 Banner ，大圖襯底，大標、副標和按鈕</div>
                    </li>
                    <li class="list__item">
                        <img class="item__imaage" src="@/assets/admin/design/Frame967.webp">
                        <div class="item__desc">適合 Banner ，大圖襯底，大標、副標和按鈕</div>
                    </li>
                    <li class="list__item">
                        <img class="item__imaage" src="@/assets/admin/design/Model3.webp">
                        <div class="item__desc">適合 Banner ，大圖襯底，大標、副標和按鈕</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="design__body">
            <!-- Banner式 -->
            <MoleculeDesignBanner01></MoleculeDesignBanner01>
            <MoleculeDesignBanner02></MoleculeDesignBanner02>
            <!-- 圖文混合 -->
            <MoleculeDesignHybrid01></MoleculeDesignHybrid01>
            <MoleculeDesignHybrid02></MoleculeDesignHybrid02>
            <!-- 短文 -->
            <MoleculeDesignArticle01></MoleculeDesignArticle01>
            <!-- 條列式 -->
            <MoleculeDesignList01></MoleculeDesignList01>
            <MoleculeDesignList02></MoleculeDesignList02>
            <!-- 投影片式 -->
            <MoleculeDesignSlide01></MoleculeDesignSlide01>
            <div class="preview__template">
                請先點擊區域，再選擇模板
            </div>
        </div>
        <div class="design__footer">
            <div class="footer__desc">
                目前的方案可使用五個區域
            </div>
            <AtomBtnSimple class="footer_btn" @click="saveDraft()">存為草稿</AtomBtnSimple>
            <AtomBtnSimple class="footer_btn" @click="openSeoDialog()">發布頁面</AtomBtnSimple>
            <AtomBtnSimple class="footer_btn">預覽頁面</AtomBtnSimple>
        </div>
    </div>
</template>
<script setup>
const repoOrganizationDesign = useRepoOrganizationDesign()
// const repoCompany = useRepoCompany()
// const repoAuth = useRepoAuth()
const state = reactive({
    color: '#5EA88E',
    templates: [
        {
            name: 'description2',
        },
        {
            name: 'threeRows',
        },
        {
            name: ''
        },
        {
            name: ''
        }
    ]
})
// hooks
// watch(() => repoAuth.state.user, () => {
//     initializeCompanyInfo()
// }, { immediate: true })
onMounted(async () => {
    // // 防求職者誤入
    // const { user = {} } = repoAuth.state
    // const isEmployee = user && user.type === 'employee'
    // if (isEmployee) {
    //     await $sweet.alert('此E-mail已註冊身份為求職者，如要進行企業註冊請使用其他E-mail信箱。')
    //     router.push({
    //         name: 'index'
    //     })
    // }
})
// methods
async function saveDraft() {

}
async function openSeoDialog() {
    const response = await repoOrganizationDesign.postOrganizationDesign()
}
async function initializeCompanyInfo() {
    // 生成本地端company資料
    const { user } = repoAuth.state
    if (!user || !user.id || state.companyInfo.id) {
        return
    }
    // Load from store
    let companyInfo = getDefaultCompany()
    if (repoAuth.state.company) {
        companyInfo = JSON.parse(JSON.stringify(repoAuth.state.company))
    } else {
        const companyRes = await repoAdmin.getAdminCompany()
        // $sweet.loader(false)
        if (companyRes.status !== 200) {
            return
        }
        if (companyRes.data === false) {
            // 尚未註冊導回註冊畫面
            router.replace(`/admin/register`)
            state.isNewCompay = true
        }
        if (companyRes.data) {
            companyInfo = JSON.parse(JSON.stringify(companyRes.data))
        }
    }
    // Set company to local
    state.companyInfo = companyInfo
    state.companyLogo = companyInfo.logo
    state.companyBanner = companyInfo.banner
    state.companyImages = companyInfo.images ?? []

    const descriptionRef = currentInstance.refs.descriptionRef
    const jobBenefitsRef = currentInstance.refs.jobBenefitsRef
    if (descriptionRef) {
        descriptionRef.setData(state.companyInfo.description)
    }
    if (jobBenefitsRef) {
        jobBenefitsRef.setData(state.companyInfo.jobBenefits)
    }
    setWelfareFlags()
}
function getDefaultCompany(id = '') {
    const companyInfo = {
        id,
        jobBenefits: '',
        description: "",
        jobBenefitFlags: {
            learning: false,
            bonus: false,
            time: false,
            activity: false,
            subsidy: false,
            facility: false,
            blacklist: false,
        },
        preference: {
            culture: [],
        },
        url: {
            default: ''
        },
        remark: ''
    }
    return companyInfo
}
function setWelfareFlags() {
    if (!state.companyInfo) {
        return
    }
    const { jobBenefits = "" } = state.companyInfo
    let welfareCopy = JSON.parse(JSON.stringify(jobBenefits))
    state.benefitFlags.forEach((welfareType) => {
        const labels = jobBenefitsConfig[welfareType]
        state.jobBenefits[welfareType] = labels.filter((keyword) => {
            return welfareCopy.includes(keyword)
        })
        state.jobBenefits[welfareType].forEach((label) => {
            welfareCopy = welfareCopy.replaceAll(label, "")
        })
    })
}
</script>
<style lang="scss" scoped>
.design {
    // background-color: white;
    padding: 50px 0;

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
        left: 0;
        width: 200px;
        border-right: solid 1px #d3d3d3;
        height: 100%;
        background-color: white;
        z-index: 10;
        width: 560px;

        .category__goback {
            width: 115px;
            height: 40px;
        }

        .category__color {
            display: flex;
            justify-content: space-between;
            // margin-top: 30px;
            padding: 20px 20px 20px 20px;

            .color__titleGroup {
                .titleGroup__title {
                    font-size: 20px;
                    font-weight: bold;
                }

                .titleGroup__desc {
                    font-size: 16px;
                    font-weight: normal;
                }
            }
        }

        .category__line {
            margin: 0;
        }

        .category__blocks {
            font-size: 20px;
            font-weight: bold;
            padding: 20px 0px 0px 0px;

            .blocks__title {
                padding: 0px 20px;
            }

            .blocks__list {
                list-style: none;
                padding: 0px;
                margin-top: 20px;
                margin-bottom: 0px;
                max-height: calc(100vh - 225px);
                overflow-y: auto;
                padding: 0px 20px;

                .list__item {
                    border-top: solid 1px #d3d3d3;
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
            }
        }
    }

    .design__body {
        // display: flex;


        .body__preview {
            // width: 1320px;
            // min-width: 900px;
            // padding: 20px;
            // position: relative;

            .preview__item {
                // width: 100%;
                // position: absolute;
            }

        }

        .preview__template {
            border: dashed 1px #5ea88e;
            background-color: rgba(94, 168, 142, 0.1);
            max-width: 100%;
            height: 313px;
            margin-top: 20px;
            font-size: 20px;
            line-height: 313px;
            text-align: center;
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

        .footer_btn {
            width: 140px;
            height: 60px;
        }
    }

}
</style>