export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "Clinical Records": {
        Row: {
          allergies: string | null
          blood_pressure: string | null
          created_at: string | null
          diagnosis: string | null
          differential_diagnosis: string | null
          drug_history: string | null
          exam_date: string | null
          family_history: string | null
          focused_findings: string | null
          heart_rate: number | null
          history_presenting_complaint: string | null
          id: string
          observations: string | null
          on_examination: string | null
          oxygen_saturation: number | null
          past_medical_history: string | null
          patient: string | null
          plan: string | null
          presenting_complaint: string
          provider: string | null
          random_blood_sugar: number | null
          respiratory_rate: number | null
          social_history: string | null
          systems_review: string | null
          temperature: number | null
          updated_at: string | null
          urine: string | null
        }
        Insert: {
          allergies?: string | null
          blood_pressure?: string | null
          created_at?: string | null
          diagnosis?: string | null
          differential_diagnosis?: string | null
          drug_history?: string | null
          exam_date?: string | null
          family_history?: string | null
          focused_findings?: string | null
          heart_rate?: number | null
          history_presenting_complaint?: string | null
          id?: string
          observations?: string | null
          on_examination?: string | null
          oxygen_saturation?: number | null
          past_medical_history?: string | null
          patient?: string | null
          plan?: string | null
          presenting_complaint: string
          provider?: string | null
          random_blood_sugar?: number | null
          respiratory_rate?: number | null
          social_history?: string | null
          systems_review?: string | null
          temperature?: number | null
          updated_at?: string | null
          urine?: string | null
        }
        Update: {
          allergies?: string | null
          blood_pressure?: string | null
          created_at?: string | null
          diagnosis?: string | null
          differential_diagnosis?: string | null
          drug_history?: string | null
          exam_date?: string | null
          family_history?: string | null
          focused_findings?: string | null
          heart_rate?: number | null
          history_presenting_complaint?: string | null
          id?: string
          observations?: string | null
          on_examination?: string | null
          oxygen_saturation?: number | null
          past_medical_history?: string | null
          patient?: string | null
          plan?: string | null
          presenting_complaint?: string
          provider?: string | null
          random_blood_sugar?: number | null
          respiratory_rate?: number | null
          social_history?: string | null
          systems_review?: string | null
          temperature?: number | null
          updated_at?: string | null
          urine?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Clinical Records_patient_fkey"
            columns: ["patient"]
            referencedRelation: "Patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Clinical Records_provider_fkey"
            columns: ["provider"]
            referencedRelation: "Providers"
            referencedColumns: ["id"]
          }
        ]
      }
      Patients: {
        Row: {
          city: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact: string | null
          emergency_contact_name: string | null
          first_name: string
          id: string
          phone: string | null
          practice: string | null
          primary_provider: string | null
          sex: Database["public"]["Enums"]["sex_type"] | null
          street_address: string | null
          surname: string
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_contact_name?: string | null
          first_name: string
          id?: string
          phone?: string | null
          practice?: string | null
          primary_provider?: string | null
          sex?: Database["public"]["Enums"]["sex_type"] | null
          street_address?: string | null
          surname: string
        }
        Update: {
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_contact_name?: string | null
          first_name?: string
          id?: string
          phone?: string | null
          practice?: string | null
          primary_provider?: string | null
          sex?: Database["public"]["Enums"]["sex_type"] | null
          street_address?: string | null
          surname?: string
        }
        Relationships: [
          {
            foreignKeyName: "Patients_practice_fkey"
            columns: ["practice"]
            referencedRelation: "Practice"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Patients_primary_provider_fkey"
            columns: ["primary_provider"]
            referencedRelation: "Providers"
            referencedColumns: ["id"]
          }
        ]
      }
      Practice: {
        Row: {
          created_at: string | null
          id: string
          location: string | null
          owner: string | null
          patients: string | null
          practice_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          location?: string | null
          owner?: string | null
          patients?: string | null
          practice_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          location?: string | null
          owner?: string | null
          patients?: string | null
          practice_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Practice_owner_fkey"
            columns: ["owner"]
            referencedRelation: "Providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Practice_patients_fkey"
            columns: ["patients"]
            referencedRelation: "Patients"
            referencedColumns: ["id"]
          }
        ]
      }
      Providers: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          practice: string | null
          specialty: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          practice?: string | null
          specialty?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          practice?: string | null
          specialty?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Providers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Providers_practice_fkey"
            columns: ["practice"]
            referencedRelation: "Practice"
            referencedColumns: ["id"]
          }
        ]
      }
      "Soap Assessments": {
        Row: {
          assessment: string | null
          blood_pressure: string | null
          created_at: string | null
          exam_date: string | null
          heart_rate: number | null
          id: string
          objective_findings: string | null
          patient: string | null
          plan: string | null
          provider: string | null
          respiratory_rate: number | null
          spo2: number | null
          subjective_findings: string | null
          temperature: number | null
          updated_at: string | null
        }
        Insert: {
          assessment?: string | null
          blood_pressure?: string | null
          created_at?: string | null
          exam_date?: string | null
          heart_rate?: number | null
          id: string
          objective_findings?: string | null
          patient?: string | null
          plan?: string | null
          provider?: string | null
          respiratory_rate?: number | null
          spo2?: number | null
          subjective_findings?: string | null
          temperature?: number | null
          updated_at?: string | null
        }
        Update: {
          assessment?: string | null
          blood_pressure?: string | null
          created_at?: string | null
          exam_date?: string | null
          heart_rate?: number | null
          id?: string
          objective_findings?: string | null
          patient?: string | null
          plan?: string | null
          provider?: string | null
          respiratory_rate?: number | null
          spo2?: number | null
          subjective_findings?: string | null
          temperature?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Soap Assessments_patient_fkey"
            columns: ["patient"]
            referencedRelation: "Patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Soap Assessments_provider_fkey"
            columns: ["provider"]
            referencedRelation: "Providers"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      sex_type: "male" | "female"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
