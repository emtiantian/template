<template>
  <div>
    <data-table :param="param" :data="data"> </data-table>
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
          name: "操作",
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
};
</script>

<style>
</style>
