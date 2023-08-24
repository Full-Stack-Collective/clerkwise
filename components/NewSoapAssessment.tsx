'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { useMultistepForm } from '@/hooks/useMultiStepForm';
import SoapFields from './SoapFields';
import { Vitals } from './Vitals';

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

  patientId: z.string(),
  providerId: z.string(),
});

function onSubmit(values: z.infer<typeof soapFormSchema>) {
  console.table(values);
}

export default function NewSoapAssessment({
  patientId,
  patientFirstName,
  patientLastName,
  providerId,
}: {
  patientId: string;
  patientFirstName: string;
  patientLastName: string;
  providerId: string;
}) {
  const defaultValues = {
    subjectiveFindings: '',
    objectiveFindings: '',
    assessment: '',
    plan: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    temperature: '',
    randomBloodSugar: '',
    urine: '',
    patientId: '',
    providerId: '',
  };

   const form = useForm<z.infer<typeof soapFormSchema>>({
    resolver: zodResolver(soapFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const {
    step,
    isFirstStep,
    isLastStep,
    next,
    back,
  } = useMultistepForm([
    <SoapFields form={form} key="soap" />,
    <Vitals form={form} key="vitals" />,
  ]);

  const isStepOneValid = form.getFieldState('subjectiveFindings').invalid

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
                  !form.formState.isDirty ||
                  (form.formState.isDirty && !form.formState.isValid)
                }
                type="submit"
              >
                Submit
              </Button>
            ) : (
              <Button className="w-24" type="button" disabled={!form.formState.isDirty ||(form.formState.isDirty && isStepOneValid)} onClick={next}>
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
