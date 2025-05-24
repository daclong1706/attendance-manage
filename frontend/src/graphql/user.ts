import { gql } from "@apollo/client";

export const USER_OPERATIONS = gql`
  # Lấy tất cả người dùng
  query GetUsers {
    allUsers {
      id
      name
      email
      mssv
      role
      department
      createdAt
    }
  }

  # Lấy tất cả sinh viên
  query GetStudents {
    allStudents {
      id
      name
      email
      mssv
      createdAt
    }
  }

  # Lấy tất cả giảng viên
  query GetTeachers {
    allTeachers {
      id
      name
      email
      mssv
      createdAt
    }
  }

  # Lấy thông tin một người dùng
  query GetUserInfo($id: Int!) {
    userInfo(id: $id) {
      id
      name
      email
      mssv
      role
      department
      createdAt
    }
  }

  # Tạo người dùng
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $role: String!
    $department: String!
    $mssv: String
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      role: $role
      department: $department
      mssv: $mssv
    ) {
      user {
        id
        name
        email
        role
        department
        createdAt
      }
    }
  }

  # Cập nhật người dùng
  mutation UpdateUser(
    $id: Int!
    $name: String
    $email: String
    $password: String
    $role: String
    $mssv: String
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      password: $password
      role: $role
      mssv: $mssv
    ) {
      user {
        id
        name
        email
        role
        mssv
        createdAt
      }
    }
  }

  # Xóa người dùng
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      success
    }
  }
`;
