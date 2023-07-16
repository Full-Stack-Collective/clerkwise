'use client';

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
  onExamination: z.string(),
  observations: z.string(),
  vitals: z.string(),
  fluidBalance: z.string(),
  focusedFindings: z.string(),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

export function ClinicalExam() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      onExamination: '',
      observations: '',
      vitals: '',
      fluidBalance: '',
      focusedFindings: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-md w-full"
      >
        <h2 className="font-semibold text-lg">Clinical Exam</h2>

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

{/* BP/Pulse/Respiratory rate/Oxygen saturation/Temperature. */}

        <FormField
          control={form.control}
          name="vitals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vitals</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fluidBalance"
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
          name="focusedFindings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Focused Findings</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Document the focused system examinations you have performed"
                  {...field}
                />
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
