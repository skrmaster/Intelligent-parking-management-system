<template>
<el-main v-loading="loading" element-loading-text="请先登录" style="width: 100%; ">
    <div class="container-fluid" style="opacity: 0.9;">
        <div class="d-flex flex-row">
            <div class="col-xl-4 p-0">
                <div class="my-3 mr-4 border shadow row_three">
                    <div>
                        <div class="px-3">
                            <div class="mt-1 title_line">
                                <p class="pl-2 font-weight-bold">今日收入汇总</p>
                            </div>
                        </div>
                        <div>
                            暂无数据
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 p-0">
                <div class="my-3 mr-4 border shadow row_three">
                    <div>
                        <div class="px-3">
                            <div class="mt-1 title_line">
                                <p class="pl-2 font-weight-bold">车辆状态</p>
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
                                    <tr>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1">出</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 px-0">
                <div class="my-3 border shadow row_three">
                    <div class="px-3">
                        <div class="mt-1 title_line">
                            <p class="pl-2 font-weight-bold">今日收费车场排行</p>
                        </div>
                        <div>
                            ---
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex flex-row">
            <div class="col-xl-4 px-0">
                <div class="my-3 mr-4 border shadow row_three">
                    <div class="px-3">
                        <div class="mt-1 title_line">
                            <p class="pl-2 font-weight-bold">进出车辆统计</p>
                        </div>
                        <div class="py-4">
                            ---
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 p-0">
                <div class="my-3 mr-4 border shadow row_three">
                    <div>
                        <div class="px-3">
                            <div class="mt-1 title_line">
                                <p class="pl-2 font-weight-bold">入场车辆信息</p>
                            </div>
                        </div>
                        <div>
                            <table class="table table-striped m-0 text-center">
                                <thead>
                                    <tr>
                                        <th scope="col" class="border-0">通道名称</th>
                                        <th scope="col" class="border-0">时间</th>
                                        <th scope="col" class="border-0">车牌号</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="py-1">-</td>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 p-0">
                <div class="my-3 mr-4 border shadow row_three">
                    <div>
                        <div class="px-3">
                            <div class="mt-1 title_line">
                                <p class="pl-2 font-weight-bold">出场车辆信息</p>
                            </div>
                        </div>
                        <div>
                            <table class="table table-striped m-0 text-center">
                                <thead>
                                    <tr>
                                        <th scope="col" class="border-0">通道名称</th>
                                        <th scope="col" class="border-0">时间</th>
                                        <th scope="col" class="border-0">车牌号</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="py-1">-</td>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                    <tr>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                        <td class="py-1">---</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</el-main>
</template>

<script>
export default {
    name: "Content",
    data() {
        return {
            loading: true,
        }
    }
}
</script>

<style scoped></style>
