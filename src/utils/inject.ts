import { inject, InjectionKey } from "vue";

export function createInjector<API extends Symbol>(defaultKey: InjectionKey<API>) {
    return function(key: InjectionKey<API> = defaultKey) {
        const api = inject(key);
        if (!api) {
            throw new Error('Injection not found');
        }
        return api;
    }
}