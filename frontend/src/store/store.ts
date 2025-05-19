import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authReducer";
import userReducer from "./slices/userReducer";
import classReducer from "./slices/classReducer";
import subjectReducer from "./slices/subjectReducer";
import teacherReducer from "./slices/teacherReducer";
import studentReducer from "./slices/studentReducer";
import trainingReducer from "./slices/trainingReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    class: classReducer,
    subject: subjectReducer,
    teacher: teacherReducer,
    student: studentReducer,
    training: trainingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
