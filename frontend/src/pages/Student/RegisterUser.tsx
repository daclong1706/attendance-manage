import { MdClose } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import recognitionAPI from "../../api/recognitionAPI";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import LoadingModal from "../../components/modal/LoadingModal";
import { Button } from "flowbite-react";
import { useAppSelector } from "../../store/hook";

interface Props {
  onClose: () => void;
}

const RegisterUser = ({ onClose }: Props) => {
  const [imageBlobs, setImageBlobs] = useState<Blob[]>([]); // Lưu danh sách ảnh
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Lưu danh sách ảnh preview
  const [loading, setLoading] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        showErrorMessage("Không thể truy cập Camera");
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        window.location.reload();
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          setImageBlobs((prev) => [...prev, blob]); // Thêm ảnh vào danh sách
          setImagePreviews((prev) => [...prev, URL.createObjectURL(blob)]);
        }
      }, "image/jpeg");
    }
  };

  const handleSubmit = async () => {
    if (imageBlobs.length < 5) {
      showErrorMessage("Hãy chụp đủ 5 ảnh trước khi đăng ký!");
      return;
    }

    setLoading(true);
    try {
      await recognitionAPI.registerUser(imageBlobs, user?.mssv || "");
      showSuccessMessage("Đăng ký khuôn mặt thành công!");
    } catch {
      showErrorMessage("Nhận diện không thành công");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:text-black">
      <div className="relative m-4 h-fit rounded-lg bg-white p-6 shadow-lg md:m-12 dark:bg-gray-800 dark:text-white">
        <button
          className="absolute top-2 right-2 rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={onClose}
        >
          <MdClose className="h-6 w-6" />
        </button>

        <div className="flex items-center justify-center">
          <h2 className="text-lg font-bold">Đăng ký khuôn mặt</h2>
        </div>

        <div className="mt-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-[750px] rounded-xl"
          />
          <div className="mt-2 flex gap-2">
            <Button onClick={handleCapture} disabled={imageBlobs.length >= 5}>
              Chụp ảnh ({imageBlobs.length}/5)
            </Button>
            <Button onClick={handleSubmit} disabled={imageBlobs.length < 5}>
              Xác nhận
            </Button>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Ảnh ${index + 1}`}
                className="h-20 w-20 rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      </div>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default RegisterUser;
