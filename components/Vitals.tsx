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
import { Input } from './ui/input';

{
  /* BP/Pulse/Respiratory rate/Oxygen saturation/Temperature. */
}

const formSchema = z.object({
  bloodPressure: z.string(),
  heartRate: z.coerce
    .number({ invalid_type_error: 'Please enter a number' })
    .int()
    .min(0, { message: 'Please enter a positive number' }),
  respiratoryRate: z.coerce
    .number({ invalid_type_error: 'Please enter a number' })
    .int()
    .min(0, { message: 'Please enter a positive number' }),
  oxygenSaturation: z.coerce
    .number({ invalid_type_error: 'Please enter a number' })
    .int()
    .min(0, { message: 'Please enter a positive number' })
    .max(100, { message: 'Value cannot be greater than 100' }),
  temperature: z.coerce
    .number({ invalid_type_error: 'Please enter a number' })
    .min(0, { message: 'Please enter a positive number' }),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

export function Vitals() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bloodPressure: '',
      heartRate: 0,
      respiratoryRate: 0,
      oxygenSaturation: 0,
      temperature: 0,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-md w-full"
      >
        <h2 className="font-semibold text-lg">Vitals</h2>

        <FormField
          control={form.control}
          name="bloodPressure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Pressure</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input placeholder="" {...field} className="max-w-[80px]" />
                  <span className="text-sm">mmHg</span>
                </div>
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
                <div className="flex items-center gap-2">
                  <Input placeholder="" {...field} className="max-w-[80px]" />
                  <span className="text-sm">beats per minute</span>
                </div>
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
                <div className="flex items-center gap-2">
                  <Input
                    placeholder=""
                    {...field}
                    type="number"
                    className="max-w-[80px]"
                  />
                  <span className="text-sm">breaths per minute</span>
                </div>
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
                <div className="flex items-center gap-2">
                  <Input
                    placeholder=""
                    {...field}
                    type="number"
                    className="max-w-[80px]"
                  />
                  <span className="text-sm">%</span>
                </div>
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
                <div className="flex items-center gap-2">
                  <Input
                    placeholder=""
                    {...field}
                    type="number"
                    className="max-w-[80px]"
                  />
                  <span className="text-sm">°C</span>
                </div>
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
