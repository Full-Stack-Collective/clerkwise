import BackButton from '@/components/BackButton';
import NewSoapAssessment from '@/components/NewSoapAssessment';
import PatientStoreInitialiser from '@/components/PatientStoreInitializer';
import { usePatientStore } from '@/stores/currentPatientStore';

export default function SoapAssessment() {
  const { patientId, patientFirstName, patientLastName, providerId } =
    usePatientStore.getState();

  return (
    <div>
      <PatientStoreInitialiser
        patientFirstName={patientFirstName}
        patientId={patientId}
        patientLastName={patientLastName}
        providerId={providerId}
      />
      <BackButton />
      <NewSoapAssessment />
    </div>
  );
}
