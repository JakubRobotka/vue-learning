import { reactive, readonly, watch } from "vue";

export function useMergeProps<T1 extends object, T2 extends object>(obj: T1, defaults: T2) {
    const _o = reactive({}) as T1 & T2;
    watch([obj, defaults], () => Object.assign(_o, defaults, obj), { immediate: true });
    return readonly(_o);
}