import { gql } from "@apollo/client";

export const GET_TRAINING_PROGRAMS = gql`
  query GetTrainingPrograms {
    trainingPrograms {
      id
      code
      name
      credits
      theoryHours
      practiceHours
      prerequisiteCode
      previousCode
      equivalentCode
      department
      semester
      isOptional
      note
    }
  }
`;

export const CREATE_TRAINING_PROGRAM = gql`
  mutation CreateTrainingProgram(
    $code: String!
    $name: String!
    $credits: Int!
  ) {
    createTrainingProgram(code: $code, name: $name, credits: $credits) {
      trainingProgram {
        id
        code
        name
        credits
      }
    }
  }
`;

export const UPDATE_TRAINING_PROGRAM = gql`
  mutation UpdateTrainingProgram(
    $id: Int!
    $code: String
    $name: String
    $credits: Int
  ) {
    updateTrainingProgram(
      id: $id
      code: $code
      name: $name
      credits: $credits
    ) {
      trainingProgram {
        id
        code
        name
        credits
      }
    }
  }
`;

export const DELETE_TRAINING_PROGRAM = gql`
  mutation DeleteTrainingProgram($id: Int!) {
    deleteTrainingProgram(id: $id) {
      success
    }
  }
`;
