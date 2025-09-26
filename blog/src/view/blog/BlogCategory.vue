<template>
  <div>
    <el-button type="danger" @click="showEdit('add')">新增分类</el-button>
    <Table
      :column="columns"
      :dataSource="tableData"
      :showPagination="false"
      :fetch="loadDataList"
      :options="tableOptions"
    >
      <template #cover="{ row }">
        <Cover :cover="row.cover"></Cover>
      </template>
      <template #op="{index,row}"
                v-if="userInfo.roleType==1">
        <div class="op">
          <a href="javascript:void(0)"
             class="a-link"
             @click="showEdit('update',row)">修改</a>
          <el-divider direction="vertical" />
          <a href="javascript:void(0)"
             class="a-link"
             @click="del(row)">删除</a>
          <el-divider direction="vertical" />
          <a href="javascript:void(0)"
             :class="[index==0?'not-allow':'a-link']"
             @click="changeSort(index,'up')">上移</a>
          <el-divider direction="vertical" />
          <a href="javascript:void(0)"
             :class="[index==tableData.list.length-1?'not-allow':'a-link']"
             @click="changeSort(index,'down')">下移</a>
        </div>
      </template>
    </Table>
     
    <Dialog :show="dialogConfig.show"
    :title="dialogConfig.title"
    :buttons="dialogConfig.buttons"
    @close="dialogConfig.show = false">
    <el-form :model="formData"
               :rules="rules"
               ref="formDataRef"
               label-width="80px">
        <el-form-item label="名称"
                      prop="categoryName">
          <el-input placeholder="请输入名称"
                    v-model="formData.categoryName">
          </el-input>
        </el-form-item>
        <el-form-item label="封面"
                      prop="cover">
          <CoverUpload v-model="formData.cover"></CoverUpload>
        </el-form-item>
        <el-form-item label="简介"
                      prop="categoryDesc">
          <el-input v-model="formData.categoryDesc"
                    type="textarea"
                    placeholder="请输入简介"
                    :autosize="{minRows:4,maxRows:4}">
          </el-input>
        </el-form-item>
      </el-form>
  </Dialog>
  </div>
</template>

<script setup>  
import { reactive, ref } from "vue";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const api = {
  "loadDataList": "/category/loadAllCategory4Blog",
  "saveCategory": "/category/saveCategory4Blog",
  "delCategory": "category/delCategory4Blog",
  "changeSort": "category/changeCategorySort4Blog"
}

const columns = [
  {
    label: "封面",
    prop: "cover",
    width: 100,
    scopedSlots: "cover",
  },
  {
    label: "名称",
    prop: "categoryName",
    width: 200,
  },
  {
    label: "简介",
    prop: "categoryDesc",
  },
  {
    label: "博客数量",
    prop: "blogCount",
    width: 100,
  },
  {
    label: "操作",
    prop: "op",
    width: 200,
    scopedSlots: "op",
  },
];

const tableData = reactive({});
const tableOptions = {
  exHeight: 10,
};

const loadDataList = async () => {
  let result = await proxy.Request({
    url: api.loadDataList,
  });
  if (!result) {
    return;
  }
  tableData.list = result.data;
};

// 新增，修改
const dialogConfig = reactive({
  show: true,
  title: "标题",
  buttons: [{
    type: "danger",
    text: "确定",
    click: (e) => {
      submitForm();
    }
  }]
})
const formData = ref({})
const rules = {
  categoryName: [{ required: true, message: "请输入分类名称" }]
};
const formDataRef = ref();
const showEdit = (type, data) => {
  dialogConfig.show = true;
  nextTick(() => {
    formDataRef.value.resetFields();
    if (type == "add") {
      dialogConfig.title = "新增分类";
      formData.value = {};
    } else if (type == "update") {
      dialogConfig.title = "编辑分类";
      formData.value = JSON.parse(JSON.stringify(data))
    }
  })
}

const submitForm = async () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let params = {}
    Object.assign(params,formData.value)
    let result = await proxy.Request({
      url: api.saveCategory,
      params,
    })
    if (!result) {
      return;
    }
    dialogConfig.show = false
    proxy.Message.success("保存成功")
    loadDataList()
  })
}

//删除
const del = (data) => {
  proxy.Comfirm(`你确定要删除${data.categoryName}`,async () => {
    let result = await proxy.Request({
      url: api.delCategory,
      params: {
        categoryId: data.categoryId
      }
    })
    if (!result) {
      return;
    }
    proxy.Message.success("删除成功")
    loadDataList()
  })
}

//修改排序
const changeSort = async (index, type) => {
  let categoryList = tableData.list;
  if (type === "down" && index === categoryList.length - 1 || type === "up" && index === 0) {
    return
  }
  let temp = categoryList[index];
  let number = type == "down" ? 1 : -1;
  categoryList.splice(index, 1);
  categoryList.splice(index + number, 0, temp);
  let result = await proxy.Request({
    url: api.changeSort,
    dataType: "json",
    params: categoryList,
  })
  if (!result) {
    return;
  }
  proxy.Message.success("重新排序成功")
  loadDataList()
}
</script>

<style lang="scss" scoped>
</style>
