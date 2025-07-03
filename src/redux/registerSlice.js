// redux/registerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    fullName: "",
    email: "",
    userId: "",
  },
  companyData: {
    companyName: "",
    feinOrSsn: "",
    companyWebsite: "",
    yearInBusiness: "",
    numberOfEmployees: "",
    state: "",
    targetContractSize: ""
  },
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    saveRegisterData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },

    saveCompanyData: (state, action) => {
      state.companyData = { ...state.companyData, ...action.payload };
    },

    clearRegisterData: (state) => {
      state.userData = initialState.userData;
      state.companyData = initialState.companyData;
    },
  },
});

export const {
  saveRegisterData,
  saveCompanyData,
  clearRegisterData,
} = registerSlice.actions;

export default registerSlice.reducer;
