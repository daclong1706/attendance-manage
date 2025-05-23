import axiosClient from "./axiosClient";

class RecognitionAPI {
  async sendFaceRecognitionData(imageBlob: Blob, data: object) {
    try {
      if (!imageBlob) throw new Error("Ảnh không được cung cấp!");
      if (!data) throw new Error("Dữ liệu JSON không được cung cấp!");

      // Tạo FormData để gửi file ảnh + dữ liệu JSON
      const formData = new FormData();
      formData.append("image", imageBlob);
      formData.append("data", JSON.stringify(data));

      // Gửi request bằng AxiosClient
      const response = await axiosClient.post(
        "/recognition/attendance/face_recognition",
        formData,
      );

      console.log("Recognition Result:", response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async registerUser(imageBlobs: Blob[], userId: string) {
    try {
      if (imageBlobs.length < 5) throw new Error("Cần gửi đủ 5 ảnh!");
      if (!userId) throw new Error("User ID không được cung cấp!");

      const formData = new FormData();
      imageBlobs.forEach((blob, index) => {
        formData.append("images", blob, `image${index + 1}.jpg`);
      });
      formData.append("data", JSON.stringify({ user_id: userId }));

      // Gửi tất cả ảnh trong một request
      const response = await axiosClient.post(
        "/recognition/register-user",
        formData,
      );

      console.log("Register Result:", response);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    }
  }
}

const recognitionAPI = new RecognitionAPI();
export default recognitionAPI;
