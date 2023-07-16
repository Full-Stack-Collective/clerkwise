'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from './ui/textarea';

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
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

export function PatientHistory() {
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
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-md w-full"
      >
        <h2 className="font-semibold text-lg">Patient History</h2>
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
                <Textarea placeholder="Add any drug or food allergies here" {...field} />
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
