<template>
    <div class="footer" :class="{ 'footer--admin': state.isAdmin }">
        <img class="footer__logo" alt="logo" src="./Vector.svg">
        <div class="footer__rights">
            @ 2023 Job Pair . All rights reserved.
        </div>
        <div class="footer__textGroups">
            <!-- <div class="textGroups__anchor">
                <img class="anchor__image" alt="logo" src="./link.svg">
            </div> -->
            <a class="textGroups__anchor"
                href="https://storage.googleapis.com/public.prd.job-pair.com/meta/%E4%BD%BF%E7%94%A8%E8%80%85%E6%A2%9D%E6%AC%BE.pdf">
                條款
            </a>
            <a class="textGroups__anchor"
                href="https://storage.googleapis.com/public.prd.job-pair.com/meta/%E5%80%8B%E4%BA%BA%E8%B3%87%E6%96%99%E4%BF%9D%E8%AD%B7%E7%AE%A1%E7%90%86%E6%94%BF%E7%AD%96%20v2.pdf">
                隱私政策
            </a>
        </div>
    </div>
</template>
<script setup>
const route = useRoute()
const state = reactive({
    isAdmin: null
})
watch(() => route, (newRoute) => {
    state.isAdmin = newRoute.path.includes('admin')
}, { immediate: true })
</script>
<style lang="scss" scoped>
.footer {
    background: #0AB378;
    text-align: center;
    padding: 10px 0px;

    .footer__rights {
        color: #E2E8F0;
        margin-top: 10px;
    }

    .footer__logo {
        width: 85px;
    }

    .footer__textGroups {
        color: #E2E8F0;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .textGroups__anchor {
            padding: 12px;
            color: white;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }

            .anchor__image {
                width: 54px;
            }
        }
    }

}

.footer--admin {
    background: #32D7D1;
}

@media screen and (min-width: 991px) {
    .footer {
        display: flex;
        align-items: center;
        padding: 24px 96px;

        .footer__rights {
            margin: 0;
            margin-left: 48px;
        }

        .footer__textGroups {
            margin-left: auto;
        }
    }
}
</style>