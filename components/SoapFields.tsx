'use client';
import { z } from 'zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { soapFormSchema } from './SoapAssessmentForm';
import { UseFormReturn } from 'react-hook-form';

export default function SoapFields({
  form,
}: {
  form: UseFormReturn<z.infer<typeof soapFormSchema>>;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="subjectiveFindings"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Subjective Findings
            </FormLabel>
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
    </>
  );
}
