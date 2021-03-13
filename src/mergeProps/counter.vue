<template>
  <div>

    <h1>Testing reactive props from parent issue with vue</h1>
    <div class="p-4 border">
      default -
      <br>
      {{ user }}
      <br>
      modified -
      <br>
      {{ modified }}
      <br>
      <br>
      <input type="text" v-model="modified">
    </div>
    <br />
    <br />
    <br />
    <h2>Props to merge - official function without reactivity</h2>
    {{ propsToMerge }}
    <br />
    <br />
    <br />
    <h2>Props to merge - custom function with reactivity</h2>
    {{ propsToMergeReactive }}
    <br />
    <br />
    <br />
    <h2>Filtered DOM Props</h2>
    {{ filterDOMProps(props) }}
    <br />
    <br />
    <br />
    <h2>Combination of reactive merge and fitlered DOM Props</h2>
    {{ combineMergeWithFilter }}
    <br />
    <br />
    <br />
  </div>
  <!-- <a href="#" @click.prevent="toggleArrayValue">Update array</a>
  <checkbox></checkbox>
  <checkbox v-model="singleCheckbox"></checkbox>
  {{ singleCheckbox }}
  <br /> -->

  <!-- <br />
  <checkbox v-model="toggleAll" value="1"></checkbox> -->

  <!-- <br />
  <br />
  <div class="flex flex-col">
    <checkbox v-model="mutipleCheckbox" value="1"></checkbox>
    <checkbox v-model="mutipleCheckbox" value="2"></checkbox>
    <checkbox v-model="mutipleCheckbox" value="3"></checkbox>
    <checkbox v-model="mutipleCheckbox" value="3"></checkbox>
    <checkbox :model-value="mutipleCheckbox" @update:model-value="test" value="4"></checkbox>-->
  <!-- </div> -->
  <!-- {{ mutipleCheckbox }} -->
</template>

<script>
import Checkbox from "./checkbox.vue";
import { filterDOMProps, useReactiveDefaults } from "./filterDom";
import {
  computed,
  ref,
  shallowRef,
  watch,
  toRef,
  isRef,
  defineComponent,
  mergeProps,
  camelize,
  reactive,
} from "vue";

export default {
  props: {
    id: {
      type: String,
      default: "unikát",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dataFoo: {
      type: String,
      default: "aaa",
    },
    dataPokus: {
      type: String,
    },
    ariaLabel: {
      type: String,
    },
    user: {
      type: Object,
      default: null
    }
  },
  components: {
    Checkbox,
  },
  setup(props, { emit, attrs }) {
    const singleCheckbox = ref(false);
    const mutipleCheckbox = ref([]);

    const { user } = props;

    const modified = ref(user);

    const reactivePropsToMerge = reactive({
      ultimate: "1",
      dataShit: "overrideProps",
      ariaLabel: "overrideAriaLabel with merge",
    });

    const propsToMerge = mergeProps(props, reactivePropsToMerge);

    const propsToMergeReactive = useReactiveDefaults(
      props,
      reactivePropsToMerge
    );

    const combineMergeWithFilter = filterDOMProps(
      useReactiveDefaults(props, reactivePropsToMerge)
    );

    const toggleArrayValue = () => {
      const testValue = "2";
      if (mutipleCheckbox.value.includes(testValue)) {
        mutipleCheckbox.value = mutipleCheckbox.value.filter(
          (e) => e !== testValue
        );
      } else {
        mutipleCheckbox.value = mutipleCheckbox.value.concat(testValue);
      }
    };

    const filterDom = filterDOMProps(props);

    const toggleAll = computed({
      get: () => mutipleCheckbox.value.length === 3,
      set: () => {
        if (!toggleAll.value) {
          mutipleCheckbox.value = ["1", "2", "3"];
        } else {
          mutipleCheckbox.value = [];
        }
      },
    });

    return {
      combineMergeWithFilter,
      propsToMerge,
      propsToMergeReactive,
      props,
      filterDOMProps,
      toggleArrayValue,
      singleCheckbox,
      mutipleCheckbox,
      toggleAll,
      modified,
    };
  },
};
</script>

<style>
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}
</style>
