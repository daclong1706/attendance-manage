import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TrainingSubject } from "../../types/trainingTypes";

// Tạo học phần
export const createTraining = createAsyncThunk(
  "training/create",
  async (payload: Partial<TrainingSubject>) => {
    const res = await axios.post("http://localhost:5000/training/create", payload);
    return res.data;
  }
);

// Cập nhật học phần
export const updateTraining = createAsyncThunk(
    "training/update",
    async ({ id, data }: { id: number; data: Partial<TrainingSubject> }) => {
      const res = await axios.put(`http://localhost:5000/training/update/${id}`, data);
      return res.data;
    }
  );

// Lấy tất cả học phần
export const fetchAllSubjects = createAsyncThunk(
  "training/fetchAll",
  async () => {
    const res = await axios.get("http://localhost:5000/training/all");
    return res.data.data;
  }
);

const trainingSlice = createSlice({
  name: "training",
  initialState: {
    subjects: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTraining.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTraining.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTraining.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllSubjects.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default trainingSlice.reducer;
