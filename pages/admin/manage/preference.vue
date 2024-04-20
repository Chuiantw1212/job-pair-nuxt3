<template>
    <div class="preference">
        <h1 class="preference__header">企業檔案</h1>
        <hr />
        <div class="preference__card">
            <ul>
                <!-- v-model="state.companyInfo.preference.culture" required :items="repoSelect.state.questionsRes[5].items" -->
                <li>充滿競爭</li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
</template>
<script setup>
const repoSelect = useRepoSelect()
</script>
<style lang="scss" scoped>
.preference {
    background-color: #F9F9F9;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;

    .preference__header {
        color: #222;
        font-family: "PingFang TC";
        font-size: 36px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px;
    }

    .preference__card {
        border-radius: 10px;
        background: var(--Grays-Quin, #FFF);
    }
}
</style>