<template>
    <div class="footer">
        <div class="footer__meta">
            <NuxtLink class="meta__button" :to="{ name: 'about' }">關於Job Pair</NuxtLink>
            <a class="meta__button" target="_blank"
                href="https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/%E4%BD%BF%E7%94%A8%E8%80%85%E6%A2%9D%E6%AC%BE.pdf">使用者條款</a>
            <a class="meta__button" target="_blank"
                href="https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/%E5%80%8B%E4%BA%BA%E8%B3%87%E6%96%99%E4%BF%9D%E8%AD%B7%E7%AE%A1%E7%90%86%E6%94%BF%E7%AD%96%20v2.pdf">隱私權政策</a>
        </div>
        <div class="footer__info">
            <div>客服信箱：support@job-pair.com</div>
            <div class="mt-1">Copyright © 2022 Job Pair Co.,Ltd.</div>
        </div>
    </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.footer {
    background-color: #5e5a52;
    width: 100%;
    margin: 0 auto;
    height: auto;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 0;
    font-size: 12px;
    z-index: 10;

    .footer__meta {
        text-align: center;
        display: flex;
        gap: 8px;
        justify-content: center;
        flex-wrap: wrap;

        .meta__button {
            border-radius: 10px;
            border: solid 1px #fff;
            background-color: inherit;
            color: white;
            padding: 10px 50px;
            font-size: 18px;
            text-decoration: none;
            cursor: pointer;
            white-space: nowrap;
        }
    }

    .footer__info {
        text-align: center;
        margin-top: 20px;
        font-size: 16px;
    }
}

@media screen and (min-width: 991px) {
    .footer {
        padding: 2rem;
    }
}
</style>