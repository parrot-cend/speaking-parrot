<template>
  <el-card>
    <b slot="header">Element</b>
    <el-tree
      :data="treeData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
    >
      <span class="tree-node" slot-scope="{ node, data }">
        <span class="node-tag">{{ data.tag }}</span>
        <span class="node-operation-wrapper" style="margin-left: 8px;">
          <el-popover v-show="node.level > 1" placement="right" width="260">
            <el-form
              style="padding-top: 12px;"
              size="mini"
              :model="nodeDataCache"
              label-width="60px"
            >
              <el-form-item label="Label: " required>
                <el-input v-model="nodeDataCache.label" type="text" />
              </el-form-item>
              <el-form-item style="text-align: right;">
                <el-button type="primary" @click="editNode(node, data)">Save</el-button>
              </el-form-item>
            </el-form>
            <i
              slot="reference"
              class="node-operation el-icon-edit"
              title="Edit"
              @click="setNodeDataCache(data)"
            />
          </el-popover>
          <el-popover placement="right" width="260">
            <el-form
              style="padding-top: 12px;"
              size="mini"
              :model="nodeDataCache"
              label-width="60px"
            >
              <el-form-item label="Type: " required>
                <el-select v-model="nodeDataCache.type" placeholder="Select Type">
                  <el-option
                    v-for="item in formItemTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Label: ">
                <el-input
                  v-model="nodeDataCache.label"
                  type="text"
                  @keyup.enter.native="insertNode(data)"
                />
              </el-form-item>
              <el-form-item style="text-align: right;">
                <el-button type="primary" @click="insertNode(data)">Insert</el-button>
              </el-form-item>
            </el-form>
            <i
              slot="reference"
              class="node-operation el-icon-document-add"
              title="Insert"
              @click="resetNodeDataCache"
            />
          </el-popover>
          <i
            v-show="node.level > 1"
            class="node-operation el-icon-delete"
            title="Delete"
            @click="deleteNode(node, data)"
          />
        </span>
      </span>
    </el-tree>
  </el-card>
</template>
<script lang="tsx">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { CreateElement } from 'vue'
import { Config, createConfig, createProp } from '@/utils/nodeUtils/nodeUtils'
import EventBus from './EventBus'
import { EventType } from './utils/event'
import { formItemTypes } from './utils/formItem'
import { FormItemNodeType, Node } from './utils/nodeUtils/types'
import { TreeNode } from 'element-ui/types/tree'

let id: number = 1
let dragLevel: number = -1

interface TreeItem extends Config {
  readonly id: number
  children: Array<TreeItem>
}

@Component
export default class ElementTree extends Vue {
  private treeData: TreeItem[] = [
    Object.assign(
      createConfig('el-form', [
        createProp('style', Node.PropType.String, 'width: 100%;'),
        createProp('label-width', Node.PropType.String, '120px')
      ]),
      { id: id++ }
    ) as TreeItem
  ]
  private nodeDataCache = {
    label: '',
    type: ''
  }
  private formItemTypes = formItemTypes

  @Watch('treeData', { deep: true, immediate: true })
  private onTreeDataChanged(val: TreeItem[]) {
    EventBus.$emit(EventType.TreeChange, this.treeData)
  }
  private editNode(data: TreeItem) {
    console.log(data)
  }
  private setNodeDataCache(data: TreeItem) {
    this.nodeDataCache.label = data.props.find((prop) => prop.key === 'label')?.value || ''
  }
  private resetNodeDataCache() {
    this.nodeDataCache.label = ''
  }
  private insertNode(data: TreeItem) {
    const label: string = this.nodeDataCache.label.trim()
    const props: Node.Prop = createProp('label', Node.PropType.String, label)
    const newNode: TreeItem = Object.assign(createConfig(`el-form-item`, [props]), {
      id: id++
    }) as TreeItem
    switch (this.nodeDataCache.type) {
      case FormItemNodeType.Input:
        const inputNode = Object.assign(createConfig(`el-input`), {
          id: id++
        }) as TreeItem
        newNode.appendChild(inputNode)
        break
      case FormItemNodeType.Select:
        const selectNode = Object.assign(createConfig(`el-select`), {
          id: id++
        }) as TreeItem
        const optionNode = Object.assign(createConfig(`el-option`), {
          id: id++
        }) as TreeItem
        newNode.appendChild(selectNode.appendChild(optionNode))
        break
    }
    data.children.push(newNode)
  }
  private deleteNode(node: TreeNode<'tag', TreeItem>, data: TreeItem) {
    if (node.parent) {
      const idx = node.parent.data.children.findIndex((config) => config.id === data.id)
      if (idx > -1) {
        node.parent?.data.removeChild(idx)
      }
    }
  }
  private allowDrop(draggingNode: any, dropNode: any, type: string) {
    switch (type) {
      case 'prev':
        return dropNode.level === dragLevel
      case 'inner':
        return dropNode.level + 1 === dragLevel
      case 'next':
        return dropNode.level === dragLevel
    }
  }
  private allowDrag(node: TreeNode<'tag', TreeItem>) {
    if (node.level !== 1) {
      dragLevel = node.level
      return true
    } else {
      return false
    }
  }
}
</script>
<style scoped>
.tree-node {
  width: 100%;
}
.node-operation {
  display: none;
  margin-left: 4px;
  font-size: 16px;
  transform: scale(1);
  transition: all 0.2s ease;
}
.node-operation:hover {
  font-size: 16px;
  transform: scale(1.2);
  color: #409eff;
}
.tree-node:hover .node-operation {
  display: inline-block;
}
.node-tag {
  display: inline-block;
  width: 200px;
}
.node-operation-wrapper {
  display: inline-block;
  width: 100px;
  text-align: right;
}
</style>