<template>
    <div class="questions">
        <div class="questions__card">
            最後一個步驟
            <img class="questions__leftImage" src="~/assets/questions/left.png" />
            <img class="questions__rightImage" src="~/assets/questions/right.png" />
            <div class="questions__questionGroup">
                <h2 class="questionGroup__header">最後一個步驟，就完成會員註冊囉！</h2>
                <div class="questionGroup__body">
                    <button class="body__button body__button--left" type="button">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="body__inputOptions">
                        <label class="inputOptions__singleSelect">
                            <!-- <input v-show="false" v-model="state.tempUser.preference[questionGroup.key]" type="radio"
                                :id="`inputOptions__singleSelect${item.value}`" :value="item.value"
                                @click="setAnswers(item.value, questionGroup.key)" /> -->
                            <span class="label__description">123</span>
                        </label>
                    </div>
                    <button class="body__button body__button--right" type="button">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.questions {
    position: relative;

    .questions__description {
        padding: 12px 36px;
        background-color: rgba(255, 243, 205, 0.6);
        color: #856404;
        font-size: 14px;
        font-weight: normal;
        text-align: center;
    }

    .questions__progress {
        margin: 30px auto 50px auto;
    }

    .questions__leftImage {
        position: absolute;
        left: 0;
        width: 15vw;
        top: 0;
        z-index: -1;
    }

    .questions__rightImage {
        position: absolute;
        right: 0;
        width: 15vw;
        bottom: 0;
    }

    .questions__card {
        background-color: white;
        min-height: calc(100vh - 88px);
        z-index: 10;
        position: relative;
        padding-bottom: 97px;

        .questions__questionGroup {
            width: 100%;

            .questionGroup__header {
                text-align: center;
                font-size: 28px;
                margin-bottom: 30px;
                font-weight: bold;
                color: #484848;
            }

            .questionGroup__body {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                max-width: 248px;
                margin: auto;

                .body__options {
                    z-index: 10;
                }

                .body__button {
                    background-color: unset;
                    border: none;
                    font-size: 21px;
                    z-index: 10;
                    position: absolute;
                    padding: 10px;
                }

                .body__button--left {
                    left: 0;
                }

                .body__button--right {
                    right: 0;
                }

                .body__inputOptions {
                    width: 100%;
                    margin: auto;

                    .inputOptions__singleSelect {
                        width: 100%;
                        // height: 50px;
                        border-radius: 100px;
                        border: 1px solid #317292;
                        background-color: #fdfdfd;
                        font-size: 14px;
                        font-weight: 500;
                        display: flex;
                        justify-content: center;
                        cursor: pointer;
                        color: #317292;
                        padding: 8px 30px;

                        &:not(:first-child) {
                            margin-top: 20px;
                        }

                        &:hover {
                            color: #80a7c2;
                            border: solid 1px #80a7c2;
                        }

                        .label__description {
                            align-self: center;
                        }
                    }

                    .inputOptions__singleSelect--selected {
                        background-color: #317292;
                        color: white !important;
                    }
                }
            }
        }
    }

    .questions__result {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 128px 5vw 200px 5vw;
        min-height: calc(100vh - 88px);

        .result__leftImage {
            position: absolute;
            left: 0;
            width: 30vw;
            top: 0;
        }

        .result__rightImage {
            position: absolute;
            right: 0;
            width: 30vw;
            bottom: 64px;
        }

        .result__header {
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            line-height: 45px;
            margin-bottom: 64px;
            z-index: 10;
        }

        .result__button {
            background-color: #2ec5bf;
            color: white;
            font-size: 20px;
            height: 50px;
            border-radius: 100px;
            width: 234px;
            border: none;
            margin-bottom: 8px;
        }

        .result__tooltip {
            .tooltip__icon {
                margin-left: 8px;
            }
        }
    }
}

.result__tooltip {
    width: fit-content;
    block-size: fit-content;
}

@media screen and (min-width: 991px) {
    .questions {
        .questions__description {
            padding: 22px auto;
            font-size: 16px;
        }

        .questions__card {
            .questions__questionGroup {
                .questionGroup__body {
                    max-width: 616px;
                    position: relative;

                    .body__button {
                        font-size: 21px;
                    }

                    .body__button--left {
                        left: 0;
                        transform: translateX(calc(-100% - 50px));
                    }

                    .body__button--right {
                        right: 0;
                        transform: translateX(calc(100% + 50px));
                    }

                    .body__inputOptions {
                        .inputOptions__singleSelect {
                            font-size: 17px;
                            height: 50px;
                        }
                    }
                }
            }
        }
    }
}
</style>