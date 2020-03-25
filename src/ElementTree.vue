<template>
  <el-card>
    <div slot="header">元素树</div>
    <el-tree
      :data="data"
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
    ></el-tree>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ElementTree extends Vue {
  private data = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 4,
          label: '二级 1-1',
          children: [
            {
              id: 9,
              label: '三级 1-1-1'
            },
            {
              id: 10,
              label: '三级 1-1-2'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      label: '一级 2',
      children: [
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 6,
          label: '二级 2-2'
        }
      ]
    },
    {
      id: 3,
      label: '一级 3',
      children: [
        {
          id: 7,
          label: '二级 3-1'
        },
        {
          id: 8,
          label: '二级 3-2',
          children: [
            {
              id: 11,
              label: '三级 3-2-1'
            },
            {
              id: 12,
              label: '三级 3-2-2'
            },
            {
              id: 13,
              label: '三级 3-2-3'
            }
          ]
        }
      ]
    }
  ]
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
  private allowDrop(draggingNode: any, dropNode: any, type) {
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