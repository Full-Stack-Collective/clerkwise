'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMultistepForm } from '@/hooks/useMultiStepForm';
import SoapFields from './SoapFields';
import { Vitals } from './Vitals';
import { usePatientStore } from '@/stores/currentPatientStore';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';

export const soapFormSchema = z.object({
  subjectiveFindings: z.string().min(2, {
    message: 'PC must be at least 2 characters.',
  }),
  objectiveFindings: z.string(),
  assessment: z.string(),
  plan: z.string(),
  bloodPressure: z
    .string()
    .regex(/\d{2,3}\/\d{2,3}/gm, {
      message: 'Please enter BP in format Systolic/Diastolic',
    })
    .optional()
    .or(z.literal('')),
  heartRate: z
    .string()
    .regex(/^(?:[1-9]|[1-9][0-9]|[12][0-9]{2}|300)$/gm, {
      message: 'Enter a number between 1 and 300',
    })
    .optional()
    .or(z.literal('')),
  respiratoryRate: z
    .string()
    .regex(/^(?:[1-9]|[1-9][0-9]|100)$/gm, {
      message: 'Enter a number between 1 and 100',
    })
    .optional()
    .or(z.literal('')),
  oxygenSaturation: z
    .string()
    .regex(/^[1-9][0-9]?$|^100$/gm, { message: 'Enter a number up to 100' })
    .optional()
    .or(z.literal('')),
  temperature: z
    .string()
    .regex(/^\d*\.?\d*$/gm, {
      message: 'Enter a number between 1 and 100',
    })
    .optional()
    .or(z.literal('')),
  randomBloodSugar: z
    .string()
    .regex(/^[0-9]{1,3}\d$/gm, { message: 'Enter a number greater than 10' })
    .optional()
    .or(z.literal('')),
  urine: z.string().optional(),
  id: z.string(),
  patientId: z.string(),
  providerId: z.string(),
});

type SoapAssessmentProps = {
  handleSoapSubmit: (formData: z.infer<typeof soapFormSchema>) => Promise<void>;
  soapData?: SOAP;
  handleClose?: () => void;
};

export default function SoapAssessmentForm({
  handleSoapSubmit,
  soapData,
  handleClose,
}: SoapAssessmentProps) {

  const { patientId, patientFirstName, patientLastName, providerId } =
    usePatientStore.getState();

  const router = useRouter();
  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof soapFormSchema>) {
    handleSoapSubmit(values)
      .then(() => {
        toast({ title: 'Your exam has been saved' });
        if (handleClose) {
          handleClose();
        } else {
          router.push(`/dashboard/patient/${patientId}`);
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      });
  }

  const {
    id,
    subjective_findings,
    objective_findings,
    assessment,
    plan,
    blood_pressure,
    heart_rate,
    respiratory_rate,
    oxygen_saturation,
    temperature,
    random_blood_sugar,
    urine,
    patient,
    provider,
  } = soapData || {};

  const defaultValues = {
    id: id || '',
    subjectiveFindings: subjective_findings || '',
    objectiveFindings: objective_findings || '',
    assessment: assessment || '',
    plan: plan || '',
    bloodPressure: blood_pressure || '',
    heartRate: heart_rate?.toString() || '',
    respiratoryRate: respiratory_rate?.toString() || '',
    oxygenSaturation: oxygen_saturation?.toString() || '',
    temperature: temperature?.toString() || '',
    randomBloodSugar: random_blood_sugar?.toString() || '',
    urine: urine?.toString() || '',
    patientId: patientId as string,
    providerId: providerId as string,
  };

  const form = useForm<z.infer<typeof soapFormSchema>>({
    resolver: zodResolver(soapFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { step, isFirstStep, isLastStep, next, back } = useMultistepForm([
    <SoapFields form={form} key="soap" />,
    <Vitals form={form} key="vitals" />,
  ]);

  const isStepOneValid = form.getFieldState('subjectiveFindings').invalid;

  return (
    <div className="p-4 max-w-lg w-full m-auto">
      <h2 className="font-bold text-lg">SOAP Assessment</h2>
      <p className="my-3">
        <span className="font-semibold">Current Patient: </span>
        {patientFirstName} {patientLastName}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-md w-full px-2 mx-auto"
          autoSave="off"
          autoComplete="off"
        >
          {step}
          <div
            className={`flex ${
              isFirstStep ? 'justify-end' : 'justify-between'
            }`}
          >
            {!isFirstStep && (
              <Button className="w-24" type="button" onClick={back}>
                Back
              </Button>
            )}

            {isLastStep ? (
              <Button
                className="w-24"
                disabled={
                  !soapData
                    ? !form.formState.isDirty ||
                      (form.formState.isDirty && isStepOneValid)
                    : form.formState.isDirty && isStepOneValid
                }
                type="submit"
              >
                Submit
              </Button>
            ) : (
              <Button
                className="w-24"
                type="button"
                disabled={
                  !soapData
                    ? !form.formState.isDirty ||
                      (form.formState.isDirty && isStepOneValid)
                    : form.formState.isDirty && isStepOneValid
                }
                onClick={next}
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
