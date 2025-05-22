"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useAppDispatch } from "../../store/hook";
import { deleteUser } from "../../store/slices/userReducer";
// import { deleteSubject } from "../../store/slices/subjectReducer";
import { deleteClass } from "../../store/slices/classReducer";
import { useMutation } from "@apollo/client";
import { DELETE_SUBJECT, GET_SUBJECTS } from "../../graphql/subject";
import LoadingModal from "./LoadingModal";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";

interface DeleteModalProps {
  dataType: "User" | "Subject" | "Class"; // Loại dữ liệu cần xóa
  dataName: string;
  dataID: number;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  dataType,
  dataName,
  dataID,
  openModal,
  setOpenModal,
}) => {
  const dispatch = useAppDispatch();

  const [deleteSubject, { loading }] = useMutation(DELETE_SUBJECT, {
    refetchQueries: [{ query: GET_SUBJECTS }], // Tự động cập nhật danh sách
  });

  const handleDelete = async () => {
    if (!dataID) {
      alert("Vui lòng chọn dữ liệu để xóa!");
      return;
    }

    try {
      switch (dataType) {
        case "User":
          await dispatch(deleteUser(dataID)).unwrap();
          break;
        case "Subject":
          await deleteSubject({ variables: { id: dataID } });
          break;
        case "Class":
          await dispatch(deleteClass(dataID)).unwrap();
          break;
        default:
          alert("Loại dữ liệu không hợp lệ!");
          return;
      }

      showSuccessMessage("Xóa thành công");
    } catch {
      showErrorMessage("Lỗi khi xóa");
    }

    setOpenModal(false);
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc chắn muốn xóa {dataName} ({dataType}) không?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDelete}>
                Xóa
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Hủy
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <LoadingModal isOpen={loading} />
    </>
  );
};

export default DeleteModal;
