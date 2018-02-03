
function userTechnologies(state = [], action) {
  console.log(state, action);
  switch (action.type) {
    case 'ADD_TECHNOLOGY': {
      return [...state, {language: action.technologyToAdd, weight: "0"}];
    }
    case 'REMOVE_TECHNOLOGY': {
      return [
        ...state.slice(0,action.index),
        ...state.slice(action.index + 1),
      ];
    }
    case 'CHANGE_USER_TECHNOLOGY_WEIGHT': {
      let weight;
      action.weight === '' ? weight = 0 : weight = action.weight;
      return [
        ...state.slice(0,action.index),
        {language:state[action.index].language, weight: weight},
        ...state.slice(action.index + 1),
      ];
    }
    default:
      return state;
  }
}

export default userTechnologies;