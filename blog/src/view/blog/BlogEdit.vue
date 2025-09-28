<template>
  <div>
    <!-- 新增修改弹窗 -->
    <Windows
      :show="windowConfig.show"
      :button="windowConfig.buttons"
      @close="closeWindow"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        @submit.prevent
      >
        <!--input输入-->
        <el-form-item prop="title">
          <div class="title-input">
            <el-input
              placeholder="请输入博客标题"
              v-model="formData.title"
            ></el-input>
          </div>
        </el-form-item>
      </el-form>
      <el-form-item prop="markdownContent">
        <div :style="{ width: '100%' }">
          <EditorMarkdown
            :height="editorMarkdownHeight"
            v-model="formData.markdownContent"
          ></EditorMarkdown>
        </div>
      </el-form-item>
      <Dialog
        :show="dialogConfig.show"
        :title="dialogConfig.title"
        :buttons="dialogConfig.buttons"
        @close="dialogConfig.show = false"
      >
        <el-form
          :model="settingsFormData"
          :rules="rules"
          ref="formDataRef"
          label-width="80px"
        >
          <el-form-item label="博客分类" prop="categoryName">
            <el-select
                v-model="settingsFormData.categoryId"
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
          <el-form-item label="封面" prop="cover">
            <CoverUpload v-model="settingsFormData.cover"></CoverUpload>
          </el-form-item>
          <el-form-item label="博客类型" prop="blogType">
            <el-radio-group >
              <el-radio label="0">原创</el-radio>
              <el-radio label="1">转载</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </Dialog>
    </Windows>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const editorMarkdownHeight = window.innerHeight - 220;
const editorHtmlHeight = window.innerHeight - 320;

//增添修改
const windowConfig = reactive({
  show: true,
  title: "标题",
  buttons: [
    {
      type: "danger",
      text: "确定",
      click: (e) => {
        showSettings();
      },
    },
  ],
});

const closeWindow = () => {
  windowConfig.show = false;
  loadDataList();
};

const formDataRef = ref(null);
const formData = ref({});

const rules = {};

//博客设置
const settingsFormData = ref({})
const dialogConfig = reactive({
  show: false,
  title: "标题",
  buttons: [
    {
      type: "danger",
      text: "确定",
      click: (e) => {},
    },
  ],
});

//博客分类
const categoryList = ref([]);

const showSettings = () => {
    dialogConfig.show = true;
}
</script>

<style lang="scss" scoped>
.title-input {
  width: 100%;
  border-bottom: 1px solid #ddd;
  .el-input__wrapper {
    width: 100%;
  }

  input {
    font-size: 18px;
  }
}
</style>