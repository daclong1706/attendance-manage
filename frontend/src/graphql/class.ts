import { gql } from "@apollo/client";

export const CLASS_OPERATIONS = gql`
  # Lấy tất cả lớp học
  query GetClassSections {
    classSections {
      id
      subject {
        name
        code
      }
      teacher {
        name
        email
      }
      room
      day_of_week
      start_time
      end_time
      start_date
      end_date
      semester
      year
    }
  }

  # Tạo lớp học mới
  mutation CreateClass(
    $subject_id: Int!
    $teacher_id: Int!
    $room: String!
    $day_of_week: String!
    $start_time: String!
    $end_time: String!
    $start_date: String!
    $end_date: String!
    $semester: Int!
    $year: Int!
  ) {
    createClass(
      subject_id: $subject_id
      teacher_id: $teacher_id
      room: $room
      day_of_week: $day_of_week
      start_time: $start_time
      end_time: $end_time
      start_date: $start_date
      end_date: $end_date
      semester: $semester
      year: $year
    ) {
      class_section {
        id
        subject {
          name
        }
        teacher {
          name
          email
        }
        room
        day_of_week
        start_time
        end_time
        semester
      }
    }
  }

  # Xóa lớp học
  mutation DeleteClass($id: Int!) {
    deleteClass(id: $id) {
      success
    }
  }
`;
