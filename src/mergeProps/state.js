import { computed, ref, watch } from "vue";

export function useState(value, defaultValue, emit) {
  const stateValue = ref(value.value || defaultValue);
  const isControlled = value.value !== undefined && value.value !== null;
  const stateRef = ref(stateValue.value);
  // const stateRef = shallowRef(stateValue.value);
  // Watch controlled state change value
  watch(value, () => {
    if(value.value !== stateRef.value) {
      setValue(value.value);
    }
  });


  let setValue = (value) => {
    let onChangeCaller = (value) => {
      if (stateValue !== stateRef.value && emit) {
        emit("update:modelValue", value);
      }
      if (!isControlled) {
        stateRef.value = value;
      }
    };

    stateValue.value = value;

    // if (!isControlled) {
    // }

    onChangeCaller(value);

    if (isControlled) {
      stateRef.value = value;
    }
  };

  return computed({
    get: () => stateValue.value,
    set: (val) => setValue(val)
  });
}
