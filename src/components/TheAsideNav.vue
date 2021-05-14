<template>
<el-aside class="mh-100" width="160px">
    <el-row>
        <el-col class="asidewholeset" :span="24">
            <el-menu :default-active="activeIndex" class="border-0" background-color="#272c54" text-color="#fff" active-text-color="#ffd04b">
                <div class="pl-4 my-3">
                    <el-image src="/api/public/img/logo.png"></el-image>
                </div>
                <el-menu-item index="1" @click="goDataCenter()">
                    <i class="el-icon-tickets"></i>
                    <span>数据中心</span>
                </el-menu-item>
                <el-menu-item index="2" @click="goOrder()">
                    <i class="el-icon-s-order"></i>
                    <span>订单管理</span>
                </el-menu-item>
                <el-menu-item index="3" @click="goMembers()">
                    <i class="el-icon-user"></i>
                    <span>月卡会员</span>
                </el-menu-item>
                <el-menu-item index="4" @click="goPersonal()">
                    <i class="el-icon-setting"></i>
                    <span>账号管理</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</el-aside>
</template>

<script>
export default {
    name: 'asideNav',
    data() {
        return {
            url: ''
        }
    },
    computed: {
        activeIndex: {
            get () {
                return this.$store.getters.activeIndex
            },
            set (val) {
                this.$store.commit('CHANGE_TITLE_INDEX', val)
            }
        }
    },
    methods: {
        goDataCenter () {
            if (this.$store.getters.activeIndex === '1') {
                return
            } else {
                this.$store.dispatch('change', {title: '数据中心', index: '1'})
                this.$router.push('/admin/datacenter')
                .catch((err) => {
                    if (err) throw err
                })
            }
        },
        goOrder () {
            if (this.$store.getters.activeIndex === '2') {
                return
            } else {
                this.activeIndex = '2'
                this.$store.dispatch('change', {title: '订单管理', index: '2'})
                this.$router.push({name: 'order'})
                .catch((err) => {
                    if (err) throw err
                })
            }
        },
        goMembers () {
            if (this.$store.getters.activeIndex === '3') {
                return
            } else {
                this.activeIndex = '3'
                this.$store.dispatch('change', {title: '会员管理', index: '3'})
                this.$router.push('/admin/members')
                .catch((err) => {
                    if (err) throw err
                })
            }
        },
        goPersonal () {
            if (this.$store.getters.activeIndex === '4') {
                return
            } else {
                this.activeIndex = '4'
                this.$store.dispatch('change', {title: '账号管理', index: '4'})
                this.$router.push({name: 'personal', params: {userId: 'user'}, query: this.$store.getters.adminInfo})
                .catch((err) => {
                    if (err) throw err
                })
            }
        }
    },
    mounted() {
        
    },
}
</script>

<style scoped>
.asidewholeset {
    height: 100vh;
    background-color: #272c54;
}
</style>
