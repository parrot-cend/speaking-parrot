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
  private result = ''
  private layoutClass: Layout = Layout.Ver

  private onSidebarSelect(path: string[]) {
    const [type, command] = path
    if (type === 'layout') {
      this.layoutClass = command as Layout
    }
  }
}
</script>
<style>
html {
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif;
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
