export interface TrainingSubject {
    id: number;
    code: string;
    name: string;
    credits: number;
    theory_hours: number;
    practice_hours: number;
    semester: number;
    is_optional: boolean;
    prerequisite_code?: string;
    previous_code?: string;
    equivalent_code?: string;
    department: string;
    note?: string;
  }
  