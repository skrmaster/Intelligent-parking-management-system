<template>
<div class="container-fluid">
    <div class="tableSet">
        <el-table :data="memberTable.slice(start, end)" 
        :header-cell-style="{'background-color':'#f3f8fe'}" 
        width="100%" 
        border
        >
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row type="flex" class="tabelContextSet">
                        <el-col :span="4">
                            <div class="detailed">详细信息</div>
                        </el-col>
                        <el-col :span="10">
                            <el-row>
                                <el-col :span="8">
                                    <div class="titleSet bgco">创建日期</div>
                                    <div class="titleSet bgco">购买日期</div>
                                    <div class="titleSet bgco">车辆品牌</div>
                                    <div class="titleSet bgco">限行</div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="titleSet">{{ scope.row.createDate || '无' | dateHandle }}</div>
                                    <div class="titleSet">{{ scope.row.buyDate || '无' | dateHandle}}</div>
                                    <div class="titleSet">{{ scope.row.carBrand || '无' }}</div>
                                    <div class="titleSet">{{ scope.row.trafficRestriction || '无' }}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="10">
                            <el-row>
                                <el-col :span="8">
                                    <div class="titleSet bgco">车位</div>
                                    <div class="titleSet bgco">地址</div>
                                    <div class="titleSet bgco">套餐</div>
                                    <div class="titleSet border-right-0"><span style="visibility: hidden">123</span></div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="titleSet">{{ scope.row.carPark || '无' }}</div>
                                    <div class="titleSet">{{ scope.row.address || '无' }}</div>
                                    <div class="titleSet">{{ scope.row.setMeal || '无' }}</div>
                                    <div class="titleSet border-left-0"><span style="visibility: hidden">123</span></div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label="月卡编号" prop="id" width="150"></el-table-column>
            <el-table-column label="车主姓名" prop="carMaster" width="80"></el-table-column>
            <el-table-column label="车牌号" prop="carId" width="100"></el-table-column>
            <el-table-column label="电话号码" prop="phone" width="100"></el-table-column>
            <el-table-column label="开始时间" prop="start" width="200"></el-table-column>
            <el-table-column label="结束时间" prop="end" width="200"></el-table-column>
            <el-table-column label="备注" prop="remarks" width="200"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-row type="flex" justify="center" align="center">
                        <el-col :span="4">
                            <span class="opSet" @click="handleEdit(scope.$index, scope.row)">编辑</span>
                        </el-col>
                        <el-col :span="4">
                            <span class="opSet" @click="handleRenew(scope.$index, scope.row)">续费</span>
                        </el-col>
                        <el-col :span="4">
                            <span class="opSet" @click="handleDelete(scope.$index, scope.row)">删除</span>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="container-fluid mt-2">
        <div class="p-3">
            <div class="row d-flex justify-content-end">
                <div class="block">
                    <el-pagination background :current-page="currentPage" :page-sizes="[10, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" popper-class="obj" @current-change="handleCurrentChange" @size-change="handleSizeChange" @prev-click="prePage" @next-click="nexPage">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Member',
    components: {

    },
    data() {
        return {
            start: 0,
            end: 10,
            currentPage: 1,
            size: 10
        }
    },
    computed: {
        memberTable () {
            return this.$store.getters.memberTableData
        },
        total() {
            return this.$store.getters.memberTableData.length
        }
    },
    methods: {
        prePage(val) {
            if (val === 1) {
                this.start = 0 * this.size;
                this.end = this.size;
            } else {
                this.start = this.size * (val - 1);
                this.end = (this.size + this.size) * (val - 1);
            }
        },
        nexPage(val) {
            this.start = this.size * (val - 1);
            this.end = (this.size + this.size) * (val - 1);
        },
        handleSizeChange(val) {
            this.size = val;
            this.start = this.size * 0;
            this.end = this.size;
        },
        handleCurrentChange(val) {
            if (val === 1) {
                this.start = 0 * this.size;
                this.end = this.size;
            } else {
                this.start = this.size * (val - 1);
                this.end = (this.size + this.size) * (val - 1);
            }
            this.$store.dispatch("saveCurrentExportOrder");
        },
        handleDelete(index, row) {
            this.$confirm("是否删除订单", "确认信息", {
                    distinguishCancelAndClose: true,
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
            })
            .then(() => {
                this.axios
                    .post("/api/memberDelete", row)
                    .then((res) => {
                        if (res.data.err_code === 0) {
                            this.$message({
                                type: "success",
                                message: "删除成功",
                            });
                            this.$store.dispatch("mdeleteRow", index);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((action) => {
                this.$message({
                    type: "warning",
                    message: action === "cancel" ? "取消删除" : "停留在当前页面",
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin divBorder {
    border: 1px solid #dee2e6;
}

.tabelContextSet {
    font-size: 14px;
    text-align: center;
}

.detailed {
    @include divBorder;
    padding: 66px 0 67px 0;
}

.titleSet {
    @include divBorder;
    padding: .5rem;
}

.bgco {
    background-color: #f3f8fe;
}

.opSet {
    color: blue;
    cursor: pointer;

    &:hover {
        text-decoration: underline 2px;
    }
}

.tableSet {
    height: 520px;
    overflow: auto;
}
</style>
