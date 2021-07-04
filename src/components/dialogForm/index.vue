<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" width="30%" center>
      <el-form
        :model="data"
        ref="form"
        :label-width="formLabelWidth"
        :label-position="labelPosition"
      >
        <el-form-item
          :label="item.label"
          v-for="item in formItem"
          :key="item.key"
        >
          <el-input
            size="mini"
            v-if="item.type === 'input'"
            v-model="data[item.key]"
            :placeholder="item.placeholder || '请输入'"
          ></el-input>
          <el-input
            size="mini"
            type="textarea"
            v-if="item.type === 'textarea'"
            v-model="data[item.key]"
            :placeholder="item.placeholder"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handelCancel">取 消</el-button>
        <el-button type="primary" @click="handelSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: { type: Boolean, default: false },
    title: {
      type: String,
      default: "提示",
    },
    formData: {
      type: Object,
      require: true,
    },
    formLabelWidth: {
      type: String,
      default: "80px",
    },
    labelPosition: {
      type: String,
      default: "right",
    },
    formItem: {
      type: Array,
      default: () => {
        return [
          { key: "name", label: "姓名", type: "input", placeholder: "姓名" },
          { key: "code", label: "编码", type: "input" },
          { key: "phone", label: "电话", type: "input" },
          { key: "address", label: "地址", type: "textarea" },
          { key: "cardcode", label: "卡片code", type: "input" },
          { key: "remark", label: "备注", type: "textarea" },
        ];
      },
    },
  },
  data() {
    return {
      data: {},
      visible: false,
    };
  },
  created() {
    this.data = this.formData;
    this.visible = this.dialogVisible;
  },
  watch: {
    formData(val) {
      this.data = val;
    },
    dialogVisible(val) {
      this.visible = val;
    },
  },
  methods: {
    handelCancel() {
      this.visible = false;
      this.$emit("cancel");
    },
    handelSubmit() {
      this.visible = false;
      this.$emit("submit", this.data);
    },
  },
};
</script>

<style>
</style>
