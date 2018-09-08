import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  ADD_EDUCATION,
  ADD_EXPERIENCE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case ADD_EDUCATION:
      newState = { ...state };
      newState.profile.education = action.payload.education;
      return newState;
    case ADD_EXPERIENCE:
      newState = { ...state };
      newState.profile.experience = action.payload.experience;
      return newState;

    default:
      return state;
  }
}
