import { reactive, readonly, watch } from "vue";

const DOMPropNames = new Set(["id"]);
const labelablePropNames = new Set([
    "aria-label",
    "aria-labelledby",
    "aria-describedby",
    "aria-details",
]);

const kebabCase = (string) =>
    string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

const propRe = /^(data-.*)$/;
const propReactive = /^(data+[A-Z].*$)/;

export const filterDOMProps = (props, opts = { labelable: true, propNames: new Set() }) => {
    let { labelable, propNames } = opts;
    const o = reactive({});
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

export function useReactiveDefaults(
  obj,
  defaults
) {
  const o = reactive({})
  watch(obj, () => Object.assign(o, obj, defaults), { immediate: true })
  return readonly(o);
}