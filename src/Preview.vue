<template>
  <el-card>
    <div slot="header">预览</div>
    <div id="preview"></div>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EventBus from './EventBus'
import { EventType } from './utils/event'
import { Config, createConfig } from './utils/nodeUtils/nodeUtils'
import { Node } from './utils/nodeUtils/types'
import { getTemplateByConfig } from './api/template'

let preview

@Component
export default class Preview extends Vue {
  created() {
    EventBus.$on(EventType.TreeChange, this.getTemplate)
  }
  destroyed() {
    EventBus.$off(EventType.TreeChange)
  }
  private getTemplate(tree: Array<Config>) {
    const param = {
      query: tree,
      plain: [] as any
    }
    getTemplateByConfig(param).then(res => {
      console.log(res.data)
      const result = Vue.compile(res.data)
      preview = new Vue({
        el: '#preview',
        render: result.render,
        staticRenderFns: result.staticRenderFns
      })
    })
  }
}
</script>