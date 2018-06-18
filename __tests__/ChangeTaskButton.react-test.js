import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {ChangeTaskButton} from '../frontend/Components/TaskItem/ChangeTaskButton'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

describe('CHANGE_TASK_BUTTON --- Shalow render React Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ChangeTaskButton />
    )
  })

  it('проверяем отображение кнопки - редактировать', () => {
    expect(wrapper.setProps({stateButton: 'EDIT'}).find('i').text()).toBe('create')
  })

  it('проверяем отображение кнопки - сохранить изменения', () => {
    expect(wrapper.setProps({stateButton: 'SAVE_CHANGES'}).find('i').text()).toBe('done')
  })

  it('проверяем отображение кнопки - удалить', () => {
    expect(wrapper.setProps({stateButton: 'REMOVE'}).find('i').text()).toBe('clear')
  })
})
