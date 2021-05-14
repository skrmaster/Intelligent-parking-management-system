<template>
<div class="col-xl-4 p-0">
    <div class="my-3 mr-4 border shadow row_three">
        <div class="px-3">
            <div class="mt-1 title_line">
                <p class="pl-3 font-weight-bold">今日收入汇总</p>
            </div>
            <el-row>
                <el-col :span="18">
                    <el-row type="flex" justify="center">
                        <el-col :span="8">
                            <el-progress :width="80" type="circle" color="#78b6f5" :percentage="crash"></el-progress>
                        </el-col>
                        <el-col :span="8">
                            <el-progress :width="80" type="circle" color="#e553a5" :percentage="online"></el-progress>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="9">
                            <el-progress :width="80" type="circle" color="#fe9d41" :percentage="coupon"></el-progress>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="colorTitle" style="font-size: 12px">
                    <div class="mt-5">现金</div>
                    <div class="mt-2">在线支付</div>
                    <div class="mt-2">使用优惠券</div>
                </el-col>
            </el-row>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            crash: 0,
            online: 0,
            coupon: 0
        }
    },
    methods: {
        init() {
            this.axios.get('/api/datashowMoney').then(res => {
                if (res !== undefined) {
                    this.crash = res.data.crash
                    this.online = res.data.e_crash
                    this.coupon = res.data.coupon
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        if (this.$store.getters.adminToken) {
            this.init()
        }
    }
}
</script>

<style scoped>
.colorTitle div:nth-child(1) {
    text-indent: 1em;
    border-left: 18px solid #78b6f5
}

.colorTitle div:nth-child(2) {
    text-indent: 1em;
    border-left: 18px solid #e553a5
}

.colorTitle div:nth-child(3) {
    text-indent: 1em;
    border-left: 18px solid #fe9d41
}
</style>
