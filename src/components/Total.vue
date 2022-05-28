<template>
  <div class="total">
    <div class="total__body">
      <div class="total__title">
        Итого к оплате
      </div>
      <div class="total__price">
        {{ totalPrice }} ₽
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalPrice: Number
}>()
</script>

<style scoped lang="scss">
.total {
  color: #fff;
  background: #2FCB5A;
  border-radius: 3px;
  padding: 12px 18px;

  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    text-transform: uppercase;
    font-size: 26px;
    font-weight: 600;
    line-height: 1;
  }

  &__price {
    font-size: 24px;
  }
}
</style>