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

//Third (Listen to changes on the state)
const store = createStore()

store.subscribe(() => {
  console.log('The new State is: ', store.getState())
})

/* store.subscribe(() => {
  console.log('The Store changed')
}) */

const unsubscribe = store.subscribe(() => {
  console.log('The Store changed')
})

unsubscribe()