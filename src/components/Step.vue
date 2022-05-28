<template>
  <div class="step" :class="{ active:  isActive }">
    <div class="step__top" @click="handleClick(stepNum)">
      <h2 class="step__title">
        {{ step.title }}
      </h2>
    </div>
    <div
        class="step__body"
    >
      <variant
          v-for="(variant, index) in step.variants"
          :variant="variant"
          :step-num="stepNum"
          :variant-num="index"
          :active="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Variant from './Variant.vue'
import { IStep } from '../types'
import { useWizardStore } from '../store/wizard'

defineProps<{
  step: IStep,
  stepNum: Number,
  isActive: Boolean
}>()

const wizard = useWizardStore()

const handleClick = (stepNum: number) => {
  wizard.setCurrentStep(stepNum)
}
</script>

<style scoped lang="scss">
.step {
  border-top: 2px solid #ebebeb;

  &__title {
    cursor: pointer;
    margin: 0;
    padding: 12px 0;
    color: #e1e1e1;
    font-size: 16px;
  }

  &.active &__title {
    color: #333333;
  }

  &__body {
    max-height: 0;
    overflow: hidden;
  }

  &.active &__body {
    max-height: 1000vh;
  }
}
</style>