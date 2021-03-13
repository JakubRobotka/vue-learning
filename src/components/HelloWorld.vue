<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <div>
    <p>HelloWorld</p>
    <p>HelloWorld</p>
    <p>HelloWorld</p>
    <p>HelloWorld</p>
    <p>
      adfa asfdas
      <span>afdas</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
};
</script>
