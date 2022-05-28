<template>
  <button class="btn">
    <slot/>
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.btn {
  cursor: pointer;
  color: #fff;
  text-align: center;
  width: 100%;
  margin-top: 5px;
  padding: 10px;
  border-radius: 4px;
  border: none;

  &-grey {
    background: #98abaa
  }

  &-green {
    background: #2fcb5a;
  }
}
</style>