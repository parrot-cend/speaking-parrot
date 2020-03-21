<template>
  <div id="app">
    <div class="side">
      <div style="display: inline-flex; flex-direction: column;">
        <h5>Make some config:</h5>
        <div>
          <el-button type="primary" @click="appendFormItem">add</el-button>
          <el-button type="primary" @click="submit">submit</el-button>
        </div>
        <el-form
          inline
          class="form"
          size="small"
          style="flex: 1"
          label-width="120px"
          v-for="(item, index) in form.queryForm.formItem"
          :key="index"
          :model="item"
        >
          <el-form-item label="tag">
            <el-input v-model="item.tag" />
          </el-form-item>
          <el-form-item label="label">
            <el-input v-model="item.label" />
          </el-form-item>
          <el-form-item label="model">
            <el-input v-model="item.model" />
          </el-form-item>
          <el-form-item label="prop.type">
            <el-input v-model="item.prop.type" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="side">
      <div>
        <h5>Result:</h5>
        <pre><code v-text="result"></code></pre>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class App extends Vue {
  private form = {
    queryForm: {
      formItem: [] as any[],
      buttons: []
    }
  }
  private result = ''
  private mounted() {
    this.appendFormItem()
  }
  private appendFormItem() {
    const emptyFormItem = {
      tag: 'el-input',
      model: 'value',
      label: 'test',
      prop: {
        type: 'text'
      }
    }
    this.$set(this.form.queryForm.formItem, this.form.queryForm.formItem.length, emptyFormItem)
  }
  private submit() {
    const param = this.form
    axios.post('/template', { data: param }).then((res) => {
      this.result = res.data
    })
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
}
.side {
  flex: 1;
  display: inline-flex;
  margin: 12px;
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 12px;
}
.form {
  margin: 12px;
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 12px;
}
</style>
