import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import reducerApp from '../frontend/Reducers'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

describe('REDUCER --- Test change list ToDo', () => {
  it('проверяем инициализацию state', () => {
    const initialState = {todoList: []}

    expect(reducerApp(undefined, {})).toEqual(initialState);
  });

  it('проверяем изменение state ToDo листа в редюсере', () => {
    let state = { todoList: [] }
    const newState = [
      {
        value: 'Test #1',
        id: 1,
        completed: false
      },
      {
        value: 'Test 2',
        id: 2,
        completed: false
      },
      {
        value: 'Test 3',
        id: 3,
        completed: true
      }
    ]
    const actionType = {
      type: 'GET_THE_CURRENT_TODO_LIST',
      payload: newState
    }
    state = reducerApp(state, actionType)

    expect(state).toEqual({todoList: newState})
  })
})
