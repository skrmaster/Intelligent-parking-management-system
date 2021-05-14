<template>
<el-container>
    <aside-nav></aside-nav>
    <el-container>
        <el-header class="p-0 m-0">
            <header-nav></header-nav>
        </el-header>
        <el-main class="p-0">
            <router-view class="setmain"></router-view> 
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import asideNav from '@/components/TheAsideNav.vue'
import headerNav from '@/components/TheHeaderNav.vue'

export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if(!vm.$store.getters.adminToken) {
                vm.$store.commit('DELETE')
                vm.$router.push('/').catch(err => {
                    if (err) throw err
                })
                setTimeout(() => { location.reload() }, 100)
            }
        })
    },
    name: 'admin',
    components: {
        asideNav,
        headerNav
    }
}
</script>

<style scoped>
.setmain{
    height: 701px;
    overflow: auto;
}
</style>
