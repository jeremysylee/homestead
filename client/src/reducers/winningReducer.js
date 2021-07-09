const initialState = { winning: 'nobid' };

const winningReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WINNING':
      return { winning: action.winning };
    default:
      return state;
  }
};

export default winningReducer;
