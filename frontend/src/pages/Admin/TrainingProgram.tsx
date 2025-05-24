// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../store/hook";
// import { fetchAllSubjects } from "../../store/slices/trainingReducer";
import { useQuery } from "@apollo/client";
import { TrainingSubject } from "../../types/trainingTypes";
import { GET_TRAINING_PROGRAMS } from "../../graphql/training";
import LoadingModal from "../../components/modal/LoadingModal";

const TrainingProgram = () => {
  // const dispatch = useAppDispatch();
  // const { subjects, loading } = useAppSelector((state) => state.training);
  const { loading, data } = useQuery(GET_TRAINING_PROGRAMS);
  // useEffect(() => {
  //   dispatch(fetchAllSubjects());
  // }, [dispatch]);
  // console.log(subjects);

  // Gom nhóm theo năm học (note)
  const groupedByNote: { [note: string]: TrainingSubject[] } = {};
  data?.trainingPrograms.forEach((subject) => {
    // console.log(subject);
    const note = subject?.note || "Khác";
    if (!groupedByNote[note]) groupedByNote[note] = [];
    groupedByNote[note].push(subject);
  });

  return (
    <>
      <div className="mx-auto max-w-6xl p-4">
        {Object.entries(groupedByNote).map(([note, list]) => {
          // Tiếp tục nhóm theo học kỳ
          const groupedBySemester: { [semester: number]: TrainingSubject[] } =
            {};
          list.forEach((s) => {
            if (!groupedBySemester[s.semester])
              groupedBySemester[s.semester] = [];
            groupedBySemester[s.semester].push(s);
          });

          return (
            <div key={note} className="mb-10">
              {/* <h2 className="text-lg font-semibold text-blue-700 mb-4">Năm học: {note}</h2> */}

              {Object.entries(groupedBySemester).map(
                ([semester, subjectsInSemester]) => (
                  <div key={semester} className="mb-6">
                    <h3 className="text-md mb-2 font-semibold text-gray-700">
                      Học kỳ {semester}
                    </h3>
                    <table className="w-full overflow-hidden rounded border bg-white text-left text-sm dark:bg-gray-800 dark:text-white">
                      <thead className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        <tr>
                          <th className="px-3 py-2">Mã HP</th>
                          <th className="px-3 py-2">Tên học phần</th>
                          <th className="px-3 py-2">Số TC</th>
                          <th className="px-3 py-2">Lý thuyết</th>
                          <th className="px-3 py-2">Thực hành</th>
                          <th className="px-3 py-2">Loại</th>
                          <th className="px-3 py-2">Khoa</th>
                          {/* <th className="px-3 py-2">Xem điểm danh</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {subjectsInSemester.map((subject) => (
                          <tr
                            key={subject.id}
                            className="border-t hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <td className="px-3 py-2">{subject.code}</td>
                            <td className="px-3 py-2">{subject.name}</td>
                            <td className="px-3 py-2">{subject.credits}</td>
                            <td className="px-3 py-2">{subject.theoryHours}</td>
                            <td className="px-3 py-2">
                              {subject.practiceHours}
                            </td>
                            <td className="px-3 py-2">
                              {subject.isOptional ? "Tự chọn" : "Bắt buộc"}
                            </td>
                            <td className="px-3 py-2">{subject.department}</td>
                            {/* <td className="px-3 py-2">
                          <a
                            href={`/attendance/${subject.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            Xem điểm danh
                          </a>
                        </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ),
              )}
            </div>
          );
        })}
      </div>
      <LoadingModal isOpen={loading} />
    </>
  );
};

export default TrainingProgram;
