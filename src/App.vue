<template>
  <div id="app">
    <Sidebar @select="onSidebarSelect" />
    <div :class="['body', 'layout-' + layoutClass]">
      <ElementTree class="tree" />
      <Preview class="preview" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sidebar from './Sidebar.vue'
import ElementTree from './ElementTree.vue'
import Preview from './Preview.vue'

enum Layout {
  Hor = 'horizontal',
  Ver = 'vertical'
}

@Component({
  components: {
    Sidebar,
    ElementTree,
    Preview
  }
})
export default class App extends Vue {
  private form = {
    queryForm: {
      formItem: [] as any[],
      buttons: []
    }
  }
  private result = ''
  private layoutClass: Layout = Layout.Ver
  private mounted() {
    this.appendFormItem()
    // loadExternalScript('http://localhost:3000/node')
  }
  private onSidebarSelect(path: Array<string>) {
    if (path[0] === 'layout') {
      this.layoutClass = path[1] as Layout
    }
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
}
</script>
<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  display: flex;
  height: 100%;
}
.body {
  flex: 1;
  display: flex;
  align-items: stretch;
  transition: all 0.2s ease;
}
.body.layout-horizontal {
  flex-direction: row;
}
.body.layout-vertical {
  flex-direction: column;
}
.tree,
.preview {
  flex: 1;
  margin: 20px;
}
</style>
