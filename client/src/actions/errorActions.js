import { GET_ERRORS } from "./types";

export const getErrors = error => {
  return {
    type: GET_ERRORS,
    payload: error.response.data
  };
};
