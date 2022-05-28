<template>
  <select class="select" @change="onChange">
    <option value="" selected disabled hidden>
      Выберите вариант
    </option>
    <option
        v-for="(item, index) in selectItems"
        :selected="item.isSelected"
        :value="index"
    >
      {{ item.title }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ISelectItem } from '../../types'

defineProps<{
  selectItems: ISelectItem[]
}>()

const emit = defineEmits(['select'])

const onChange = (e: Event) => {
  const itemNum = +(<HTMLInputElement>e.target).value
  emit('select', itemNum)
}
</script>

<style scoped>
.select {
  background: #fff;
  color: #333;
  margin: 5px 0;
  padding: 8px 12px;
  border: 1px solid #aaa;
  border-radius: 4px;
  width: 100%;
}
</style>