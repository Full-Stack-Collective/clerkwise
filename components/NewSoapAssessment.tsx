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

const soapFormSchema = z.object({
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
          className="space-y-8 max-w-md w-full px-2"
          autoSave="off"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="subjectiveFindings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subjective Findings</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="objectiveFindings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objective Findings</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assessment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assessment</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bloodPressure"
            render={({ field }) => (
              <FormItem className="max-w-[280px] w-full mx-auto">
                <FormLabel>Blood Pressure</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className="max-w-[80px]"
                    rightLabel="mmHg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heartRate"
            render={({ field }) => (
              <FormItem className="max-w-[280px] w-full mx-auto">
                <FormLabel>Heart Rate</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className="max-w-[80px]"
                    type="number"
                    rightLabel="beats per minute"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="respiratoryRate"
            render={({ field }) => (
              <FormItem className="max-w-[280px] w-full mx-auto">
                <FormLabel>Respiratory Rate</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    type="number"
                    className="max-w-[80px]"
                    rightLabel="breaths per minute"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oxygenSaturation"
            render={({ field }) => (
              <FormItem className="max-w-[280px] w-full mx-auto">
                <FormLabel>SpO2</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    type="number"
                    className="max-w-[80px]"
                    rightLabel="%"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem className="max-w-[280px] w-full mx-auto">
                <FormLabel>Temperature</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    type="number"
                    className="max-w-[80px]"
                    rightLabel="°C"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="randomBloodSugar"
            render={({ field }) => (
              <FormItem className="max-w-[280px] w-full mx-auto">
                <FormLabel>Random Blood Sugar</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    type="number"
                    className="max-w-[80px]"
                    rightLabel="mg/dL"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urine"
            render={({ field }) => (
              <FormItem className="max-w-[280px] w-full mx-auto">
                <FormLabel>Urine</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    type="text"
                    // className="max-w-[80px]"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="my-5" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
