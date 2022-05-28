<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWizardStore } from './store/wizard'
import Step from './components/Step.vue'
import Total from './components/Total.vue'

const wizard = useWizardStore()

const steps = wizard.getSteps
const { currentStep, totalPrice } = storeToRefs(wizard)
</script>

<template>
  <div class="container">
    <step
        v-for="(step, index) in steps"
        :step="step"
        :step-num="index"
        :is-active="index == currentStep"
    />
    <total
        :total-price="totalPrice"
    />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #fafafa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  text-decoration: none;

  &:visited, &:hover {
    text-decoration: none;
  }

  &:focus, &:active {
    outline: none
  }
}

:focus,:active{
  outline: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
  monospace;
}

.container {
  margin: 0 auto;
  max-width: 800px;
  padding: 10px;
}
</style>
