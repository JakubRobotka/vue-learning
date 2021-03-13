<template>
  <div>
    <h3>Child Merge props</h3>
    <div v-html="JSON.stringify(props)"></div>
    <h4>Inject data</h4>
    <div v-html="JSON.stringify(context)"></div>
    <h4>Local reactive from props</h4>
    <div>{{ param2 }}</div>
    <h4>Local reactive from props</h4>
    <div>{{ param3 }}</div>
    <h4>shallowProps</h4>
    <div>{{ shallowProps }}</div>
    <h4>MERGED</h4>
    <div>{{ raw(merged) }}</div>
  </div>
</template>

<script>
import {
  toRefs,
  inject,
  toRef,
  ref,
  watchEffect,
  shallowReactive,
  mergeProps,
  unref,
  getCurrentInstance,
} from "vue";
import { createInjector } from "./../utils/inject";
const enableProps = ["param2", "param4"];

export default {
  props: {
    param1: String,
    param2: {
      type: String,
      default: "child",
    },
    param3: {
      type: String,
      default: "param3default",
    },
    param4: String,
  },
  setup(props) {
    const vm = getCurrentInstance();
    //   Merging props and inject with refs instance
    const context = createInjector("mergeProps")();
    const propsPlaceholder = Object.assign({}, context, toRefs(props));
    context.param4.value = "override param 4";
    const params2Local = ref(propsPlaceholder.param2.value);
    const params3Local = ref(propsPlaceholder.param3.value);

    const merged = mergeProps(props, context);

    let shallowProps = shallowReactive({ ...props });

    watchEffect(() => {
      params3Local.value = propsPlaceholder.param3.value;
      shallowProps = shallowReactive({ ...props });
    });

    return {
      props: propsPlaceholder,
      context,
      param2: params2Local,
      param3: params3Local,
      shallowProps,
      merged,
      raw: exportRawObejct,
    };
  },
};

function exportRawObejct(object) {
  const tempObject = {};
  for (const value in object) {
    tempObject[value] = unref(object[value]);
  }
  return tempObject;
}
</script>