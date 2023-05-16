<script setup lang="ts"></script>

<template>
  <section class="view"></section>
</template>

<style lang="scss" scoped>
.view {
  height: 200px;
  display: flex;
  align-items: end;
  justify-content: center;
  padding-bottom: 1.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: var(--vt-c-pink);
}

.sort-list {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1vmax;
}

.sort-list__item {
  display: flex;
  flex-flow: column-reverse;
  min-width: 5%;
  background-color: var(--color-list-items);
  padding-left: 1px;
  padding-right: 1px;
  border: 1px solid #000;
  text-align: center;

  transition: all 0.5s;
}

.sort-list__item_highlighted {
  background-color: var(--color-list-items-active);
}

.sort-list__item_processed {
  background-color: var(--color-list-items-processed);
}
</style>
