import { useEffect, useState } from "react";
import { fetchAllTeacher } from "../../store/slices/userReducer";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import LoadingModal from "../../components/modal/LoadingModal";
import { showErrorMessage, showSuccessMessage } from "../../helper/toastHelper";
import { Button, FloatingLabel, Select, Datepicker } from "flowbite-react";
import { fetchAllSubjects } from "../../store/slices/subjectReducer";
import { createClass, fetchAllClasses } from "../../store/slices/classReducer";

interface CreateClassFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateClassForm: React.FC<CreateClassFormProps> = ({
  isOpen,
  onClose,
}) => {
  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

  const sixMonthsLater = new Date();
  sixMonthsLater.setMonth(today.getMonth() + 6);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.user);
  const { subjects } = useAppSelector((state) => state.subject);

  const [classData, setClassData] = useState({
    subject_id: 0,
    teacher_id: 0,
    room: "",
    day_of_week: 0,
    start_time: "",
    end_time: "",
    start_date: "",
    end_date: "",
    semester: "",
    year: 2025,
  });
  const [startDate, setStartDate] = useState(null as Date | null);
  const [endDate, setEndDate] = useState(null as Date | null);
  useEffect(() => {
    dispatch(fetchAllSubjects());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllTeacher());
  }, [dispatch]);
  // console.log(loading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) setStartDate(today);
    if (!endDate) setEndDate(threeMonthsLater);
    const newClassData = {
      ...classData,
      start_date: startDate?.toISOString().split("T")[0],
      end_date: endDate?.toISOString().split("T")[0],
    };

    console.log(newClassData);
    try {
      await dispatch(createClass(newClassData)).unwrap();
      dispatch(fetchAllClasses());
      showSuccessMessage("Tạo lớp học thành công");
      onClose();
    } catch {
      showErrorMessage("Lỗi khi tạo lớp học!");
    }
    onClose();
  };

  if (!isOpen) return false;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50`}
    >
      <div className="-mt-50 w-1/2 rounded-lg bg-white p-6 py-12 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Tạo lớp học</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingLabel
            variant="outlined"
            label="Phòng"
            type="text"
            onChange={(e) =>
              setClassData({ ...classData, room: e.target.value })
            }
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <Select
              id="subject_iD"
              required
              value={classData.subject_id || ""}
              onChange={(e) =>
                setClassData({
                  ...classData,
                  subject_id: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Chọn môn học
              </option>
              {subjects.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>

            <Select
              id="teacher_iD"
              required
              value={classData.teacher_id || ""}
              onChange={(e) =>
                setClassData({
                  ...classData,
                  teacher_id: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Chọn giáo viên
              </option>
              {users.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-16 gap-2">
            <Select
              className="col-span-4"
              id="dayOfWeek"
              required
              value={classData.day_of_week}
              onChange={(e) =>
                setClassData({
                  ...classData,
                  day_of_week: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Chọn thứ
              </option>
              <option value={1}>Thứ 2</option>
              <option value={2}>Thứ 3</option>
              <option value={3}>Thứ 4</option>
              <option value={4}>Thứ 5</option>
              <option value={5}>Thứ 6</option>
              <option value={6}>Thứ 7</option>
              <option value={0}>Chủ nhật</option>
            </Select>
            <div className="flex items-center justify-center">-</div>
            <Datepicker
              className="col-span-5"
              title="Ngày bắt đầu"
              minDate={today}
              maxDate={threeMonthsLater}
              value={startDate}
              required
              onChange={(date: Date | null) => setStartDate(date)}
            />
            <div className="flex items-center justify-center">-</div>
            <Datepicker
              className="col-span-5"
              title="Ngày kết thúc"
              minDate={threeMonthsLater}
              maxDate={sixMonthsLater}
              value={endDate}
              required
              onChange={(date: Date | null) => setEndDate(date)}
            />
          </div>

          <Select
            id="timeSlot"
            required
            value={
              classData?.start_time && classData?.end_time
                ? `${classData.start_time}-${classData.end_time}`
                : ""
            }
            onChange={(e) => {
              const [start, end] = e.target.value.split("-");
              if (start && end) {
                setClassData({
                  ...classData,
                  start_time: start,
                  end_time: end,
                });
              }
            }}
          >
            <option value="" disabled>
              Chọn khung giờ
            </option>
            <option value="06:30-09:00">06:30 - 09:00</option>
            <option value="07:20-10:50">07:20 - 10:50</option>
            <option value="09:00-11:30">09:00 - 11:30</option>
            <option value="12:30-15:00">12:30 - 15:00</option>
            <option value="12:30-16:30">12:30 - 16:30</option>
            <option value="15:10-17:40">15:10 - 17:40</option>
          </Select>

          <div className="grid grid-cols-2 gap-2">
            <FloatingLabel
              variant="outlined"
              label="Năm học"
              type="number"
              min={today.getFullYear()}
              max={today.getFullYear() + 1}
              value={classData.year ? classData.year : today.getFullYear()}
              onChange={(e) =>
                setClassData({ ...classData, year: e.target.valueAsNumber })
              }
              required
            />
            <Select
              id="semester"
              required
              value={classData.semester ? classData.semester : ""}
              onChange={(e) =>
                setClassData({ ...classData, semester: e.target.value })
              }
            >
              <option value="" disabled>
                Chọn học kỳ
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="Hè">Hè</option>
            </Select>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" color="red" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" color="green">
              Tạo lớp học
            </Button>
          </div>
        </form>
      </div>
      <LoadingModal isOpen={loading} />
    </div>
  );
};

export default CreateClassForm;
