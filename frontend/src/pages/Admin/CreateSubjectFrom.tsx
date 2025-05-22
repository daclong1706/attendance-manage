import { Button, FloatingLabel } from "flowbite-react";
import { FormEvent, useState } from "react";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import LoadingModal from "../../components/modal/LoadingModal";
// import { useAppDispatch, useAppSelector } from "../../store/hook";
// import {
//   createSubject,
//   fetchAllSubjects,
// } from "../../store/slices/subjectReducer";
import { useMutation } from "@apollo/client";
import { CREATE_SUBJECT, GET_SUBJECTS } from "../../graphql/subject";

interface CreateSubjectFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSubjectForm: React.FC<CreateSubjectFormProps> = ({
  isOpen,
  onClose,
}) => {
  // const dispatch = useAppDispatch();
  // const { loading } = useAppSelector((state) => state.subject);
  const [subjectData, setSubjectData] = useState({
    code: "",
    name: "",
  });

  const [createSubject, { loading }] = useMutation(CREATE_SUBJECT, {
    refetchQueries: [{ query: GET_SUBJECTS }],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createSubject({ variables: subjectData });
      showSuccessMessage("Thêm học phần thành công");
    } catch {
      showErrorMessage("Lỗi khi thêm học phần");
    }
    onClose();
  };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await dispatch(createSubject(subjectData)).unwrap();
  //     dispatch(fetchAllSubjects());
  //     showSuccessMessage("Thêm học phần thành công");
  //   } catch {
  //     showErrorMessage("Lỗi khi thêm học phần");
  //   }
  //   onClose();
  // };

  if (!isOpen) return false;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50`}
    >
      <div className="w-1/2 rounded-lg bg-white p-6 py-12 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Thêm học phần</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingLabel
            variant="outlined"
            label="Mã học phần"
            type="text"
            onChange={(e) =>
              setSubjectData({ ...subjectData, code: e.target.value })
            }
            required
          />
          <FloatingLabel
            variant="outlined"
            label="Tên học phần"
            type="text"
            onChange={(e) =>
              setSubjectData({ ...subjectData, name: e.target.value })
            }
            required
          />

          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" color="red" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" color="green">
              Thêm
            </Button>
          </div>
        </form>
      </div>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default CreateSubjectForm;
