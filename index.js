// Vanilla Javascript

function createStore () {
  //The store should have four parts:
  // 1. The State
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state


//First (the State)
  let state

//Second (Get State)
  const getState = () => state

  return {
    getState
  }
}

//Third (Listen to changes on the state)

//In order to invoke createStore and get back store.
const store = createStore()

// Now we just have a getState method
// but in the future we would want something like:


//It is needed create inside of createStore a way
// to soport this functionality
store.subscribe(() => {
  //So whenever the state changes internally
  //We can invoke this callback fn and can do anything we want
  console.log('The new State is: ', store.getState())
})

//And likely we might want to subscribe
//more than one time

store.subscribe(() => {
  console.log('The Store changed')
})