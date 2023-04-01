<template>
    <div class="about">
        <div class="about__banner">
            "每個人都能因認識自己而遇見更好的職涯，企業也能因了解人選的需求而創造更長遠的合作與價值。"
        </div>
        <div :class="{ 'container': device.state.isDesktop }">
            <div class="about__card">
                <h2 class="card__header">關於Job Pair</h2>
                <div class="card__body text-center mt-3">
                    <b>＂Job Pair專注為「求職」與「求才」雙方配對適合的彼此＂</b><br>
                    跳脫於傳統僅能使用產業、薪資等偏向硬性條件的篩選方式<br>
                    Job Pair 致力於解析適才適所的關鍵因素，並將其轉換為有效、精準的「適配度」指標<br>
                    透過媒合雙方軟性需求，如企業文化、工作環境、管理模式等「適配度」，讓人才與企業們更有效的找到適合的彼此。
                </div>
            </div>
            <div class="about__card">
                <h2 class="card__header">故事/產品介紹</h2>
                <div class="card__body text-center mt-3">
                    你有過以下的想法嗎？<br>
                    「相較大企業，我較偏好小而美的新創」<br>
                    「因為有家庭考量，我需要安穩一點的工作」<br>
                    「我喜歡變化跟挑戰多一點，現在的工作太無趣安逸」<br>
                    「我希望能與喜歡部屬提供建議參與決策的主管合作」<br><br>
                    我們發現，一個更有效率、更友善的人才媒合市場，除了考量薪資、地區、年資、職等等硬性需求，也應該容易地評估雙方所期待的軟性需求，包含企業文化、工作環境、人際交流與溝通模式等。進而協助求職者更「有效率地探索」理念契合、氛圍適合自己發展的公司與部門，增加面試的成功率與留任時間、以利長期的職涯成長。<br>
                    <br>同時間協助企業更「有質量地獲取」認同企業理念、具備類似價值觀、能與主管合作的應徵者，提升平均每位受聘者能替公司帶來的價值(產值)與留任時間、以最大化招募資源的效益。
                </div>
            </div>
            <div class="about__card">
                <h2 class="card__header">提供的價值</h2>
                <div class="card__bodyGroups">
                    <div>
                        <img class="card__image card__image--1" alt="improved" src="~/assets/about/img4@2x.png">
                        <h3 class="body__header">提升招聘效能</h3>
                        <div class="card__body text-left card__body--maxWidth">
                            人們傾向相信自己意願的選擇；透過求職偏好的篩選，所選出的職缺，不是依據公司大小、品牌知名度，而是個人的需求，強化人選投遞的意願。<br><br>

                            只要在Job Pair上架職缺，所收到的履歷可以透過「適配度」排序，因此人資不用一下子看上百封履歷，還能透過「適配度」來安排面試的優先順序。
                        </div>
                    </div>
                    <div>
                        <img class="card__image card__image--2" alt="focused" src="~/assets/about/img5@2x.png">
                        <h3 class="body__header">精準找到合適人選</h3>
                        <div class="card__body text-left card__body--maxWidth">
                            每位主管需求與做事方法都不一樣，除了工作職掌，合作與溝通模式也是重點。然求職者為了獲取工作機會，面試時會刻意表現出高度配合，難以判斷到職後能否融入組織。<br><br>

                            Job Pair讓用人單位自行決定用人偏好，讓符合主管需求的求職者投遞履歷，降低到職後因文化、合作與溝通模式的落差而產生流動率。
                        </div>
                    </div>
                    <div>
                        <img class="card__image card__image--3" alt="cost effective" src="~/assets/about/img6@2x.png">
                        <h3 class="body__header">節省成本</h3>
                        <div class="card__body text-left card__body--maxWidth">
                            根據美國人力資源管理協會的報告指出，一位因不適應公司文化離職的員工，浪費的人事成本可以高達其年薪的50%-60%。<br><br>

                            在Job Pair上架職缺，透過精心設計的用人偏好，讓適合的人加入不只強化企業文化，人資與用人單位更能有效率的招募到人選，進而減少成本、流動率，提升績效與組織凝聚力。
                        </div>
                    </div>
                </div>
            </div>
            <div class="about__card about__card--member">
                <h2 class="card__header">團隊成員</h2>
                <div class="card__bodyGroups">
                    <div class="card__person">
                        <img class="card__selfie" alt="sandy" src="~/assets/about/img_sandy@2x.png">
                        <div class="card__slogan">
                            “Live like you mean it！”
                        </div>
                        <b class="person__title">Sandy @CEO</b>
                        <div class="person__links">
                            <a href="https://www.facebook.com/3dlifecheck" target="_blank">
                                <img class="link__icon" alt="facebook" src="~/assets/about/icon_fb.svg">
                            </a>
                            <a href="https://www.instagram.com/3d.chiu/" target="_blank">
                                <img class="link__icon" alt="instagram" src="~/assets/about/icon_ig.svg">
                            </a>
                        </div>
                    </div>
                    <div class="card__person">
                        <img class="card__selfie" alt="boss chu" src="~/assets/about/img_ian@2x.png">
                        <div class="card__slogan">
                            "我禿了，也變強了"
                        </div>
                        <b class="person__title">朱奕安 @CTO</b>
                        <div class="person__links">
                            <a href="https://www.facebook.com/profile.php?id=100069740545113" target="_blank">
                                <img class="link__icon" alt="facebook" src="~/assets/about/icon_fb.svg">
                            </a>
                            <a href="https://www.instagram.com/econ.sense/" target="_blank">
                                <img class="link__icon" alt="instagram" src="~/assets/about/icon_ig.svg">
                            </a>
                        </div>
                    </div>
                    <div class="card__person">
                        <img class="card__selfie" alt="monica" src="~/assets/about/img_jun@2x.png">
                        <div class="card__slogan">
                            “如果沒有夢想，<br>那跟叉燒有什麼區別”
                        </div>
                        <b class="person__title">陸盈君 @UIUX Designer</b>
                        <!-- <div class="person__links">
                            <a href="https://www.facebook.com/3dlifecheck" target="_blank">
                                <img src="~/assets/about/icon_fb.svg">
                            </a>
                            <a href="https://www.instagram.com/3d.chiu/" target="_blank">
                                <img src="~/assets/about/icon_ig.svg">
                            </a>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const device = useDevice()
</script>
<style lang="scss">
.about {
    background-color: #edf3f6;
    padding-bottom: 20px;

    .about__banner {
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
        padding: 40px 20px;
        background-color: #5ea88e;
    }

    .about__card {
        padding: 20px;
        background-color: #fff;
        margin-top: 20px;

        .card__header {
            font-size: 18px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: center;
            color: #5ea88e;
        }

        .card__body {
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.7;
            letter-spacing: normal;
            // text-align: center;
            color: #333;
        }

        .card__image {
            display: block;
            margin: auto;
        }

        .card__image--1 {
            width: 115px;
            height: 100px;
        }

        .card__image--2 {
            width: 115px;
            height: 100px;
        }

        .card__image--3 {
            width: 140px;
            height: 100px;
        }

        .card__person {
            text-align: center;
        }

        .card__selfie {
            width: 150px;
            height: 150px;
            border-radius: 10px;
            margin-top: 20px;
        }

        .card__slogan {
            font-size: 18px;
            color: #999;
            margin-top: 15px;
        }

        .person__links {
            margin: 20px 0 0 0;
            display: flex;
            justify-content: center;
            gap: 8px;

            .link__icon {
                height: 26px;
                width: 26px;
            }
        }
    }
}

@media screen and (min-width: 992px) {
    .about {
        .about__banner {
            font-size: 26px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: center;
            color: #fff;
            padding: 60px auto;
        }

        .about__card {
            border-radius: 10px;
            border: solid 1.4px #d3d3d3;
            background-color: #fff;
            padding: 40px 135px;

            .card__bodyGroups {
                display: flex;
                gap: 40px;
                justify-content: center;
                margin-top: 20px;
            }

            .body__header {
                font-size: 18px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: center;
                color: #333;
                margin: 20px 0;
            }

            .card__body--maxWidth {
                max-width: 300px;
            }
        }

        .about__card--member {
            text-align: center;

            .card__bodyGroups {
                .card__selfie {
                    display: block;
                    margin: auto;
                }

                .person__links {
                    // justify-content: flex-start;
                }

                .card__person {
                    width: 335px;
                }
            }
        }


    }

}
</style>