import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { fetchAllSubjects, updateTraining } from "../../store/slices/trainingReducer";
import LoadingModal from "../../components/modal/LoadingModal";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import { TrainingSubject } from "../../types/trainingTypes";

interface Props {
  subject: TrainingSubject;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EditTrainingForm = ({ subject, isOpen, onClose, onSuccess }: Props) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.training);

  const [formData, setFormData] = useState<Partial<TrainingSubject>>(subject);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateTraining({ id: subject.id, data: formData })).unwrap();
      dispatch(fetchAllSubjects());
      showSuccessMessage("Cập nhật học phần thành công");
      onSuccess();
      onClose();
    } catch {
      showErrorMessage("Lỗi khi cập nhật học phần");
    }
  };

  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Chỉnh sửa học phần</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="code" value="Mã học phần" />
            <TextInput
              name="code"
              value={formData.code || ""}
              onChange={handleChange}
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="name" value="Tên học phần" />
            <TextInput
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="credits" value="Số tín chỉ" />
            <TextInput
              name="credits"
              type="number"
              value={formData.credits || 0}
              onChange={handleChange}
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <Label htmlFor="semester" value="Học kỳ" />
            <Select
              name="semester"
              value={formData.semester?.toString() || "1"}
              onChange={handleChange}
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            >
              {[...Array(9)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Học kỳ {i + 1}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="department" value="Khoa" />
            <TextInput
              name="department"
              value={formData.department || ""}
              onChange={handleChange}
              className="bg-white text-black dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_optional"
              checked={formData.is_optional || false}
              onChange={handleChange}
            />
            <Label htmlFor="is_optional" value="Tự chọn" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button color="gray" onClick={onClose} type="button">
              Hủy
            </Button>
            <Button type="submit" color="blue">
              Lưu
            </Button>
          </div>
        </form>
        <LoadingModal isOpen={loading} />
      </Modal.Body>
    </Modal>
  );
};

export default EditTrainingForm;
