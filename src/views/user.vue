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
    ></dialog-form>
  </div>
</template>

<script>
import dataTable from "@/components/dataTable/index.vue";
import dialogForm from "@/components/dialogForm/index.vue";
import { cloneDeep } from "lodash";
import { getUser } from "@/api/index.js";
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
          prop: "phone",
          label: "电话",
          type: "column",
        },
        {
          prop: "address",
          label: "地址",
          type: "column",
        },
        {
          prop: "cardcode",
          label: "卡片code",
          type: "column",
        },
        {
          prop: "remark",
          label: "备注",
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
        phone: "",
        address: "",
        cardcode: "",
        remark: "",
      },
      form: {
        name: "",
        code: "",
        phone: "",
        address: "",
        cardcode: "",
        remark: "",
      },
      formItem: [
        { key: "name", label: "姓名", type: "input" },
        { key: "code", label: "编码", type: "input" },
        { key: "phone", label: "电话", type: "input" },
        { key: "address", label: "地址", type: "textarea" },
        { key: "cardcode", label: "卡片code", type: "input" },
        { key: "remark", label: "备注", type: "textarea" },
      ],
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      getUser().then((val) => {
        this.data = val;
      });
    },
    add(val) {
      // addUser(val).then(() => {
      //  this.get()
      //   this.$message.success("添加成功");
      // });
    },
    edit(val) {
      // edit(val.id, val).then(() => {
      //  this.get()
      //   this.$message.success("编辑成功");
      // });
    },
    delete(id) {
      // delete(val.id, val).then(() => {
      //  this.get()
      //   this.$message.success("删除成功");
      // });
    },
    editClick(data) {
      this.dialogVisible = true;
      this.dialogtitle = "新增";
      this.submitType = "edit";
      this.form = cloneDeep(data);
    },
    buttonClick(type, val) {
      console.log(type + val);
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
