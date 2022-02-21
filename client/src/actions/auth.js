import { AUTH } from "../constants/actionsTypes";
import * as api from "../api";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    //log in the user
    const { data } = await api.sign_In(formData);

    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    //log in the user
    const { data } = await api.sign_Up(formData);

    dispatch({ type: AUTH, data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
