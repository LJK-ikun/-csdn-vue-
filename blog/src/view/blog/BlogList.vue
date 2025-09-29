<template>
  <div class="top-panel">
    <el-form :model="searchFormData" label-width="50px">
      <el-row :span="5">
        <el-form-item label="标题" prop="titleFuzzy">
          <el-input
                placeholder="请输入名称"
                v-model="searchFormData.titleFuzzy"
                clearable
                @keyup.enter.native="loadDataList"
              >
          </el-input>
        </el-form-item>
      <el-col :span="4">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="searchFormData.status"
                clearable
                placeholder="请选择状态"
                :style="{ width: '100%' }"
              >
                <el-option :value="0" label="草稿"></el-option>
                <el-option :value="1" label="已发布"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="分类" prop="categoryId">
              <el-select
                v-model="searchFormData.categoryId"
                clearable
                placeholder="请选择分类"
                :style="{ width: '100%' }"
              >
                <el-option
                  :value="item.categoryId"
                  :label="item.categoryName"
                  :key="item.categoryId"
                  v-for="item in categoryList"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" :style="{ 'padding-left': '10px' }">
            <el-button type="danger" @click="loadDataList">搜索</el-button>
            <el-button type="danger" @click="showEdit('add')">新增博客</el-button>
          </el-col>
          </el-row>
    </el-form>
  </div>
  <Table
      :columns="columns"
      :showPagination="true"
      :dataSource="tableData"
      :fetch="loadDataList"
      :options="tableOptions"
    >
      <!--封面-->
      <template #cover="{ row }">
        <Cover :cover="row.cover"></Cover>
      </template>
      <!--文章信息-->
      <template #blogInfo="{ row }">
        <div>标题：{{ row.title }}</div>
        <div>分类：{{ row.categoryName }}</div>
        <div>作者：{{ row.nickName }}</div>
      </template>
      <!--类型-->
      <template #typeName="{ row }">
        <div>
          类型：<span v-if="row.type == 0">原创</span
          ><span v-if="row.type == 1">转载</span>
        </div>
        <div v-if="row.type == 1">转载地址：{{ row.reprintUrl }}</div>
      </template>

      <!--类型-->
      <template #statusName="{ row }">
        <span v-if="row.status == 1" :style="{ color: 'green' }">{{
          row.statusName
        }}</span>
        <span v-else :style="{ color: 'red' }">{{ row.statusName }}</span>
      </template>
      <!--类型-->
      <template #time="{ row }">
        <div>创建时间：{{ row.createTime }}</div>
        <div>更新时间：{{ row.lastUpdateTime }}</div>
      </template>
      <template #op="{ row }">
        <div class="op">
          <a
            href="javascript:void(0)"
            class="a-link"
            @click="showEdit('update', row)"
            v-if="userInfo.userId == row.userId || userInfo.roleType == 1"
            >修改</a
          >
          <span v-else>--</span>
          <el-divider direction="vertical" />
          <a
            href="javascript:void(0)"
            class="a-link"
            @click="delBlog(row)"
            v-if="userInfo.userId == row.userId || userInfo.roleType == 1"
            >删除</a
          >
          <span v-else>--</span>
          <el-divider direction="vertical" />
          <a
            href="javascript:void(0)"
            class="a-link"
            @click="showDetail(row.blogId)"
            >预览</a
          >
        </div>
      </template>
    </Table>
    <!-- 新增修改弹窗 -->
    <BlogEdit ref="blogEditRef" @callback="loadDataList"></BlogEdit>
    <BlogDetail ref="blogDetailRef"></BlogDetail>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import BlogEdit from "./BlogEdit.vue"
import VueCookies from "vue-cookies";

const api = {
  loadCategory: "/category/loadAllCategory4Blog",
  loadDataList: "/blog/loadBlog",
  delBlog: "/blog/recoveryBlog",
};

const { proxy } = getCurrentInstance();
//列表
const columns = [
  {
    label: "封面",
    prop: "cover",
    width: 80,
    scopedSlots: "cover",
  },
  {
    label: "文章信息",
    prop: "blogInfo",
    scopedSlots: "blogInfo",
  },
  {
    label: "编辑器",
    prop: "editorTypeName",
    width: 100,
  },
  {
    label: "类型",
    prop: "typeName",
    width: 200,
    scopedSlots: "typeName",
  },
  {
    label: "评论",
    prop: "allowCommentTypeName",
    width: 100,
  },
  {
    label: "状态",
    prop: "status",
    width: 100,
    scopedSlots: "statusName",
  },
  {
    label: "时间",
    prop: "time",
    width: 300,
    scopedSlots: "time",
  },
  {
    label: "操作",
    prop: "op",
    width: 200,
    scopedSlots: "op",
  },
];

const tableData = ref({});
const tableOptions = {
  extHeight: 50,
};

const loadDataList = async () => {
  let params = {
    pageNo: tableData.value.pageNo,
    pageSize: tableData.value.pageSize,
  };

  Object.assign(params, searchFormData);
  let result = await proxy.Request({
    url: api.loadDataList,
    params,
  });
  if (!result) {
    return;
  }
  tableData.value = result.data;
};

const blogEditRef = ref(null);
const showEdit = (type, data) => {
  blogEditRef.value.init(type, data);
};

//搜索
const searchFormData = reactive({});
const categoryList = ref([]);


const userInfo = ref(VueCookies.get("userInfo") || {});


const loadCategoryList = async () => {
    let result = await proxy.Request({
        url: api.loadCategory
    })
    categoryList.value = result.data || [];
}
loadCategoryList();

//详情
const blogDetailRef = ref(null);
const showDetail = (blogId) => {
  blogDetailRef.value.showDetail(blogId);
}

</script>

<style lang="scss" scoped>
</style>
