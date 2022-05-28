<template>
  <div class="variant">
    <div class="line" :style="{ borderColor: variant.color}"/>
    <div class="variant__top">
      <h3 class="variant__title">
        {{ variant.title }}
      </h3>
      <div class="variant__price">
        {{ variant.price }} ₽
      </div>
    </div>
    <div class="variant__bottom">
      <div class="variant__desc">
        <div
            class="variant__text"
            v-for="text in variant.description.split('\n')">
          {{ text }}
        </div>
      </div>
      <div class="variant__settings">
        <div class="variant__select" v-for="(select, index) in variant.select">
          <div class="select__title">
            {{ select.title }}
          </div>
          <my-select
              @select="changeSelect(stepNum, variantNum, index, $event)"
              :select-items="select.items"/>
        </div>
        <checkbox
            v-for="(option, index) in variant.options"
            :option="option"
            @toggle="toggleOption(stepNum, variantNum, index)"
        />
        <my-button
            v-if="!variant.isSelected"
            @click="selectVariant(stepNum, variantNum)"
            class="btn-grey">
          Выбрать
        </my-button>
        <my-button v-if="variant.isSelected" class="btn-green">
          Выбрано
        </my-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IVariant } from '../types'
import MyButton from './UI/MyButton.vue'
import MySelect from './UI/MySelect.vue'
import Checkbox from './UI/Checkbox.vue'
import { useWizardStore } from '../store/wizard'

defineProps<{
  variant: IVariant,
  stepNum: Number,
  variantNum: Number,
  active: Boolean
}>()

const wizard = useWizardStore()

const toggleOption = (stepNum: number, variantNum: number, optionNum: number) => {
  wizard.toggleOption(stepNum, variantNum, optionNum)
}

const changeSelect = (stepNum: number, variantNum: number, selectNum: number, itemNum: number) => {
  wizard.changeSelect(stepNum, variantNum, selectNum, itemNum)
}

const selectVariant = (stepNum: number, variantNum: number) => {
  wizard.selectVariant(stepNum, variantNum)
}
</script>

<style scoped lang="scss">
.variant {
  background: #f8f8f8;
  margin: 15px 0;
  padding: 10px 15px 10px 20px;
  border-radius: 3px;
  position: relative;
  overflow: hidden;

  &:first-child {
    margin-top: 0;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__bottom {
    display: flex;
  }

  &__title {
    color: #333333;
    font-size: 20px;
    font-weight: 660;
    margin: 0;
  }

  &__price {
    font-weight: 500;
  }

  &__desc {
    width: 70%;
  }

  &__settings {
    width: 30%;
    padding: 10px 0 0 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 100%;
    border-left: 1px solid #ddd;
  }

  &__text {
    font-size: 14px;
    margin: 10px 0;
    color: #555555
  }
}
.select__title {
  color: #555;
  font-size: 12px;
}
.line {
  border-left: 6px solid transparent;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>