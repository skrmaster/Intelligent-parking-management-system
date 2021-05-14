<template>
  <div>
    <div class="container-fluid">
      <el-row class="tableSet">
        <el-table
          @select="partRow"
          @select-all="allRow"
          ref="filterTable"
          :data="tableData.slice(start, end)"
          width="100%"
          border
          :header-cell-style="{'background-color':'#f3f8fe'}"
        >
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column prop="index" label="编号" width="100">
          </el-table-column>
          <el-table-column prop="carId" label="车牌号" width="127">
          </el-table-column>
          <el-table-column prop="payStatus" label="支付状态" width="100">
            <template slot-scope="scope">
              <span
                :style="
                  scope.row.payStatus === '未支付'
                    ? 'color:red;font-weight: 900;'
                    : ''
                "
                disable-transitions
                >{{ scope.row.payStatus }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="payway" label="支付方式" width="100">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.payway === '在线支付' ? 'primary' : 'success'"
                disable-transitions
                >{{ scope.row.payway }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="money" label="收款金额" width="100">
          </el-table-column>
          <el-table-column prop="parkId" label="车场" width="50">
          </el-table-column>
          <el-table-column prop="inparkway" label="进场通道" width="80">
          </el-table-column>
          <el-table-column prop="outparkway" label="出场通道" width="80">
          </el-table-column>
          <el-table-column prop="start" label="进场时间" width="200">
          </el-table-column>
          <el-table-column prop="end" label="出场时间" width="200">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-col :offset="6" :span="6">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    circle
                  ></el-button>
                </el-col>
                <el-col :span="12">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    icon="el-icon-delete"
                    circle
                  ></el-button>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <OrderEdit/>
    <div class="container-fluid mt-2">
      <div class="p-3">
        <div class="row d-flex justify-content-end">
          <div class="block">
            <el-pagination
              background
              :current-page="currentPage"
              :page-sizes="[10, 20]"
              :page-size="size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              popper-class="obj"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              @prev-click="prePage"
              @next-click="nexPage"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderEdit from "@/components/order/OrderEdit.vue";
export default {
  name: "OrderList",
  components: {
    OrderEdit,
  },
  data() {
    return {
      search: "",
      start: 0,
      end: 10,
      currentPage: 1,
      size: 10,
    };
  },
  computed: {
    tableData() {
      return this.$store.getters.tableData;
    },
    total() {
      return this.$store.getters.tableData.length;
    },
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterPayway(value, row) {
      return row.payway === value;
    },
    handleEdit(index, row) {
      this.$store.dispatch("open", "edit");
      this.$store.dispatch({
        type: "initEditForm",
        row: row,
        index: index,
      });
    },
    handleDelete(index, row) {
      this.$confirm("是否删除订单", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.axios
            .post("/api/orderDelete", row)
            .then((res) => {
              if (res.data.err_code === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功",
                });
                this.$store.dispatch("deleteRow", index);
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
          });
        });
    },
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
    partRow(selection) {
      this.$store.dispatch("updateExportRow", selection);
    },
    allRow() {
      this.$store.dispatch("updateExportRow", this.$store.getters.tableData);
    },
  },
};
</script>

<style scoped>
.tableSet {
  height: 520px;
  overflow: auto;
}
</style>
