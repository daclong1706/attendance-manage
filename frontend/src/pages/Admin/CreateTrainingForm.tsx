import { Button, TextInput, Label, Select } from "flowbite-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { createTraining, fetchAllSubjects } from "../../store/slices/trainingReducer";
import LoadingModal from "../../components/modal/LoadingModal";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTrainingForm = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.training);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: 0,
    semester: 1,
    is_optional: false,
    department: ""
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createTraining(formData)).unwrap();
      dispatch(fetchAllSubjects());
      showSuccessMessage("Thêm học phần thành công");
      onClose();
    } catch (err) {
      showErrorMessage("Đã xảy ra lỗi khi thêm học phần");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        {/* <h2 className="dark:text-black">Thêm học phần</h2> */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <span className="dark:text-black">Mã học phần</span>
            <Label htmlFor="code" value="Mã học phần" />
            <TextInput id="code" name="code" required onChange={handleChange} />
          </div>
          <div>
            <span className="dark:text-black">Tên học phần</span>
            <Label htmlFor="name" value="Tên học phần" />
            <TextInput id="name" name="name" required onChange={handleChange} />
          </div>
          <div>
            <span className="dark:text-black">Số tín chỉ</span>
            <Label htmlFor="credits" value="Số tín chỉ" />
            <TextInput id="credits" name="credits" type="number" min={0} onChange={handleChange} />
          </div>
          <div>
          <span className="dark:text-black">Học kỳ</span>
            <Label htmlFor="semester" value="Học kỳ" />
            <Select id="semester" name="semester" value={formData.semester} onChange={handleChange}>
              {[...Array(9)].map((_, i) => (
                <option key={i + 1} value={i + 1}>Học kỳ {i + 1}</option>
              ))}
            </Select>
          </div>
          <div>
          <span className="dark:text-black">Khoa</span>
            <Label htmlFor="department" value="Khoa" />
            <TextInput id="department" name="department" onChange={handleChange} />
          </div>
          <span className="dark:text-black">HP Tự chọn</span>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="is_optional" onChange={handleChange} />
            <Label htmlFor="is_optional" value="Tự chọn" />
          </div>
          <div className="flex justify-end gap-2">
            <Button color="gray" onClick={onClose} type="button">Hủy</Button>
            <Button color="blue" type="submit">Thêm</Button>
          </div>
        </form>
        <LoadingModal isOpen={loading} />
      </div>
    </div>
  );
};

export default CreateTrainingForm;
