import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TaskItem from '../src/Components/TaskItem';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

describe('TASK_ITEM --- Shalow render React Component', () => {
    let wrapper;
    const changeTask = jest.fn();
    const removeTask = jest.fn();
    const output = {
        value: "TEST - Task #1",
        id: '001',
        completed: false
    };

    beforeEach(() => {
        wrapper = shallow(
            <TaskItem
                task={output}
                changeTask={changeTask}
                removeTask={removeTask}
            />
        )
    });

    it('рендерим компонент TASK_ITEM', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('проверяем состояние компонента при первом рендере', () => {
        expect(wrapper.state().value).toBe(output.value);
        expect(wrapper.state().completed).toBe(output.completed);
    });

    it('проверяем актуальность отображаемой информации в инпутах компонента', () => {
        expect(wrapper.find('input[type="text"]').prop('value')).toBe(output.value);
        expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(output.completed);
    });

    it('проверяем state.completed после клика по чекбоксу', () => {
        const event = {target: {checked: true}};

        expect(wrapper.state().completed).toBeFalsy();
        expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBeFalsy();

        wrapper.find('input[type="checkbox"]').simulate('change', event);
        
        expect(wrapper.state().completed).toBeTruthy();
        expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(event.target.checked);
    });

    it('проверяем state.value во время редактирования задачи', () => {
        const event = {target: {value: 'New TEST Task'}};

        expect(wrapper.state().value).toBe(output.value);

        wrapper.find('input[type="text"]').simulate('change', event);

        expect(wrapper.state().value).toBe(event.target.value);
        expect(wrapper.find('input[type="text"]').prop('value')).toBe(event.target.value);
    });
})