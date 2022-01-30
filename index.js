// Vanilla Javascript

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
  }

  return {
    getState,
    subscribe
  }
}

//Third (Listen to changes on the state)
const store = createStore()

store.subscribe(() => {
  console.log('The new State is: ', store.getState())
})

store.subscribe(() => {
  console.log('The Store changed')
})