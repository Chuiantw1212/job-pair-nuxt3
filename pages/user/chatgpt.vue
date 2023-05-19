<template>
    <div class="chatgpt">
        <div class="chatgpt__instruction">
            <h1 class="instruction__header">JobGPT 快速更新或改善簡歷</h1>
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
                        複製
                    </div>
                </li>
                <li class="list__item">
                    <div class="item__badge">
                        <img class="badge__icon" src="@/assets/user/chatgpt/Frame (1).svg">
                    </div>
                    <div class="item__text">
                        開啟ChatGPT
                    </div>
                </li>
                <li class="list__item">
                    <div class="item__badge">
                        <img class="badge__icon" src="@/assets/user/chatgpt/Frame (2).svg">
                    </div>
                    <div class="item__text">
                        貼上
                    </div>
                </li>
                <li class="list__item">
                    <div class="item__badge">
                        <img class="badge__icon" src="@/assets/user/chatgpt/Frame (3).svg">
                    </div>
                    <div class="item__text">
                        快速更新簡歷
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.chatgpt {
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
}
</style>