export interface TrainingSubject {
  id: number;
  code: string;
  name: string;
  credits: number;
  theoryHours: number;
  practiceHours: number;
  semester: number;
  isOptional: boolean;
  prerequisiteCode?: string;
  previousCode?: string;
  equivalentCode?: string;
  department: string;
  note?: string;
}
