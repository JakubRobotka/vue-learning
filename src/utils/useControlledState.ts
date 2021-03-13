import { computed, ref, Ref, UnwrapRef, watch } from 'vue';

export function useControlledState<T>(value: Ref<T>, defaultValue: T, emit: (event: string, payload: any) => void): Ref<UnwrapRef<T> | T> {
  const isControlled = !!(value?.value) ?? false;
  const stateValue: Ref<UnwrapRef<T> | T> = ref(isControlled ? value.value : defaultValue)
  const stateRef: Ref<UnwrapRef<T> | T | UnwrapRef<UnwrapRef<T>>> = ref(stateValue.value)

  if (isControlled) {
    watch(value, () => {
      if (JSON.stringify(value.value) !== JSON.stringify(stateRef.value)) {
        setValue(value.value)
      }
    })
  }

  const setValue = (value: UnwrapRef<T> | T) => {
    stateValue.value = value
    if (JSON.stringify(stateValue.value) !== JSON.stringify(stateRef.value) && emit) {
      emit('update:modelValue', value)
    }
    stateRef.value = value
  }

  return computed({
    get: () => stateValue.value,
    set: (val: UnwrapRef<T> | T) => setValue(val),
  })
}
