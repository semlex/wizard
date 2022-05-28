<template>
  <label class="wrapper">
    <input
        type="checkbox"
        class="custom-checkbox"
        :checked="option.isChecked"
        @change="toggleOption"
    >
    {{ option.title }}
    <span class="checkmark"></span>
  </label>
</template>

<script setup lang="ts">
import type { IOption } from '../../types'
const props = defineProps<{
  option: IOption
}>()

const emit = defineEmits(['toggle'])

const toggleOption = () => {
  emit('toggle')
}
</script>

<style scoped lang="scss">
.wrapper {
  display: block;
  position: relative;
  margin: 5px 0;
  cursor: pointer;
  padding: 6px 8px;
  color: #ccc;
  border: 1px solid #ccc;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
}
.custom-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 11px;
  left: 8px;
  height: 10px;
  width: 10px;
  border-radius: 2px;
  border: 1.5px solid #ccc;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox:checked ~ .checkmark:after {
  display: block;
}

.checkmark:after {
  top: -1.5px;
  left: 0.5px;
  width: 10px;
  height: 10px;
  background-image: url('../../assets/check-mark.svg')
}
</style>