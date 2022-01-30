// Vanilla Javascript

//Reducer todo function
function todos (state = [], action) {
  if (action.type === 'ADD_TODO') {
    return state.concat([action.todo])
  }
  return state
}

//About the function avobe we need to keep in mind
//the first time that this function is invoked (state)
//is going to be undefined. So we use state=[] as a default parameter
// to indicate if the state is undefined set it to an empty array
//and then if it is an array we can call dot concat later


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

  /**
   * We need to provide a unsubscribe method too
   */

  const subscribe = (listener) => {
    listeners.push(listener)
    //Unsubscribe
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  return {
    getState,
    subscribe
  }
}
