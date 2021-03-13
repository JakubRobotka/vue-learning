import { computed, toRef } from "vue";
import { useState } from "./state";

export function useToggleState(state, { emit, props }) {
  if (state === null) {
    state = useState(
      toRef(props, 'modelValue'),
      props.checked ?? false,
      emit
    );
  }

  const onToggle = (value) => {   
    console.log("onToggle:", value, state.value); 
    if (Array.isArray(state.value)) {
      if (state.value.includes(props.value)) {
        state.value = [...state.value.filter((item) => item !== props.value)];
      } else {
        state.value = state.value.concat([value]);
      }
    } else {
      state.value = value || !state.value;
    }
  };

  const active = () => {
    if (Array.isArray(state.value)) {
      return state.value.includes(props.value);
    }
    return state.value;
  };

  return {
    selected: computed({
      get: active,
      set: onToggle
    })
  };
}
