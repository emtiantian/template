<template>
  <div>
    <data-table :param="param" :data="data" @buttonClick="buttonClick">
    </data-table>
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
