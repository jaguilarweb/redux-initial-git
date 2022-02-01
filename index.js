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
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL ='REMOVE_GOAL'

function todos (state = [], action) {
  switch(action.type){
    case  ADD_TODO :
      return state.concat([action.todo])
    case REMOVE_TODO :
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO :
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete}))
    default :
      return state
  }
}

function goals (state = [], action) {
  switch(action.type){
    case  ADD_GOAL :
      return state.concat([action.goal])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== action.id)      
    default :
      return state
  }
}

//How createStore(todos) only handle a single reducer function
//we need to create a new reducer, a root reducer that will include 
//all news reducer functions that we need. (Ex todos as well goals)
// const store = createStore(todos)

//app reducer will be our root reducer
function app (state = {}, action){
  return{
    todos: todos(state.todos, action),
    goals: goals(state.goal, action),
  }
}

//And we pass app instead of todo
const store = createStore(app)

store.subscribe(()=>{
  console.log('The new state is: ', store.getState() )
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})
//We could add all dispatch that we need
// store.dispatch({
//   type: ADD_TODO,
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

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Learn More'
  }
})