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
            <div class="body__preview">
                <MoleculeDesignBanner></MoleculeDesignBanner>
                <!-- <img class="preview__image"
                    src="https://storage.googleapis.com/public.prd.job-pair.com/meta/companyBanner.png"> -->
                <div class="preview__template">
                    請先點擊區域，再選擇模板
                </div>
            </div>
        </div>
        <div class="design__footer">
            <div class="footer__desc">
                目前的方案可使用五個區域
            </div>
            <AtomBtnSimple class="footer_btn">存為草稿</AtomBtnSimple>
            <AtomBtnSimple class="footer_btn">發布頁面</AtomBtnSimple>
            <AtomBtnSimple class="footer_btn">預覽頁面</AtomBtnSimple>
        </div>
    </div>
</template>
<script setup>
const state = reactive({
    color: '#5EA88E',
})
</script>
<style lang="scss" scoped>
.design {
    background-color: white;

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
            padding: 20px;
            // position: relative;

            .preview__item {
                // width: 100%;
                // position: absolute;
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
    }

    .design__footer {
        font-size: 20px;
        display: flex;
        justify-content: flex-end;
        gap: 30px;
        padding: 20px 50px;
        border-top: solid 1px #d3d3d3;
        align-items: center;

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