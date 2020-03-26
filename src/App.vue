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
import { loadExternalScript } from './utils/externalScript'

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
  private created() {
    loadExternalScript('http://localhost:3000/node-utils')
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
