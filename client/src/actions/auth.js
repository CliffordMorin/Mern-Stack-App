import { Auth } from "../constants/actionsTypes";
import * as api from "../api";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    //log in the user

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signUp = (formData, history) => async (dispatch) => {
  try {
    //log in the user

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
