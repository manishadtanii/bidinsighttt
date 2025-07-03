import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import onboardingReducer from "./onboardingSlice"; // 👈 import karo

const store = configureStore({
  reducer: {
    register: registerReducer,
    onboarding: onboardingReducer, // 👈 add this line
  },
});

export default store;
