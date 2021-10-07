<template>
  <div class="cell">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class CellHori extends Vue {
  @Prop() content!: []
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell {
  justify-content: flex-start;
  align-items: center;
  display: flex;
}
</style>
