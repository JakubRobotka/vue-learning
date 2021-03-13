<template>
  <counter
    :id="idTestReactivity"
    :data-pokus="dataTestReactivity"
    :aria-label="dataAriaLabelReactivity"
    :user="testingCounter"
  ></counter>
  <br />
  <br />
  <input type="text" v-model="idTestReactivity" />
  <br />

  <input type="text" v-model="dataAriaLabelReactivity" />
  <br />
  <input type="text" v-model="dataTestReactivity" />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />

  <div>
    <parent-merge></parent-merge>
  </div>
  <div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
  <root :disabled="rootDisabled">
    <div>
      toggle wrapper disabled:
      <a class="link" href="#" @click.prevent="toggleWrapper">Toogle wrapper</a>
    </div>
    <wrapper :disabled="wrapperDisabled">
      <div>
        toggle child disabled:
        <a class="link" href="#" @click.prevent="toggleChild">Toogle child</a>
      </div>
      <children :disabled="childDisabled"></children>
    </wrapper>
  </root>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Root from "./components/root.vue";
import Wrapper from "./components/wrapperComponent.vue";
import Children from "./components/childComponent.vue";
import ParentMerge from "./mergeProps/parent.vue";
import Counter from "./mergeProps/counter.vue";
import { reactive, ref } from "vue";
export default {
  name: "App",
  components: {
    HelloWorld,
    Root,
    Wrapper,
    Children,
    ParentMerge,
    Counter,
  },
  setup() {
    // const testingCounter = reactive({
    //   name: "Jakub Robotka",
    //   id: "1",
    //   email: "jakub.robotka@gmail.com"
    // });
    const testingCounter = ref("Jakub Robotka")
    const rootDisabled = ref(false);
    const wrapperDisabled = ref(false);
    const childDisabled = ref(false);

    const idTestReactivity = ref("unikat");
    const dataTestReactivity = ref("test1");
    const dataAriaLabelReactivity = ref("ariaLabel");

    const toggleRoot = () => {
      rootDisabled.value = !rootDisabled.value;
    };

    const toggleWrapper = () => {
      wrapperDisabled.value = !wrapperDisabled.value;
    };

    const toggleChild = () => {
      childDisabled.value = !childDisabled.value;
    };

    return {
      dataAriaLabelReactivity,
      dataTestReactivity,
      idTestReactivity,
      rootDisabled,
      wrapperDisabled,
      childDisabled,
      toggleRoot,
      toggleWrapper,
      toggleChild,
      testingCounter
    };
  },
};
</script>

<style>
.link {
  background-color: gray;
  border-radius: 5px;
  padding: 8px 16px;
  display: inline-block;
  margin-bottom: 8px;
  color: white;
  font-weight: 600;
  text-decoration: none;
}
</style>
