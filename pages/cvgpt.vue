<template>
    <div class="container chatgpt">
        <div class="chatgpt__instruction">
            <h1 class="instruction__header">CVgpt 快速更新或改善簡歷</h1>
            <div class="chatgpt__desc">
                我們量身訂製一套適合ChatGPT求職人士的指令，從製作一份殺手級的簡歷到準備棘手的面試問題。
                <br>
                快來試試，祝你快速找到一份理想的工作。
            </div>
            <ul class="instruction__list">
                <li class="list__item">
                    <div class="item__badge">
                        <img class="badge__icon" src="@/assets/user/chatgpt/Frame.svg">
                    </div>
                    <div class="item__text">
                        1. 複製
                    </div>
                </li>
                <li class="list__item">
                    <a class="item__link" href="https://chat.openai.com/" target="_blank">
                        <div class="item__badge">
                            <img class="badge__icon" src="@/assets/user/chatgpt/Frame1.svg">
                        </div>
                        <div class="item__text">
                            2. 開啟ChatGPT
                        </div>
                    </a>
                </li>
                <li class="list__item">
                    <div class="item__badge">
                        <img class="badge__icon" src="@/assets/user/chatgpt/Frame2.svg">
                    </div>
                    <div class="item__text">
                        3. 貼上
                    </div>
                </li>
                <li class="list__item">
                    <NuxtLink class="item__link" :to="{ name: 'user-profile' }">
                        <div class="item__badge">
                            <img class="badge__icon" src="@/assets/user/chatgpt/Frame3.svg">
                        </div>
                        <div class="item__text">
                            4. 快速更新簡歷
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div class="chatgpt__card">
            <div class="card__header"></div>
            <div class="card__body">
                <h2 class="body__title">如何寫簡歷？</h2>
                <div class="body__desc">
                    <div v-html="state.template.q1"></div>
                </div>
                <AtomBtnSimple class="body__btn btnSimple--outline--success" @click="copyToMemory('q1')">點我複製
                </AtomBtnSimple>
            </div>
        </div>
        <div class="chatgpt__card">
            <div class="card__header"></div>
            <div class="card__body">
                <h2 class="body__title">如何改善簡歷？</h2>
                <div class="body__desc">
                    <div v-html="state.template.q2"></div>
                </div>
                <AtomBtnSimple class="body__btn btnSimple--outline--success" @click="copyToMemory('q2')">點我複製
                </AtomBtnSimple>
            </div>
        </div>
        <div class="chatgpt__card">
            <div class="card__header"></div>
            <div class="card__body">
                <h2 class="body__title">怎麼寫求職信？</h2>
                <div class="body__desc">
                    <div v-html="state.template.q3"></div>
                </div>
                <AtomBtnSimple class="body__btn btnSimple--outline--success" @click="copyToMemory('q3')">點我複製
                </AtomBtnSimple>
            </div>
        </div>
        <div class="chatgpt__card">
            <div class="card__header"></div>
            <div class="card__body">
                <h2 class="body__title">面試準備</h2>
                <div class="body__desc">
                    <div v-html="state.template.q4"></div>
                </div>
                <AtomBtnSimple class="body__btn btnSimple--outline--success" @click="copyToMemory('q4')">點我複製
                </AtomBtnSimple>
                <div class="body__desc">
                    <div v-html="state.template.q5"></div>
                </div>
                <AtomBtnSimple class="body__btn btnSimple--outline--success" @click="copyToMemory('q5')">點我複製
                </AtomBtnSimple>
                <div class="body__desc">
                    <div v-html="state.template.q6"></div>
                </div>
                <AtomBtnSimple class="body__btn btnSimple--outline--success" @click="copyToMemory('q6')">點我複製
                </AtomBtnSimple>
                <div class="body__desc">
                    <div v-html="state.template.q7"></div>
                </div>
                <AtomBtnSimple class="body__btn btnSimple--outline--success" @click="copyToMemory('q7')">點我複製
                </AtomBtnSimple>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $sweet } = useNuxtApp()
const state = reactive({
    template: {
        q1: `
        寫一份簡歷，突出你的任職資格，包括[你的姓名]，[工作年限]，以及你最近的兩個職位和任職日期。 例如，[工作1 - 職位]、[工作1公司名稱]、[工作1日期範圍]和[工作2 -
                    職位]、[工作2公司名稱〕、[工作2日期範圍]。
                    <br><br>
                    此外，還應包括你的教育背景資訊，包括[你畢業的學校名稱]、[你的專業]和[你的畢業年份]。
        `,
        q2: `請幫助我改進簡歷，使其更具競爭力 [貼上你的簡歷]`,
        q3: `根據以下職位描述替我製作一封求職信 [貼上工作要求]`,
        q4: `根據以下提供的工作要求，您能否幫助我列出席3個工作必具備的特質？ [貼上工作描述]`,
        q5: `你能幫我歸納在 [面試公司＋職位] 時應該強調的要點嗎？`,
        q6: `你能幫我整理一份關於在 [面試公司＋職位] 的10個常見面試問題嗎？`,
        q7: `你能提供例子我應如何回答“A面試問題”嗎？`,
    }
})
// hooks
useHead({
    title: '履歷模板'
})
// methods
async function copyToMemory(key) {
    const text = state.template[key]
    await navigator.clipboard.writeText(text)
    $sweet.succeed({
        text: '已複製完整指令模板',
    })
}
</script>
<style lang="scss" scoped>
.chatgpt {
    padding: 20px 0;

    .chatgpt__instruction {
        border: solid 1px #d3d3d3;
        background-color: #eef6ed;
        padding: 18px;

        .instruction__header {
            font-size: 22px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.3;
            letter-spacing: normal;
            text-align: center;
            color: #5ea88e;
        }

        .chatgpt__desc {
            font-size: 15px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #333;
        }

        .instruction__list {
            display: flex;
            list-style: none;
            justify-content: space-between;
            margin-top: 32px;

            .list__item {
                font-size: 14px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.2;
                letter-spacing: normal;
                text-align: center;
                color: #5ea88e;
                max-width: 64px;

                .item__link {
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                        text-decoration-color: #5ea88e;
                    }
                }

                .item__badge {
                    width: 60px;
                    height: 60px;
                    flex-grow: 0;
                    border: solid 1px #d3d3d3;
                    background-color: #fff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: auto;

                    .badge__icon {
                        width: 31.5px;
                        height: 31.1px;
                    }
                }

                .item__text {
                    margin-top: 16px;
                }
            }
        }
    }

    .chatgpt__card {
        margin-top: 24px;

        .card__header {
            height: 7px;
            background-color: #5ea88e;
            border-radius: 8px 8px 0 0;
        }

        .card__body {
            padding: 20px;
            background-color: white;

            .body__title {
                font-size: 16px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #333;
            }

            .body__desc {
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #333;
                margin-top: 16px;
            }

            .body__btn {
                margin-top: 16px;
            }
        }
    }
}


@media screen and (min-width:992px) {
    .chatgpt {
        .chatgpt__instruction {
            border-radius: 10px;
            padding: 32px;

            .instruction__header {
                font-size: 32px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.3;
                letter-spacing: normal;
                color: #5ea88e;
            }

            .chatgpt__desc {
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: center;
                color: #333;
                margin-top: 32px;
            }

            .instruction__list {
                max-width: 800px;
                margin: auto;
                margin-top: 32px;

                .list__item {
                    max-width: unset;

                    .item__badge {
                        width: 90px;
                        height: 90px;

                        .badge__icon {
                            width: 48px;
                            height: 48px;
                        }
                    }

                    .item__text {
                        width: 100%;
                        font-size: 23px;
                        font-weight: bold;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1.3;
                        letter-spacing: normal;
                        color: #5ea88e;
                    }

                }
            }
        }

        .chatgpt__card {
            border-radius: 10px;
            display: flex;
            position: relative;
            border-radius: 8px 0 0 8px;
            overflow: hidden;

            .card__header {
                width: 8px;
                background-color: #5ea88e;
                border-radius: 8px 0 0 8px;
                position: absolute;
                left: 0;
                height: 100%;
            }

            .card__body {
                width: 100%;
                padding: 40px;

                .body__title {
                    font-size: 28px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: normal;
                    text-align: left;
                    color: #333;
                }

                .body__desc {
                    font-size: 18px;
                    font-weight: bold;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.5;
                    letter-spacing: normal;
                    text-align: left;
                    color: #333;

                }
            }
        }

        .body__btn {
            width: 226px;
        }
    }
}
</style>