import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  ADD_EDUCATION,
  ADD_EXPERIENCE
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { getErrors } from "./errorActions";
import { setCurrentUser, logoutUser } from "./authActions";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile({})));
};

export const getProfile = profile => {
  return {
    type: GET_PROFILE,
    payload: profile
  };
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch(getErrors(err)));
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone!")) {
    axios
      .delete("/api/profile")
      .then(res => dispatch(logoutUser()))
      .catch(err => dispatch(getErrors(err)));
  }
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => {
      dispatch(afteraddExperience(res));
      history.push("/dashboard");
    })
    .catch(err => dispatch(getErrors(err)));
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => {
      dispatch(afteraddEducation(res));
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(err, "err");
      dispatch(getErrors(err));
    });
};
export const afteraddEducation = eduData => {
  return {
    type: ADD_EDUCATION,
    payload: { education: eduData.data.education }
  };
};
export const afteraddExperience = expData => {
  return {
    type: ADD_EXPERIENCE,
    payload: { experience: expData.data.experience }
  };
};

export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getErrors(err)));
};

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getErrors(err)));
};

//Get all profile
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile({})));
};
