<template>
  <div class="body">
    <h2>Child Component</h2>
    <p class="paragraph">Injected state</p>
    <div class="highlight" v-html="JSON.stringify(contextInject)"></div>
    <br />
    <p class="paragraph">Disabled state</p>
    <div class="highlight" v-html="JSON.stringify(context)"></div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { symbol } from "./util";
import { inject, provide, reactive, ref, toRaw, computed } from "vue";

export default {
  name: "RootComponent",
  props: {
    disabled: {
      type: Boolean,
    },
  },
  setup(props) {
    const contextInject = inject(symbol, ref({ disabled: false }));

    const context = computed(() => {
      return {
        disabled: contextInject.value.disabled || props.disabled || false,
      };
    });

    return {
      context: context,
      contextInject,
    };
  },
};
</script>

<style scoped>
.toggle {
  background-color: orange;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  margin-bottom: 8px;
  font-weight: 900;
  display: inline-block;
}
.body {
  margin: 0 auto;
  padding: 16px;
  max-width: 900px;
  padding: 0 24px;
  border: 2px solid orange;
}
.paragraph {
  text-decoration: underline;
  font-size: 20px;
  margin: 0;
}
.highlight {
  font-size: 20px;
  font-weight: 900;
  color: orange;
}
</style>