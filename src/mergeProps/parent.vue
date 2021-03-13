<template>
  <div>
    <h3>Merge Props plaing</h3>
    <input type="text" v-model="param1" />
    <input type="text" v-model="param4" />
    <input type="text" v-model="param3" />
    <children-merge :param1="param1" :param3="param3"></children-merge>
    <br />
    <br />
    <div>{{ form }}</div>
    <child-input-text name="firstName" :param1="param1"></child-input-text>
    <child-input-text name="lastName"></child-input-text>
    <child-input-text name="email"></child-input-text>
    <child-input-text name="phone"></child-input-text>

    <div v-html="JSON.stringify(rawObject)"></div>
    <a href="#" @click.prevent="test">Form submit data</a>
  </div>
</template>

<script>
import { provide, ref, reactive, watch, toRaw, unref } from "vue";
import ChildrenMerge from "./child.vue";
import ChildInputText from "./inputText.vue";
export default {
  components: { ChildrenMerge, ChildInputText },
  setup() {
    const form = reactive({});
    const param1 = ref("");
    const param2 = ref("");
    const param3 = ref("hustý");
    const param4 = ref("");
    provide("mergeProps", {
      param4,
      param2,
      param3,
    });
    provide("form", form);

    let rawObject = exportRawObejct(form);

    // watch(form, (form) => {
    //   rawObject = exportRawObejct(form);
    //   console.log(rawObject);
    // });
    const test = () => {
      console.log(exportRawObejct(form));
    };
    return {
      param1,
      param4,
      param3,
      form,
      rawObject,
      test,
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
