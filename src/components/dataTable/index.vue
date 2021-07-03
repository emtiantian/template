<template>
  <div>
    <el-table
      :data="tableData"
      :stripe="true"
      :border="true"
      style="width: 100%"
    >
      <template v-for="item in tableParam">
        <el-table-column
          v-if="item.prop !== 'button'"
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
        ></el-table-column>
        <el-table-column v-else :key="item.prop" :label="item.label">
          <template slot-scope="scope">
            <template v-for="button in item.button">
              <el-popconfirm
                :title="button.popconfirm.label"
                v-if="button.popconfirm && button.popconfirm.val"
                :key="button.key"
                @confirm="buttonClick(button, scope)"
              >
                <el-button slot="reference" :type="button.type">
                  {{ button.label }}
                </el-button>
              </el-popconfirm>
              <el-button
                :type="button.type || 'primary'"
                @click="buttonClick(button, scope)"
                :key="button.key"
                v-else
              >
                {{ button.label }}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      small
      :total="total"
      :current-page="currentPage"
      :page-size="tableParam.pageSize"
      @current-change="currentChange"
      :layout="tableParam.layout"
      :hide-on-single-page="true"
      style="text-align: right"
    ></el-pagination>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
export default {
  props: {
    param: {
      type: Array,
      default: () => {
        return [
          {
            prop: "haohe",
            label: "姓名",
            type: "column",
          },
          {
            prop: "button",
            type: "button",
            label: "操作",
            button: [
              {
                key: "update",
                label: "编辑",
              },
              {
                key: "delete",
                label: "删除",
                popconfirm: { val: true, label: "确认删除么" },
                type: "danger",
              },
            ],
          },
        ];
      },
    },
    data: {
      type: Array,
      require: true,
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          pageSize: 10,
          layout: "total, prev, pager, next",
        };
      },
    },
  },
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页码
      total: 0, // 总条数
    };
  },
  created() {
    this.init();
  },
  computed: {
    tableParam() {
      return this.param;
    },
    tablePagination() {
      return this.pagination;
    },
  },
  methods: {
    init() {
      this.currentPage = 1;
      this.total = this.data.length;
      this.tableData = cloneDeep(this.data).splice(
        0,
        this.tablePagination.pageSize
      );
    },
    currentChange(val) {
      this.currentPage = val;
    },
    buttonClick(item, scpoe) {
      this.$emit("buttonClick", item.key, scpoe.row);
    },
  },
  watch: {
    currentPage(val, oldVal) {
      this.tableData = cloneDeep(this.data).splice(
        (oldVal - 1) * tablePagination.pageSize,
        val * tablePagination.pageSize
      );
    },
    data() {
      this.init();
    },
  },
};
</script>

<style>
</style>
