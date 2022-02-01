// Vanilla Javascript

//Library Code
function createStore () {
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
    state = todos(state, action)
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

//Separamos el código en lo que será
//El código de la libreria que implementemos y
//El código de nuestra aplicación.

//Ahora tenemos que considerar con esta lógica lo siguiente:
//En nuestra implementación tenemos que La libreria tiene 
//acceso a la función todo. Pero cuando implementemos
//una libreria de terceros no será así, (salvo que como en este caso)
//todo el còdigo estuviera en un mismo archivo) por lo que debemos 
//crear algo como lo siguiente

const store = createStore(todos)

//Le agregamos reducer al create store de la libreria, por tanto,
//en el proximo commit incluiremos los cambios necesarios.
