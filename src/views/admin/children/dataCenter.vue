<template>
<div>
    <ParkSmallCard/>
    <div class="container-fluid" style="opacity: 0.9;">
        <div class="d-flex flex-row">
            <ParkTodayIncome/>
            <ParkCarStatus/>
            <ParkRank/>
        </div>
        <div class="d-flex flex-row">
            <ParkInOut/>
            <ParkInCarInfo/>
            <ParkOutCarInfo/>
        </div>
        <div class="d-flex flex-row">
            <ParkBerthRate/>
            <ParkAbnormalOp/>
        </div>
    </div>
</div>
</template>

<script>
import ParkSmallCard from '@/components/datacenter/ParkSmallCard.vue'
import ParkTodayIncome from '@/components/datacenter/ParkTodayIncome.vue'
import ParkCarStatus from '@/components/datacenter/ParkCarStatus.vue'
import ParkRank from '@/components/datacenter/ParkRank.vue'
import ParkInOut from '@/components/datacenter/ParkInOut.vue'
import ParkInCarInfo from '@/components/datacenter/ParkInCarInfo.vue'
import ParkOutCarInfo from '@/components/datacenter/ParkOutCarInfo.vue'
import ParkBerthRate from '@/components/datacenter/ParkBerthRate.vue'
import ParkAbnormalOp from '@/components/datacenter/ParkAbnormalOp.vue'

export default {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (!vm.$store.getters.adminToken) {
                vm.$message({
                    message: '当前未登录,请先登录!',
                    type: 'warning',
                    center: true
                })
                vm.$store.commit('DELETE')
                // vm.$router.push('/').catch(err => {
                //     if (err) throw err
                // })
                // setTimeout(() => {
                //     location.reload()
                // }, 1000)
            } else {
                vm.$store.dispatch('change', {
                    index: '1',
                    title: '数据中心'
                })
            }
        })
    },
    name: 'datacenter',
    components: {
        ParkSmallCard,
        ParkTodayIncome,
        ParkCarStatus,
        ParkRank,
        ParkInOut,
        ParkInCarInfo,
        ParkOutCarInfo,
        ParkBerthRate,
        ParkAbnormalOp
    }
}
</script>

<style scoped>
</style>
