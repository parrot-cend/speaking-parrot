<template>
  <el-card>
    <div slot="header">
      <b>Preview</b>
      <el-switch
        v-loading="loading"
        element-loading-text="compiling..."
        element-loading-spinner="el-icon-loading"
        style="margin-left: 24px"
        v-model="sourceCodeMode"
        active-color="#cc6633"
        inactive-color="#409EFF"
        active-text="Source"
        inactive-text="Render"
        @change="onSwitchChanged"
      ></el-switch>
    </div>
    <div v-show="!sourceCodeMode">
      <div id="preview"></div>
    </div>
    <pre v-show="sourceCodeMode"><code>{{ sourceCode }}</code></pre>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EventBus from './EventBus'
import { EventType } from './utils/event'
import { Config, createConfig, createProp } from './utils/nodeUtils/nodeUtils'
import { Node } from './utils/nodeUtils/types'
import { getTemplateByConfig } from './api/template'

let vueInst

@Component
export default class Preview extends Vue {
  private sourceCodeMode: boolean = false
  private sourceCode: string = ''
  private loading: boolean = false

  created() {
    EventBus.$on(EventType.TreeChange, this.getTemplate)
  }
  destroyed() {
    EventBus.$off(EventType.TreeChange)
  }
  private onSwitchChanged(val: boolean) {
    if (!val) {
      this.renderElement()
    }
  }
  private getTemplate(tree: Array<Config>) {
    const preview = createConfig('div', [createProp('id', Node.PropType.String, 'preview')])
    preview.appendChild(tree)
    const param = [preview]
    this.loading = true
    getTemplateByConfig(param)
      .then((res) => {
        this.sourceCode = res.data
        this.renderElement()
      })
      .finally(() => {
        this.loading = false
      })
  }
  private renderElement() {
    const result = Vue.compile(this.sourceCode)
    vueInst = new Vue({
      el: '#preview',
      render: result.render,
      staticRenderFns: result.staticRenderFns
    })
  }
}
</script>