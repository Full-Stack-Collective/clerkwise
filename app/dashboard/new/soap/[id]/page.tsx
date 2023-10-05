import BackButton from '@/components/BackButton';
import NewSoapAssessment from '@/components/NewSoapAssessment';
import PatientStoreInitialiser from '@/components/PatientStoreInitializer';
import { usePatientStore } from '@/stores/currentPatientStore';

export default async function SoapAssessment({ params }: { params: { id: string } }) {

  const { patientId, patientFirstName, patientLastName, providerId } =
    usePatientStore.getState();

    console.log('>>Last Name', patientLastName)
    console.log('>>>>', patientId)
    console.log('>>>>', providerId)

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
