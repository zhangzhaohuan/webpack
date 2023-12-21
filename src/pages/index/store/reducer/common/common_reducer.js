
export const initState = {
  isCommon: false,
};

export const commonReducer = (state = initState, action) => {
  switch (action.type) {
    case 'common_istrue':
      const { data } = action
      return { ...state, ...data };
    default:
      return state;
  }
};
