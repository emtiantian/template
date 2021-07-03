<template>
  <div>
    <data-table :param="param" :data="data" @buttonClick="buttonClick">
    </data-table>
    <el-form :model="form">
      <el-form-item label=""></el-form-item>
    </el-form>
  </div>
</template>

<script>
import dataTable from "@/components/dataTable/index.vue";
export default {
  components: {
    dataTable,
  },
  data() {
    return {
      param: [
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
      ],
      data: [{ haohe: "123" }],
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
        { key: "name", label: "姓名" },
        { key: "code", label: "编码" },
        { key: "phone", label: "电话" },
        { key: "address", label: "地址" },
        { key: "cardcode", label: "卡片code" },
        { key: "remark", label: "备注" },
      ],
    };
  },
  methods: {
    buttonClick(type, val) {
      console.log(type + val);
    },
  },
};
</script>

<style>
</style>
