import { computed, ref } from "vue";

export function useCheckbox(props, state, { emit, groupProps = {} }) {
  const isFocused = ref(false);

  const input = ref(null);


  // @TODO - focus management for only keyboard activation
  const setFocus = () => {
    isFocused.value = true;
  };

  const setBlur = () => {
    isFocused.value = false;
  };

  const blur = () => input.value.blur();
  const click = () => input.value.click();

  return {
    input,
    blur,
    click,
    inputProps: computed(() => {
        return {
            value: props.value,
      type: "checkbox",
      readonly: groupProps.readonly || props.readonly ? "readonly" : false,
      checked: state.value,
      disabled: groupProps.disabled || props.disabled || null
        };
    }),
    inputEvents: {
        change: () => {
            console.log("asdfa")
        },
      focus: () => {
        setFocus();
        emit("focus");
      },
      blur: () => {
        setBlur();
        emit("blur");
      }
    },
    focus: {
      isFocused,
      setFocus,
      setBlur
    }
  };
}
