import type { Database as DB } from '@/lib/database.types';

declare global {
  type Database = DB;
  type ClinicalRecord =
    Database['public']['Tables']['Clinical Records']['Insert'];

  type Patient = Database['public']['Tables']['Patients']['Insert'];

  type Provider = Database['public']['Tables']['Providers']['Insert'];

  type Practice = Database['public']['Tables']['Practice']['Insert'];
  type SOAP = Database['public']['Tables']['Soap Assessments']['Insert'];

  type ProviderInfo = {
    providerId: string;
    practiceId: string;
    providerFirstName: string;
    providerLastName: string;
  };

  type CurrentPatient ={
    patientId: string;
    patientFirstName?: string;
    patientLastName?: string
  }
}
