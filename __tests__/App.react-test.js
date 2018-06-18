import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import configureStore from 'redux-mock-store'
import Adapter from 'enzyme-adapter-react-16'

import App from '../frontend/App'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

describe('APP --- React Redux', () => {
  const initialState = {todoList: []}
  const mockStore = configureStore()
  let store, container

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<App store={store} />)
  })

  it('проверяем рендер компонента контейнера', () => {
    expect(container.length).toEqual(1)
  })

  it('проверяем соответствие initialState со state из mapStateToProps', () => {
    expect(container.prop('todoList')).toEqual(initialState.todoList)
  })
})
