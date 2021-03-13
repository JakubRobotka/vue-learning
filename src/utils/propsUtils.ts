import { HTMLAttributes, reactive, readonly, watch } from "vue";

export interface DOMProps {
    [key: string]: any
    id?: string
}

export interface AriaLabelingProps {
    'aria-label'?: string,
    'aria-labelledby'?: string,
    'aria-describedby'?: string,
    'aria-details'?: string
}

interface FilterDOMOptions {
    labelable?: boolean,
    propNames?: Set<string>
}

const DOMPropNames = new Set(["id"]);

const labelablePropNames = new Set([
    "aria-label",
    "aria-labelledby",
    "aria-describedby",
    "aria-details",
]);

const propRe = /^(data-.*)$/;
const propReactive = /^(data+[A-Z].*$)/;

const kebabCase = (string: string) : string =>
      string
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase();

interface FilterDomProps extends HTMLAttributes {
    [key: string]: any
}

export function filterDOMProps(props: DOMProps & AriaLabelingProps, opts: FilterDOMOptions = {}): DOMProps & AriaLabelingProps {
    const { labelable, propNames } = opts;
    const o = reactive({}) as FilterDomProps;
    watch(props, () => {
      for(const prop in props) {
        if (
          (Object.prototype.hasOwnProperty.call(props, prop) &&
            DOMPropNames.has(prop)) ||
          (labelable && labelablePropNames.has(prop)) ||
          propNames?.has(prop) ||
          propRe.test(prop) ||
          propReactive.test(prop)
        ) {
          o[kebabCase(prop)] = props[prop];
        }
      }
    }, {
      immediate: true
    })
    return readonly(o);
}
