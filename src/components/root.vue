<template>
  <div class="body">
    <h2>Root Component</h2>
    <p>disabled props: {{disabled}}</p>
    <p class="paragraph">Injected state</p>
    <div class="highlight" v-html="JSON.stringify(contextInject)"></div>
    <br />
    <p class="paragraph">Disabled state</p>
    <div class="highlight" v-html="JSON.stringify(context)"></div>
    <div class="offset">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { symbol } from "./util";
import { provide, reactive, toRefs, inject, computed, ref } from "vue";

export default {
  name: "RootComponent",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const contextInject = inject(symbol, ref({ disabled: false }));
    const context = computed(() => {
      return {
        disabled: contextInject.value.disabled || props.disabled || false,
      };
    });
    provide(symbol, context);

    return {
      context: context,
      contextInject,
    };
  },
};
</script>

<style>
.toggle {
  background-color: blue;
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
  border: 2px solid blue;
}
.paragraph {
  text-decoration: underline;
  font-size: 20px;
  margin: 0;
}
.highlight {
  font-size: 20px;
  font-weight: 900;
  color: blue;
  margin-bottom: 16px;
}
.offset {
  display: block;
}
</style>
