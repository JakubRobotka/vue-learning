import { reactive } from "vue";

interface focusWithinProps {
    disabled?: boolean,
    onFocusWithin?: (e: FocusEvent) => void,
    onBlurWithin?: (e: FocusEvent) => void,
    onFocusWithinChange?: (isFocusWithin: boolean) => void,
}

export function useFocusWithin(props : focusWithinProps) {
    const state = reactive({isFocusWithin: false})
    if (props.disabled) {
        return {focusWithinProps: {}};
    }

    const onFocus = (e: FocusEvent) => {
        if (!state.isFocusWithin) {

            if (props.onFocusWithin) {
                props.onFocusWithin(e);
            }

            if (props.onFocusWithinChange) {
                props.onFocusWithinChange(true);
            }

            state.isFocusWithin = true;
        }
    }

    const onBlur = (e: FocusEvent) => {
        if (state.isFocusWithin && !(e.currentTarget as HTMLElement).contains(e.relatedTarget as HTMLElement)) {
            if (props.onBlurWithin) {
                props.onBlurWithin(e);
            }

            if (props.onFocusWithinChange) {
                props.onFocusWithinChange(false);
            }

            state.isFocusWithin = false;
        }
    }

    return {
        focusWithinProps: {
            onFocus,
            onBlur,
        }
    }
}
