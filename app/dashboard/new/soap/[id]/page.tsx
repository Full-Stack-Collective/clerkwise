import BackButton from '@/components/BackButton';
import SoapAssessmentForm from '@/components/SoapAssessmentForm';
import PatientStoreInitialiser from '@/components/PatientStoreInitializer';
import { usePatientStore } from '@/stores/currentPatientStore';
import { createSoapAssessment } from './actions';


export default async function SoapAssessment({
  params,
}: {
  params: { id: string };
}) {
  const { patientId, patientFirstName, patientLastName, providerId } =
    usePatientStore.getState();

  console.log('>>Last Name', patientLastName);
  console.log('>>>>', patientId);
  console.log('>>>>', providerId);

  return (
    <div>
      <PatientStoreInitialiser
        patientFirstName={patientFirstName}
        patientId={patientId}
        patientLastName={patientLastName}
        providerId={providerId}
      />
      <BackButton />
      <SoapAssessmentForm handleSoapSubmit={createSoapAssessment} />
    </div>
  );
}
