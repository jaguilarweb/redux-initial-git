// Vanilla Javascript

//This code it is not necesary in this file now
//because it is in the html file

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

//Action creators

function addTodoAction(todo){
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction(id){
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction(id){
  return {
    type: TOGGLE_TODO,
    id,
  }
}

function addGoalAction(goal){
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoalAction(id){
  return {
    type: REMOVE_GOAL,
    id,
  }
}

//Functions
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


store.dispatch(addTodoAction({
    id: 0,
    name: 'Learn Redux',
    complete: false
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Learn Javascript',
  complete: false
}))

store.dispatch(removeTodoAction(0))
store.dispatch(toggleTodoAction(1))


store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn More',
}))
