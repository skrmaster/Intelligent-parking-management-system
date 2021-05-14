<template>
<div class="col-xl-6 p-0">
    <div class="my-3 border shadow row_two">
        <div>
            <div class="px-3">
                <div class="mt-1 title_line">
                    <p class="pl-2 font-weight-bold">异常抬杆记录</p>
                </div>
            </div>
            <div class="overflow-auto" style="height:280px">
                <table class="table table-striped m-0 text-center">
                    <thead>
                        <tr>
                            <th scope="col" class="border-0">通道名称</th>
                            <th scope="col" class="border-0">时间</th>
                            <th scope="col" class="border-0">收费员</th>
                            <th scope="col" class="border-0">原因</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in tableData" :key="index">
                            <td class="py-1">{{item.passageway}}</td>
                            <td class="py-1">{{item.time}}</td>
                            <td class="py-1">{{item.who}}</td>
                            <td class="py-1">{{item.reason}}</td>
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
            tableData: []
        }
    },
    methods: {
        init() {
            this.axios.get('/api/parkAbnormalOp').then(res => {
                res.data !== undefined
                ? this.tableData = res.data.table
                : console.log(res.data)
            }).catch(err => {
                if (err) throw err
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
