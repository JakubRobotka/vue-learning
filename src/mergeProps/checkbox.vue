<template>
  <label>
    <input ref="input" @change="event => selected = event.target.value" v-bind="{ ...inputProps }" />
    <slot name="checkbox" :is-checked="selected">
      <span>
        <slot v-if="selected" name="checkbox">seslected</slot>
      </span>
    </slot>Label slot
  </label>
</template>

<script>
import { useToggleState } from "./useToggle";
import { useCheckbox } from "./useCheckbox";

export default {
  inheritAttrs: false,
  props: {
    /**
     * The current value (controlled)
     * @default null
     * @type {Boolean, String, Number}
     */
    value: {
      type: [Boolean, String, Number],
      default: null,
    },
    /**
     * Value binded from v-model
     * @default null
     * @type {Array, Boolean, Number}
     */
    modelValue: {
      type: [Array, Boolean, Number],
      default: null,
    },
    /**
     * Checked status for checkbox
     * @default null
     * @type {Boolean}
     */
    checked: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const { selected } = useToggleState(null, {
      emit,
      props,
    });

    const test = () => {
      console.log("asd");
    };

    const {
      inputProps,
      inputEvents,
      input,
      blur,
      click,
      isIndeterminate,
      focus,
    } = useCheckbox(props, selected, {
      emit,
    });

    return {
      selected,
      inputProps,
      inputEvents,
      input,
      blur,
      click,
      focus,
      indeterminate: isIndeterminate,
    };
  },
};
</script>
