<template>
  <div>
    <h3>Input text template test</h3>
    <input type="text" v-model="input" />
  </div>
</template>

<script>
import { toRefs, toRef, ref, watchEffect, shallowReactive } from "vue";
import { createInjector } from "./../utils/inject";

export default {
  setup(props, { attrs }) {
    const input = ref("");
    const form = createInjector("form")();

    form[attrs.name] = input;

    return {
      input,
    };
  },
};
</script>

<style>
</style>