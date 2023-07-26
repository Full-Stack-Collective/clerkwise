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
import { useUserStore } from '@/stores/currentProviderStore';

const formSchema = z.object({
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
  fluidBalance: z.string(),
  focusedFindings: z.string(),
  bloodPressure: z.string().regex(/\d{2,3}\/\d{2,3}/gm, {
    message: 'Please enter BP in format Systolic/Diastolic',
  }),
  heartRate: z.coerce
    .number({ invalid_type_error: 'Please enter a number' })
    .int()
    .min(0, { message: 'Please enter a positive number' })
    .optional(),
  respiratoryRate: z.coerce
    .number({ invalid_type_error: 'Please enter a number' })
    .int()
    .min(0, { message: 'Please enter a positive number' })
    .optional(),
  oxygenSaturation: z.coerce
    .number({ invalid_type_error: 'Please enter a number' })
    .int()
    .min(0, { message: 'Please enter a positive number' })
    .max(100, { message: 'Value cannot be greater than 100' })
    .optional(),
  temperature: z.coerce
    .number({ invalid_type_error: 'Please enter a number' })
    .min(0, { message: 'Please enter a positive number' })
    .optional(),
  differentialDiagnosis: z.string(),
  diagnosis: z.string(),
  plan: z.string(),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.table(values);
}

function NewPatientExam() {
  const userInfo = useUserStore((state) => state.providerInfo);
  console.log(userInfo);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      fluidBalance: '',
      focusedFindings: '',
      bloodPressure: '',
      heartRate: 0,
      respiratoryRate: 0,
      oxygenSaturation: 0,
      temperature: 0,
      differentialDiagnosis: '',
      diagnosis: '',
      plan: '',
    },
  });
  return (
    <div className="p-4 max-w-lg w-full m-auto h-">
      <h2 className="font-semibold text-lg">Patient History</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-md w-full px-2"
        >
          <Tabs defaultValue="history" className="w-full">
            <TabsList>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="clinicalExam">Clinical Exam</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
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
              </div>
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
            </TabsContent>
          </Tabs>

          {/* Clinical Exam */}

          {/* Vitals */}

          {/* Diagnosis and Treatment Plan */}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default NewPatientExam;
