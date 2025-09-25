<template>
  <div>
    <el-button type="danger">新增分类</el-button>
    <Table
      :column="columns"
      :dataSource="tableData"
      :showPagination="false"
      :fetch="loadDataList"
      :options="tableOptions"
    >
    </Table>
  </div>
</template>

<script setup>
import { reactive,ref } from 'vue'
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance();

const api = {
  "loadDataList":"/category/loadAllCategory4Blog"
}

const columns = [
  {
    label: "封面",
    prop: "cover",
    width: 80,
  },{
    label: "名称",
    prop: "categoryName",
    width: 150,
  },
  {
    label: "简介",
    prop: "categoryDesc",
  },
  {
    label: "博客数量",
    prop: "blogCount",
    width: 80,
  },
  {
    label: "操作",
    prop: "",
    width: 150,
  }
];

const tableData = reactive({})
const tableOptions = {
  exHeight: 10,
}

const loadDataList = async () => {
  let result = await proxy.Request({
    url: api.loadDataList,
  })
  if (!result) {
    return
  }
  tableData.list = result.data;
}

</script>

<style lang="scss" scoped>
</style>
