import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {InputCreateItemTodoTask} from '../frontend/Components/InputCreateTodoTask'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

describe('INPUT_CREATE_ITEM_TODO_TASK --- Shalow render React Component', () => {
  let wrapper
  const createTask = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<InputCreateItemTodoTask createTask={createTask} />)
  })

  it('рендерим компонент INPUT_CREATE_ITEM_TODO_TASK', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('проверяем состояние компонента при инициализации', () => {
    const state = {value: ''}

    expect(wrapper.state().value).toBe(state.value)
    expect(wrapper.find('input[type="text"]').prop('value')).toBe(state.value)
  })

  it('проверяем обработку события onInput на поле ввода', () => {
    const state = {value: ''}
    const event = {target: {value: 'TEST Task'}}

    expect(wrapper.state().value).toBe(state.value)
    expect(wrapper.find('input[type="text"]').prop('value')).toBe(state.value)

    wrapper.find('input[type="text"]').simulate('input', event)

    expect(wrapper.state().value).toBe(event.target.value)
    expect(wrapper.find('input[type="text"]').prop('value')).toBe(event.target.value)
  })

  it('проверяем обработку отправки новой задачи по событию onKeyUp на клавишу Enter', () => {
    const state = {value: 'TEST Task'}
    const event = {
      preventDefault: () => {},
      keyCode: 13
    }

    expect(wrapper.setState(state).state().value).toBe(state.value)
    expect(wrapper.find('input[type="text"]').prop('value')).toBe(state.value)

    wrapper.find('input[type="text"]').simulate('keyup', event)

    expect(createTask).toHaveBeenCalledTimes(1)
  })
})
