'use client';
import React, {useState, useEffect} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Dialog, DialogContent} from './ui/dialog';
import {capitalizeWord} from '@/utils/textFormatters';
import {calculateAge} from '@/utils/calculators';
import {format, parseISO} from 'date-fns';
import EditPatientData from './EditPatientData';
import {useProviderStore} from '@/stores/currentProviderStore';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {useRouter} from 'next/navigation';
import FormsOptionsMenu from './FormsOptionsMenu';

export function PatientDetails({patientData}: any) {
  const [
    {
      id,
      first_name,
      surname,
      sex,
      date_of_birth,
      email,
      phone,
      street_address,
      city,
      emergency_contact_name,
      emergency_contact,
    },
  ] = patientData;

  const [isEditing, setIsEditing] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleDialogClose = () => {
    setIsEditing(false);
  };
  useEffect(() => {
    const channel = supabase
      .channel('patient data')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Patients',
        },
        (payload) => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <Card className="max-w-xs w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-4 py-2">
          {first_name} {surname}
          <FormsOptionsMenu
            isEditable={isEditing}
            setIsEditable={setIsEditing}
          />
        </CardTitle>
        <CardDescription>{capitalizeWord(sex)}</CardDescription>
        <CardDescription>
          {format(parseISO(date_of_birth), 'PPP')}{' '}
          {`(${calculateAge(date_of_birth)} years)`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="my-2">
          <span className="font-semibold">Phone Number: </span>
          {phone}
        </p>
        {street_address || city ? (
          <p className="my-2">
            <span className="font-semibold">Address: </span>
            {street_address && `${street_address},`} {city && city}
          </p>
        ) : null}
        <p className="my-2">
          <span className="font-semibold">Email: </span>
          {email}
        </p>
        {emergency_contact ? (
          <p className="my-2">
            <span className="font-semibold">Emergency Contact: </span>
            {emergency_contact_name} - {emergency_contact}
          </p>
        ) : null}
      </CardContent>

      {isEditing && (
        <Dialog open={isEditing} onOpenChange={handleDialogClose}>
          <DialogContent>
            <EditPatientData
              patientId={id}
              patientData={patientData![0]}
              onClose={handleDialogClose}
              setIsEditing={setIsEditing}
              patientFirstName={first_name}
              patientLastName={surname}
              providerId={useProviderStore.getState().providerId}
              practiceId={useProviderStore.getState().practiceId}
            />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
