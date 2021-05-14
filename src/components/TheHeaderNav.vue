<template>
<el-header class="shadow">
    <el-row type="flex" justify="space-between">
        <el-col :span="12">
            <div class="p-3 font-weight-bold">{{ title }}</div>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" justify="end">
                <div class="d-flex justify-content-around" v-if="!userstatus">
                    <div class="p-3">
                        <router-link to="/login">登录</router-link>
                    </div>
                    <div class="p-3">
                        <router-link to="/register">注册</router-link>
                    </div>
                </div>
                <div v-if="userstatus" class="d-flex justify-content-around align-items-center pt-1">
                    <div class="mr-3">{{ username }}</div>
                    <div class="block">
                        <el-avatar v-if="show" :size="50" :src="circleUrl"></el-avatar>
                        <el-avatar v-else :size="50">{{userDefault}}</el-avatar>
                    </div>
                    <div class="ml-3">
                        <el-button @click="loginout()" type="text">
                            <i class="bi bi-box-arrow-right"></i>注销登录
                        </el-button>
                    </div>
                </div>
            </el-row>
        </el-col>
    </el-row>
</el-header>
</template>

<script>
export default {
    name: 'headerNav',
    data() {
        return {
            circleUrl: '',
            show: true,
            userDefault: ''
        }
    },
    computed: {
        userstatus() {
            return !!this.$store.getters.adminToken
        },
        username() {
            return this.$store.getters.adminInfo
        },
        title() {
            return this.$store.getters.title
        }
    },
    methods: {
        loginout() {
            this.$store.commit('DELETE')
            this.$router.push('/').catch((err) => {
                if (err) throw err
            })
            location.reload()
        }
    },
    mounted() {
        if (this.$store.getters.adminToken) {
            this.axios.get(`/api/avatarGet?key=${this.$store.getters.adminInfo}`).then(res => {
                if (res.data.avatar === 'default') {
                    this.show = false
                    this.userDefault = this.$store.getters.adminInfo
                } else {
                    this.show = true
                    res !== undefined ?
                        this.circleUrl = `/api/public/img/avatar/${res.data.avatar}` :
                        console('res undefined')
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped></style>
