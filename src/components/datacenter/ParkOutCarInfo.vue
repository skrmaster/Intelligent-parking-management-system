<template>
<div class="col-xl-4 p-0">
    <div class="my-3 border shadow row_three">
        <div>
            <div class="px-3">
                <div class="mt-1 title_line">
                    <p class="pl-2 font-weight-bold">出场车辆信息</p>
                </div>
            </div>
            <div class="overflow-auto">
                <table class="table table-striped m-0 text-center">
                    <thead>
                        <tr>
                            <th scope="col" class="border-0">通道名称</th>
                            <th scope="col" class="border-0">时间</th>
                            <th scope="col" class="border-0">车牌号</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tableData" :key="index">
                            <td class="py-1">{{ item.passageway }}</td>
                            <td class="py-1">{{ item.time }}</td>
                            <td class="py-1">{{ item.carId }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            tableData:[]
        }
    },
    methods: {
        init() {
            this.axios.get('/api/parkOutCarInfo').then(res => {
                res !== undefined
                ? this.tableData = res.data.table
                : console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style>

</style>
