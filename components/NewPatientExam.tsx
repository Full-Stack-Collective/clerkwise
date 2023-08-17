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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useProviderStore } from '@/stores/currentProviderStore';
import { usePatientStore } from '@/stores/currentPatientStore';
import { createClinicalRecord } from '@/app/dashboard/new/exam/[id]/actions';
import BackButton from './BackButton';

export const examFormSchema = z.object({
  presentingComplaint: z.string().min(2, {
    message: 'PC must be at least 2 characters.',
  }),
  historyPresentingComplaint: z.string(),
  pastMedicalHistory: z.string(),
  drugHistory: z.string(),
  familyHistory: z.string(),
  socialHistory: z.string(),
  allergies: z.string(),
  systemsReview: z.string(),
  onExamination: z.string(),
  observations: z.string(),
  focusedFindings: z.string(),
  bloodPressure: z.string().regex(/\d{2,3}\/\d{2,3}/gm, {
    message: 'Please enter BP in format Systolic/Diastolic',
  }).optional().or(z.literal('')),
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
  differentialDiagnosis: z.string(),
  diagnosis: z.string(),
  plan: z.string(),
  patientId: z.string(),
  providerId: z.string(),
});

function onSubmit(values: z.infer<typeof examFormSchema>) {
  console.table(values);
  createClinicalRecord(values);
}

function NewPatientExam() {
  const { providerId } = useProviderStore().providerInfo;
  const { patientId, patientFirstName, patientLastName } =
    usePatientStore().currentPatient;

  const defaultValues = {
    presentingComplaint: '',
    historyPresentingComplaint: '',
    pastMedicalHistory: '',
    drugHistory: '',
    familyHistory: '',
    socialHistory: '',
    allergies: '',
    systemsReview: '',
    onExamination: '',
    observations: '',
    focusedFindings: '',
    bloodPressure: '',
    heartRate: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    temperature: '',
    randomBloodSugar: '',
    urine: '',
    differentialDiagnosis: '',
    diagnosis: '',
    plan: '',
    patientId: patientId,
    providerId: providerId,
  };

  const form = useForm<z.infer<typeof examFormSchema>>({
    resolver: zodResolver(examFormSchema),
    defaultValues,
    mode: 'onChange',
  });
  return (
    <div className="p-4 max-w-lg w-full m-auto h-">
      <BackButton />
      <h2 className="font-bold text-lg">Patient History</h2>
      <p className="my-3">
        <span className="font-semibold">Current Patient: </span>
        {patientFirstName} {patientLastName}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-md w-full px-2"
          autoSave='off'
          autoComplete='off'
        >
          <Tabs defaultValue="history" className="w-full">
            <TabsList>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="clinicalExam">Clinical Exam</TabsTrigger>
              <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <p className="text-sm my-4">Document Patient History here.</p>

              <FormField
                control={form.control}
                name="presentingComplaint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Presenting Complaint</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="historyPresentingComplaint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>History of Presenting Complaint</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pastMedicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Medical/Surgical History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="drugHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drug History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="familyHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any drug or food allergies here"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="systemsReview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Systems Review</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="vitals">
              <p className="text-sm my-4">Record any vitals.</p>
              <div className="mx-auto">
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
              </div>
            </TabsContent>

            <TabsContent value="clinicalExam">
              <p className="text-sm my-4">Note your clinical findings</p>

              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observations</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="onExamination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>On Examination</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="focusedFindings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Focused Findings</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="For focused system examinations you have performed"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="diagnosis">
              <p className="text-sm my-4">Suspected problems and plan.</p>

              <FormField
                control={form.control}
                name="differentialDiagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Differential Diagnosis</FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnosis</FormLabel>
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
              <Button className="my-5" type="submit">
                Submit
              </Button>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}

export default NewPatientExam;
