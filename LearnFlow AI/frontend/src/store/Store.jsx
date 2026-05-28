import { legacy_createStore as createStore, combineReducers } from 'redux';
const initialState = {
  user: null,
  lessons: [],
  currentLesson: {},
};

function lessonReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  lesson: lessonReducer,
});

const store = createStore(rootReducer);

export default store;
