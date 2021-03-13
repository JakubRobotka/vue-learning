import { nextTick, reactive } from "vue";
import { filterDOMProps } from "./propsUtils";

const _props = { 
    id: '1',
    test: 'yes',
    dataTest: 'dataTest',
    'data-attribute': 'dataAttribute',
    'aria-label': 'testAriaLabel'
};

const _outputLocalProps = {
    id: '1',
    'data-test': 'dataTest',
    'data-attribute': 'dataAttribute'
}

describe('filterDOMProps', function() {
    it('Filter DOM props while keep reactivty', async () => {
        const props = reactive(_props);
        const dom = filterDOMProps(props);
        expect(dom).toMatchObject(_outputLocalProps);
        expect(props.id).toBe('1');
        expect(dom).not.toHaveProperty('test');
        expect(dom).not.toHaveProperty('aria-label');
        expect(dom.id).toBe('1');
        
        props.id = '2';
        await nextTick();
        expect(props.id).toBe('2');
        expect(dom.id).toBe('2');
    });

    it('Enable labelable attributes', async () => {
        const props = reactive(_props);
        const dom = filterDOMProps(props, {labelable: true});
        expect(dom).not.toMatchObject(_outputLocalProps);
        expect(dom).toHaveProperty('aria-label');
        
        props["aria-label"] = 'newValue';
        await nextTick();
        expect(dom["aria-label"]).toBe('newValue');
    });

    it('Enable custom attributes to be included in output', async () => {
        const props = reactive(_props);
        const dom = filterDOMProps(props, {propNames: new Set(['test'])});
        expect(dom).not.toMatchObject(_outputLocalProps);
        expect(dom).toHaveProperty('test');
        expect(dom).not.toHaveProperty('aria-label');
        
        props["test"] = 'newValue';
        await nextTick();
        expect(dom["test"]).toBe('newValue');
    })
});