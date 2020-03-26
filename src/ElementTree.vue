<template>
  <el-card>
    <div slot="header">元素树</div>
    <el-tree
      :data="treeData"
      node-key="id"
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.tag }}</span>
        <span style="margin-left: 8px;">
          <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="editNode(node)" />
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-document-add"
            circle
            @click="insertNode(node)"
          />
          <el-button size="mini" type="primary" icon="el-icon-delete" circle />
        </span>
      </span>
    </el-tree>
  </el-card>
</template>
<script lang="tsx">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { Config, createConfig } from '@/utils/nodeUtils/nodeUtils'
import EventBus from './EventBus'
import { EventType } from './utils/event'

let id: number = 1

interface TreeNode extends Config {
  readonly id: number
}

@Component
export default class ElementTree extends Vue {
  private treeData: TreeNode[] = []

  @Watch('treeData', { deep: true, immediate: true })
  private onTreeDataChanged(val: TreeNode[]) {
    EventBus.$emit(EventType.TreeChange, this.treeData)
  }
  mounted() {
    this.insertNode()
  }
  private editNode(data: any) {
    console.log(data)
  }
  private insertNode() {
    const node: TreeNode = { ...createConfig('el-form'), id: id++ } as TreeNode
    this.treeData.push(node)
  }
  private deleteNode(node: TreeNode, data: any) {
    console.log(node, data)
  }
  private handleDragStart(node: any, ev: any) {
    console.log('drag start', node)
  }
  private handleDragEnter(draggingNode: any, dropNode: any, ev: any) {
    console.log('tree drag enter: ', dropNode.label)
  }
  private handleDragLeave(draggingNode: any, dropNode: any, ev: any) {
    console.log('tree drag leave: ', dropNode.label)
  }
  private handleDragOver(draggingNode: any, dropNode: any, ev: any) {
    console.log('tree drag over: ', dropNode.label)
  }
  private handleDragEnd(draggingNode: any, dropNode: any, dropType: any, ev: any) {
    console.log('tree drag end: ', dropNode && dropNode.label, dropType)
  }
  private handleDrop(draggingNode: any, dropNode: any, dropType: any, ev: any) {
    console.log('tree drop: ', dropNode.label, dropType)
  }
  private allowDrop(draggingNode: any, dropNode: any, type: any) {
    if (dropNode.data.label === '二级 3-1') {
      return type !== 'inner'
    } else {
      return true
    }
  }
  private allowDrag(draggingNode: any) {
    return draggingNode.data.label.indexOf('三级 3-2-2') === -1
  }
}
</script>