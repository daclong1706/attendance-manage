import { gql } from "@apollo/client";

export const GET_SUBJECTS = gql`
  query GetSubjects {
    subjects {
      id
      name
      code
    }
  }
`;

export const CREATE_SUBJECT = gql`
  mutation CreateSubject($name: String!, $code: String!) {
    createSubject(name: $name, code: $code) {
      subject {
        id
        name
        code
      }
    }
  }
`;

export const UPDATE_SUBJECT = gql`
  mutation UpdateSubject($id: Int!, $name: String, $code: String) {
    updateSubject(id: $id, name: $name, code: $code) {
      subject {
        id
        name
        code
      }
    }
  }
`;

export const DELETE_SUBJECT = gql`
  mutation DeleteSubject($id: Int!) {
    deleteSubject(id: $id) {
      success
    }
  }
`;
