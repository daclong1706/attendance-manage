import { gql } from "@apollo/client";

export const STUDENT_OPERATIONS = gql`
  # Lấy lịch học của sinh viên
  query GetStudentSchedule {
    studentSchedule {
      subject
      class_time
      room
      day_of_week
      semester
      year
      start_date
      end_date
      teacher_name
      teacher_email
    }
  }

  # Cập nhật thông tin sinh viên
  mutation UpdateStudent($name: String, $email: String, $password: String) {
    updateStudent(name: $name, email: $email, password: $password) {
      student {
        id
        name
        email
      }
    }
  }

  # Điểm danh bằng QR Code
  mutation MarkAttendance($qr_code: String!) {
    markAttendance(qr_code: $qr_code) {
      message
    }
  }
`;
