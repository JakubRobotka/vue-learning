import { nextTick, reactive } from "vue";
import { useMergeProps } from "./useMergeProps";

const _props = {
    id: '1',
    test: 'yes',
    dataTest: 'dataTest',
    'data-attribute': 'dataAttribute',
    'aria-label': 'testAriaLabel'
};

const _outputLocalProps = {
    id: '2',
    'data-test': 'dataTest',
    'data-attribute': 'dataAttribute2'
}

const _outputExpect = {
    id: '2',
    test: 'yes',
    dataTest: 'dataTest',
    'data-attribute': 'dataAttribute2',
    'aria-label': 'testAriaLabel',
    'data-test': 'dataTest'
}


describe('MergeProps', () => {
    it('mergeReactiveProps', async () => {
        const propsDefault = reactive(_props);
        const props = reactive(_outputLocalProps);
        const output = useMergeProps(props, propsDefault);

        expect(output).toMatchObject(_outputExpect);
        expect(output).toHaveProperty('test');
        expect(output).toHaveProperty('dataTest');
        expect(output).toHaveProperty('data-test');
        expect(output).toHaveProperty('data-attribute');
        expect(output.id).toBe('2');

        props["data-test"] = 'newValue';
        propsDefault.test = 'no';
        await nextTick();

        expect(output.test).toBe('no');
        expect(output['data-test']).toBe('newValue');
    });
})
