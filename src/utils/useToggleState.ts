import { computed, Ref, toRef, UnwrapRef } from "vue";
import { useControlledState } from "./useControlledState";

type GroupToggleInput = string | number


interface ToggleState {
    selected: Ref<UnwrapRef<boolean>>,
    toggle(value: any): void
}

interface Validation {
    required?: boolean
}

interface InputBase {
    disabled?: boolean,
    readonly?: boolean,
}

export interface KeyboardEvents {
    onKeyDown?: (e: KeyboardEvent) => void,
    onKeyUp?: (e: KeyboardEvent) => void
  }

interface FocusEvents {
    onFocus?: (e: FocusEvent) => void,
    onBlur?: (e: FocusEvent) => void,
    onFocusChange?: (isFocused: boolean) => void
  }

interface FocusableProps extends KeyboardEvents, FocusEvents {
    autofocus?: boolean,
}

interface ToggleProps extends InputBase, Validation, FocusableProps {
    readonly modelValue?: boolean | Array<GroupToggleInput>,
    
    readonly checked?: boolean,

    value?: GroupToggleInput,

    defaultValue?: boolean,

    name?: string
}


export function useToggleState(props: ToggleProps, emit: (event: string, payload: any) => void): ToggleState {
    const selected = useControlledState(toRef(props, 'modelValue'), props.defaultValue || false, emit);

    const getValue = () => {
        if (Array.isArray(selected.value)) {
            return selected.value.includes(props.value);
        }
        return selected.value
    }

    const setValue = (value: UnwrapRef<boolean>) : void => {
        if (props.readonly) return null;

        if (Array.isArray(selected.value)) {
            if (selected.value.includes(props.value)) {
                selected.value = [...selected.value.filter((item) => item !== props.value)];
            } else {
                selected.value = selected.value.concat([props.value]);
            }
        } else {
            selected.value = value || !selected.value;
        }

    }

    return {
        selected: computed({
            get: getValue,
            set: setValue
        }),
        toggle: setValue,
    }
}