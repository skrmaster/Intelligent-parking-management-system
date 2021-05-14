<template>
<el-container>
    <aside-nav></aside-nav>
    <el-container>
        <el-header class="p-0 m-0">
            <header-nav></header-nav>
        </el-header>
        <el-main>
            <content-main></content-main>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import asideNav from '@/components/TheAsideNav.vue'
import headerNav from '@/components/TheHeaderNav.vue'
import contentMain from '@/components/TheContent.vue'
export default {
    name: 'Home',
    components: {
        asideNav,
        headerNav,
        contentMain
    }
}
</script>

<style scoped>

</style>
