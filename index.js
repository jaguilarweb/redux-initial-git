// Vanilla Javascript

// Fourth. (Update the state)

function todos (state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo])
  }
  return state
}

function createStore () {
  //The store should have four parts:
  // 1. The State
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

//First (the State)
  let state
// Third (Listen to changes)
  let listeners = []

//Second (Get State)
  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    //Unsubscribe
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  //Fourth (Update the state)
  // Dispatch is responsible for updating the state
  //inside of our actual store
  const dispatch = (action) => {
    state = todos(state, action)
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}
