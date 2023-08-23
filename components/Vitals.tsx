'use client';

import * as z from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { soapFormSchema } from './NewSoapAssessment';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';


export function Vitals({form}: {
  form: UseFormReturn<z.infer<typeof soapFormSchema>>;
}) {


  return (
    <div className='max-w-[240px] mx-auto'>

    <h2 className='font-semibold mb-4'>Vitals</h2>
        <FormField
          control={form.control}
          name="bloodPressure"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
            <FormItem>
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
            <FormItem>
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
            <FormItem>
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
  );
}
