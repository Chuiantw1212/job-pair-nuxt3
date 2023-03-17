<template>
    <div id="app" class="app w-100">
        <LazyOrganismHeader />
        <div class="main">
            <slot>
            </slot>
        </div>
        <LazyOrganismFooter />
    </div>
</template>
<script setup>
const { $VConsole, $liff } = useNuxtApp()
const repoLine = useRepoLine()
const repoSelect = useRepoSelect()
onMounted(async () => {
    await Promise.all([
        repoSelect.getSelectByQuery(),
        repoSelect.getLocation(),
        repoSelect.getIndustryCategory(),
        repoSelect.getQuestions()
    ])
    // return
    // Fetch user profile
    try {
        await startLiff()
    } catch (error) {
        console.log(error)
    }
})
async function startLiff() {
    // 或者使用配置参数进行初始化
    const vConsole = new $VConsole({ theme: 'dark' });
    console.log({
        vConsole
    });
    // 调用 console 方法输出日志
    console.log('Hello world');
    if ($liff) {
        const profile = await $liff.getProfile()
        console.log({
            profile
        });
        state.profile = profile
        // const getProfileExample = {
        //     "userId": "U4af4980629...",
        //     "displayName": "Brown",
        //     "pictureUrl": "https://profile.line-scdn.net/abcdefghijklmn",
        //     "statusMessage": "Hello, LINE!"
        // }
        if (profile) {
            const { userId = '' } = profile
            console.log({
                userId
            });
            const LinkTokenRes = await repoLine.issueLinkToken({
                userId: userId
            })
            // const issueLinkTokenExample = {
            //     "linkToken": "NMZTNuVrPTqlr2IF8Bnymkb7rXfYv5EY"
            // }
            state.linkToken = LinkTokenRes
            console.log({
                response
            });
        }
    }
}
</script>
<style lang="scss">
.app {
    // https://web.dev/font-display/
    font-display: swap;
    font-family: 'Noto Sans TC', sans-serif, 'charter', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif';
    padding-top: 58px;
    background-color: #ecf3f6;
    overflow-x: hidden;
}

.main {
    min-height: calc(100vh - 243px);
}

body {
    // https://codepen.io/ckeditor/pen/VqXYQq
    /* We need to assaign this CSS Custom property to the body instead of :root, because of CSS Specificity and codepen stylesheet placement before loaded CKE5 content. */
    --ck-z-default: 100;
    --ck-z-modal: calc(var(--ck-z-default) + 999);
}

.container {
    min-height: 100vh;
}
</style>