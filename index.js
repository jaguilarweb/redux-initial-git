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
/* Currently, this factory function:
- takes in no arguments
- sets up a local (private) variable to hold the state
- sets up a getState() function
- returns an object that publicly exposes the getState() function */




