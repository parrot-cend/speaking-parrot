<template>
  <el-menu class="el-menu-vertical-demo" collapse @select="onMenuItemSelect">
    <el-submenu index="layout">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">Layout</span>
      </template>
      <el-menu-item-group>
        <span slot="title">Layout</span>
        <el-menu-item index="horizontal">Horizontal</el-menu-item>
        <el-menu-item index="vertical">Vertical</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Sidebar extends Vue {
  private onMenuItemSelect(key: string, path: string) {
    this.$emit('select', path)
  }
}
</script>