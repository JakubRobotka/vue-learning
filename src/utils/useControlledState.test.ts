import { nextTick, ref } from "vue";
import { useControlledState } from "./useControlledState";

describe('useControlledState tests', function () {
  it('use defaultValue and change value from inner', async () => {
    const spy = jest.fn();
    const state = useControlledState(null, 'defaultValue', spy);
    expect(state.value).toBe('defaultValue');
    expect(spy).not.toHaveBeenCalled();
    state.value = 'newValue';
    await nextTick();
    expect(spy).toHaveBeenCalledWith('update:modelValue', 'newValue');
    expect(state.value).toBe('newValue');

    spy.mockClear();

    state.value = 'newValue';
    await nextTick();
    expect(state.value).toBe('newValue');
    expect(spy).not.toHaveBeenCalled();

    state.value = 'newValue2';
    await nextTick();
    expect(state.value).toBe('newValue2');
    expect(spy).toHaveBeenCalledWith('update:modelValue', 'newValue2');
  })

  it('use defaultValue and change value from inner with number', async () => {
    const spy = jest.fn();
    const state = useControlledState(null, 1, spy);
    expect(state.value).toBe(1);
    expect(spy).not.toHaveBeenCalled();
    state.value = 2;
    await nextTick();
    expect(spy).toHaveBeenCalledWith('update:modelValue', 2);
    expect(state.value).toBe(2);

    spy.mockClear();

    state.value = 2;
    await nextTick();
    expect(state.value).toBe(2);
    expect(spy).not.toHaveBeenCalled();

    state.value = 1;
    await nextTick();
    expect(state.value).toBe(1);
    expect(spy).toHaveBeenCalledWith('update:modelValue', 1);
  })

  it('use controlledValue and change value from parent', async () => {
    const refValue = ref('controlledValue');
    const spy = jest.fn()
    const state = useControlledState(refValue, 'defaultValue', spy);
    expect(state.value).toBe(refValue.value);
    refValue.value = 'newValue';
    await nextTick();
    expect(spy).toHaveBeenCalled();
    expect(state.value).toBe('newValue');
    refValue.value = 'newValue';
    await nextTick();
    expect(spy).toHaveBeenCalled();

    spy.mockClear();

    state.value = 'newValue';
    await nextTick();
    expect(state.value).toBe('newValue');
    expect(spy).not.toHaveBeenCalled();

  })

  it('use defaultValue with support for array', async () => {
    const defaultValue: number[] = [];
    const spy = jest.fn()
    const state = useControlledState(null, defaultValue, spy);
    expect(state.value).toStrictEqual(defaultValue);
    expect(spy).not.toHaveBeenCalled();

    state.value = [1];
    await nextTick();
    expect(state.value).toStrictEqual([1]);
    expect(spy).toHaveBeenCalled();

    state.value = [1, 2];
    await nextTick();
    expect(state.value).toStrictEqual([1, 2]);
    expect(spy).toHaveBeenCalled();

    spy.mockClear();

    state.value = [1, 2];
    await nextTick();
    expect(state.value).toStrictEqual([1, 2]);
    expect(spy).not.toHaveBeenCalled();

    spy.mockClear();

    state.value = [2, 1];
    await nextTick();
    expect(state.value).toStrictEqual([2, 1]);
    expect(spy).toHaveBeenCalled();
  })

  it('use controlledValue with support for array', async () => {
    const refValue = ref([]);
    const spy = jest.fn()
    const state = useControlledState(refValue, [], spy);
    expect(state.value).toStrictEqual(refValue.value);
    expect(spy).not.toHaveBeenCalled();

    refValue.value = [1];
    await nextTick();
    expect(state.value).toStrictEqual([1]);
    expect(spy).toHaveBeenCalled();

    refValue.value = [1, 2];
    await nextTick();
    expect(state.value).toStrictEqual([1, 2]);
    expect(spy).toHaveBeenCalled();

    spy.mockClear();

    refValue.value = [1, 2];
    await nextTick();
    expect(state.value).toStrictEqual([1, 2]);
    expect(spy).not.toHaveBeenCalled();

    spy.mockClear();

    refValue.value = [2, 1];
    await nextTick();
    expect(state.value).toStrictEqual([2, 1]);
    expect(spy).toHaveBeenCalled();

    spy.mockClear();

    // Update value but wont trigger callback
    refValue.value.push(3);
    await nextTick();
    expect(state.value).toStrictEqual([2, 1, 3]);
    expect(spy).not.toHaveBeenCalled();
  })
})