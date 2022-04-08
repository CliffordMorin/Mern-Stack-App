import { AUTH } from "../constants/actionsTypes";
import * as api from "../api";
import { toast } from "react-toastify";

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    //log in the user
    const { data } = await api.sign_In(formData);

    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error("Invalid email or password");
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
    toast.error("User already exists, sign in instead");
  }
};
