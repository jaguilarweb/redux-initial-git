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

const store = createStore(todos)

store.subscribe(()=>{
  console.log('The new state is: ', store.getState() )
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})
//We could add all dispatch that we need
// store.dispatch({
//   type: 'ADD_TODO',
//   todo: {
//     id: 1,
//     name: 'Read a book',
//     complete: true
//   }
// })

//You will see (browser console):
//The new state is:  
// (2) [{…}, {…}]
// 0: {id: 0, name: 'Learn Redux', complete: false}
// 1: {id: 1, name: 'Read a book', complete: true}
// length: 2
// [[Prototype]]: Array(0)