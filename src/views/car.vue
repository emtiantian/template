<template>
  <div class="content">
    <el-button @click="addCLick" style="margin-bottom: 5px"> 新增</el-button>

    <data-table
      :param="param"
      :data="data"
      @buttonClick="buttonClick"
      :title="dialogtitle"
    >
    </data-table>
    <dialog-form
      :dialogVisible="dialogVisible"
      :formItem="formItem"
      :formData="form"
      @submit="submit"
      @cancel="cancel"
      :title="dialogtitle"
    ></dialog-form>
  </div>
</template>

<script>
import dataTable from "@/components/dataTable/index.vue";
import dialogForm from "@/components/dialogForm/index.vue";
import { cloneDeep } from "lodash";
import { getCar, addCar } from "@/api/index.js";
export default {
  components: {
    dataTable,
    dialogForm,
  },
  data() {
    return {
      submitType: "add",
      dialogtitle: "新增",
      dialogVisible: false,
      param: [
        {
          prop: "name",
          label: "姓名",
          type: "column",
        },
        {
          prop: "code",
          label: "编码",
          type: "column",
        },
        {
          prop: "gpsmachinecode",
          label: "gps编码",
          type: "column",
        },
        {
          prop: "personcardmachinecode",
          label: "读卡器设备编号",
          type: "column",
        },
        {
          prop: "button",
          type: "button",
          label: "操作",
          button: [
            {
              key: "edit",
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
      ],
      data: [],
      formDefault: {
        name: "",
        code: "",
        gpsmachinecode: "",
        personcardmachinecode: "",
      },
      form: {
        name: "",
        code: "",
        gpsmachinecode: "",
        personcardmachinecode: "",
      },
      formItem: [
        { key: "name", label: "姓名", type: "input" },
        { key: "code", label: "编码", type: "input" },
        { key: "gpsmachinecode", label: "gps编码", type: "input" },
        {
          key: "personcardmachinecode",
          label: "设备编号",
          type: "input",
        },
      ],
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      getCar().then((val) => {
        this.data = val;
      });
    },
    add(val) {
      addCar(val).then(() => {
        this.$message.success("添加成功");
        this.get();
      });
    },
    edit(val) {
      // edit(val.id, val).then(() => {
      //   this.$message.success("编辑成功");
      //  this.get();
      // });
    },
    delete(id) {
      // delete(val.id, val).then(() => {
      //   this.$message.success("删除成功");
      //  this.get();
      // });
    },
    editClick(data) {
      this.dialogVisible = true;
      this.dialogtitle = "新增";
      this.submitType = "edit";
      this.form = cloneDeep(data);
    },
    buttonClick(type, val) {
      switch (type) {
        case "delete":
          this.delete(val.id);
          break;
        case "edit":
          this.editClick(val);
          break;
        default:
          console.log("匹配错误");
          break;
      }
    },
    addCLick() {
      this.dialogVisible = true;
      this.dialogtitle = "新增";
      this.submitType = "add";
      this.form = cloneDeep(this.formDefault);
    },
    cancel() {
      this.dialogVisible = false;
    },
    submit(val) {
      this.dialogVisible = false;
      switch (this.submitType) {
        case "add":
          this.add(val);
          break;
        case "edit":
          this.edit(val);
          break;
        default:
          console.log("匹配错误");
          break;
      }
    },
  },
};
</script>

<style>
.content {
  text-align: left;
}
</style>
