<template>
<div class="col-xl-4 p-0">
    <div class="my-3 mr-4 border shadow row_three">
        <div>
            <div class="px-3">
                <div class="mt-1 title_line">
                    <p class="pl-2 font-weight-bold">车场状态</p>
                </div>
            </div>
            <div>
                <table class="table table-striped m-0 text-center">
                    <thead>
                        <tr>
                            <th scope="col" class="border-0">状态</th>
                            <th scope="col" class="border-0">名称</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in statusTable" :key=index>
                            <td class="py-1">{{handle(item.status)}}</td>
                            <td class="py-1">{{item.name}}</td>
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
            statusTable: [{
                status: '',
                name: ''
            }]
        }
    },
    methods: {
        init () {
            this.axios.get('/api/datashowParkStatus').then(res => {
                if (res.data.err_code === 0) {
                    this.statusTable = res.data.parkStatus
                } else {
                    console.log(res.data)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        handle(val) {
            if (val === 0) {
                return '正常'
            } else if (val === 1) {
                return '即将满'
            } else {
                return '满'
            }
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style>

</style>
