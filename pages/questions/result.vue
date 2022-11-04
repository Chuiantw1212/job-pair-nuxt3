<template>
    <div class="questions__result">
        <img class="result__leftImage" src="~/assets/questions/papers.png" />
        <img class="result__rightImage" src="~/assets/questions/guy.png" />
        <p class="result__header">Job Pair已依據您的求職偏好配對適合的職缺<br />立即查看潛在職缺有哪些吧！</p>
        <button type="button" class="result__button">看結果</button>
        <div class="result__tooltip" data-bs-toggle="tooltip" data-bs-placement="right"
            title="您剛剛選擇的內容為您的求職偏好，Job Pair將搭配企業端用人偏好的資訊，推薦您與您個人求職偏好相契合的公司與職缺。">
            甚麼是潛在適合職缺<i class="far fa-question-circle tooltip__icon"></i>
        </div>
        <div class="mt-3">
            <button type="button" class="btn btn-light">修改偏好答案</button>
        </div>
    </div>
</template>