// Vanilla Javascript

//Library Code
function createStore (reducer) {
  let state
  let listeners = []

  //Gets the current state
  const getState = () => state

  //Takes in functions that will be called
  //when the state changes
  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  //Modifies the state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}


//App Code
function todos (state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo])
  }
  return state
}
