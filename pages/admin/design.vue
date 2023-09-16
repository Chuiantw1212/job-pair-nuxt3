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
            <template v-for="(item, index) in state.templates" :key="index">
                <!-- Banner式 -->
                <MoleculeDesignBanner01 v-if="item.name === 'BANNER01'" v-model="state.templates[index]">
                </MoleculeDesignBanner01>
                <MoleculeDesignBanner02 v-if="item.name === 'BANNER02'" v-model="state.templates[index]">
                </MoleculeDesignBanner02>
                <!-- 圖文混合 -->
                <MoleculeDesignHybrid01 v-if="item.name === 'HYBRID01'" v-model="state.templates[index]">
                </MoleculeDesignHybrid01>
                <MoleculeDesignHybrid02 v-if="item.name === 'HYBRID02'" v-model="state.templates[index]">
                </MoleculeDesignHybrid02>
                <!-- 短文 -->
                <MoleculeDesignArticle01 v-if="item.name === 'ARTICLE01'" v-model="state.templates[index]">
                </MoleculeDesignArticle01>
                <!-- 條列式 -->
                <MoleculeDesignList01 v-if="item.name === 'LIST01'" v-model="state.templates[index]"></MoleculeDesignList01>
                <MoleculeDesignList02 v-if="item.name === 'LIST02'" v-model="state.templates[index]"></MoleculeDesignList02>
                <!-- 投影片式 -->
                <MoleculeDesignSlide01 v-if="item.name === 'SLIDE01'" v-model="state.templates[index]">
                </MoleculeDesignSlide01>
            </template>
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
            name: 'BANNER01',
            controllable: {
                title: {
                    html: '<p><span style="color:hsl(0,0%,100%);font-size:72px;"><strong>找工作就像談戀愛</strong></span></p>'
                },
                desc: {
                    html: '<p><span style="color:hsl(0,0%,100%);font-size:30px;">快來配對屬於自己的職缺</span></p>'
                }
            }
        },
        {
            name: 'BANNER02',
            controllable: {
                title: {
                    html: '<p><span style="font-size:36px;"><strong>找工作就像談戀愛</strong></span></p>'
                },
                desc: {
                    html: '<p><span style="font-size:18px;">快來配對屬於自己的職缺</span></p>'
                }
            }
        },
        {
            name: 'HYBRID01',
            controllable: {
                title: {
                    html: '<p><span style="font-size:36px;"><strong>公司介紹</strong></span></p>'
                },
                desc: {
                    html: '<p><span style="font-size:18px;">關於Job Pair</span><br><span style="font-size:18px;">Job Pair 是一家致力於打造更友善、更有效率的人才媒合市場的公司。</span></p><p><span style="font-size:18px;">Job Pair 的創辦人 Sandy 擁有 8 年科技業獵頭經驗，累計超過萬人的履歷面談。2015年，她開始提供一對一職涯諮詢的服務，並解決了超過千人的職涯問題。多年來，Sandy 一直從不同的角度思考「如何找到適合的工作」，發現人才媒合市場需要更多考量軟性需求的功能。這些軟性需求包括企業文化、工作環境、人際交流與溝通模式等。</span></p><p><span style="font-size:18px;">因此，我們打造了一個新型態的媒合型人力銀行，不論求職者或企業都能夠先以雙方的軟性需求進行第一步演算，提供團隊適配度給雙方參考。跳脫了僅能以地區、薪資、職務類別、產業等硬性需求評估職缺，或者以性別、年齡、學歷等表象資訊評估求職者。</span></p><p><span style="font-size:18px;">Job Pair 為你從適合的角度切入，打造長遠的合作關係。</span></p>'
                },
                items: [
                    {
                        title: {
                            html: '<p><span style="color:hsl( 163, 60%, 41% );font-size:24px;">性別友善</span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 205, 36%, 18% );font-size:48px;"><strong>有</strong></span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p><span style="color:hsl( 163, 60%, 41% );font-size:24px;">城市</span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 205, 36%, 18% );font-size:48px;"><strong>台北市</strong></span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p><span style="color:hsl( 163, 60%, 41% );font-size:24px;">資本額</span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 205, 36%, 18% );font-size:48px;"><strong>1,000,000</strong></span></p>'
                        }
                    },
                ]
            }
        },
        {
            name: 'HYBRID02',
            controllable: {
                title: {
                    html: '<p style="text-align:center;"><span style="font-size:36px;"><strong>公司背景介紹</strong></span></p>'
                },
                desc: {
                    html: `<p style="text-align:justify;">關於Job Pair Job&nbsp;<br>Pair 是一家致力於打造更友善、更有效率的人才媒合市場的公司。&nbsp;</p><p style="text-align:justify;">Job Pair 的創辦人 Sandy 擁有 8 年科技業獵頭經驗，累計超過萬人的履歷面談。2015年，她開始提供一對一職涯諮詢的服務，並解決了超過千人的職涯問題。多年來，Sandy 一直從不同的角度思考「如何找到適合的工作」，發現人才媒合市場需要更多考量軟性需求的功能。這些軟性需求包括企業文化、工作環境、人際交流與溝通模式等。&nbsp;</p><p style="text-align:justify;">因此，我們打造了一個新型態的媒合型人力銀行，不論求職者或企業都能夠先以雙方的軟性需求進行第一步演算，提供團隊適配度給雙方參考。跳脫了僅能以地區、薪資、職務類別、產業等硬性需求評估職缺，或者以性別、年齡、學歷等表象資訊評估求職者。</p><p style="text-align:justify;">&nbsp;Job Pair 為你從適合的角度切入，打造長遠的合作關係。</p>`
                },
            }
        },
        {
            name: 'ARTICLE01',
            controllable: {
                title: {
                    html: '<p><span style="color:hsl( 163, 60%, 41% );font-size:36px;"><strong>公司福利</strong></span></p>'
                },
                desc: {
                    html: '<ul><li><span style="font-size:24px;">彈性自由的工作環境</span></li><li><span style="font-size:24px;">優於勞基法的休假制度</span></li><li><span style="font-size:24px;">每月NT1,000學習補貼，鼓勵員工主動學習</span></li><li><span style="font-size:24px;">三節禮金</span></li></ul>'
                }
            }
        },
        {
            name: 'LIST01',
            controllable: {
                title: {
                    html: '<p>公司服務介紹</p>'
                },
                items: [
                    {
                        title: {
                            html: '<p style="text-align:center;"><span style="font-size:24px;"><strong>解決生活焦慮</strong></span></p>'
                        },
                        desc: {
                            html: '<p style="text-align:justify;">理想生活探索是透過專業引導，釐清個人內在的「價值觀」，並將內在需求與外在行動對焦，制訂相對應的行動，有意識的創造個人的理想生活。</p><p style="text-align:justify;">本服務也有助於個人面對工作選擇或其他生涯抉擇時，下一個真正貼近個人內在需求的決策。</p>'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span style="font-size:24px;"><strong>釐清職業方向</strong></span></p>',
                        },
                        desc: {
                            html: '<p style="text-align:justify;">職涯偏好探索，目的是探索合適的工作，需從「價值觀」與「個性」兩個層面做自我分析。</p><p style="text-align:justify;">價值觀就是個人的信念、人生意義、道德觀念等組合，對應工作就是企業對文化、理念、願景的實踐；個性則是評估自己在什麼樣的工作環境、工作內容與什麼樣的主管合作，能更勝任愉快。</p><p style="text-align:justify;">所以，評估適合的工作發展，兩者缺一不可。</p>'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span style="font-size:24px;"><strong>履歷與面試輔導</strong></span></p>'
                        },
                        desc: {
                            html: '<p style="text-align:justify;">提供履歷與面試輔導的生涯設計師，除了來自不同產業的經驗，同時具備生涯設計的思維；不只從個人角度出發，還能從就業市場的角度，提供更全面的情報，為更好的職涯做準備。</p>'
                        }
                    }
                ]
            }
        },
        {
            name: 'LIST02',
            controllable: {
                title: {
                    html: '<p style="text-align:center;"><span style="font-size:36px;"><strong>標題</strong></span></p>'
                },
                items: [
                    {
                        html: '<p><span style="font-size:30px;"><strong>不花錢買廣告，很難被看見？</strong></span><br><span style="color:hsl( 0, 0%, 20% );font-size:18px;">求職者在搜尋職缺時，是透過「適配度」排序，讓適合的人才更快看到你的公司</span></p>'
                    },
                    {
                        html: '<p><span style="font-size:30px;"><strong>要怎麼提升招聘效能，減少時間成本呢？</strong></span><br><span style="color:hsl( 0, 0%, 20% );font-size:18px;">透過「適配度」排序，不用一下子看上百封履歷，直接從最適合的人選評估安排面試優先順序。</span></p>'
                    },
                    {
                        html: '<p><span style="font-size:30px;"><strong>好不容易徵到人，怎麼又離職了？</strong></span><br><span style="color:hsl( 0, 0%, 20% );font-size:18px;">讓用人單位自行決定用人偏好，降低到職後因文化、合作與溝通模式的落差而產生流動率。</span></p>'
                    }
                ]
            }
        },
        {
            name: 'SLIDE01',
            controllable: {
                items: [
                    {
                        title: {
                            html: '<p style="text-align:center;"><span style="font-size:36px;">聽聽大家怎麼說</span></p>'
                        },
                        image: {
                            html: '<p><span style="font-size:24px;">Mahbubur Rahman</span><br><span style="color:rgba(255,255,255,0.85);font-size:18px;">Owener, Softia, UK</span></p>',
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span style="font-size:36px;">聽聽大家怎麼說</span></p>'
                        },
                        image: {
                            html: '<p><span style="font-size:24px;">Mahbubur Rahman</span><br><span style="color:rgba(255,255,255,0.85);font-size:18px;">Owener, Softia, UK</span></p>',
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span style="font-size:36px;">聽聽大家怎麼說</span></p>'
                        },
                        image: {
                            html: '<p><span style="font-size:24px;">Mahbubur Rahman</span><br><span style="color:rgba(255,255,255,0.85);font-size:18px;">Owener, Softia, UK</span></p>',
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
                        }
                    }
                ]
            }
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