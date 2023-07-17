'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { cn } from '@/lib/utils';
import { CalendarIcon, Calendar } from 'lucide-react';
import { format } from 'path';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'PC must be at least 2 characters.',
  }),
  surname: z.string(),
  sex: z.string(),
  dateOfBirth: z.string(),
  id: z.string(),
  socialHistory: z.string(),
  phone: z.string(),
  emergencyContact: z.string(),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

export function RegisterPatient() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      surname: '',
      sex: '',
      dateOfBirth: '',
      id: '',
      socialHistory: '',
      phone: '',
      emergencyContact: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-md w-full"
      >
        <h2 className="font-semibold text-lg">Register New Patient</h2>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="max-w-xs" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} className="max-w-xs" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Sex</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex space-x-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input {...field} className="max-w-xs" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" {...field} className="max-w-xs" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergencyContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Contact</FormLabel>
              <FormControl>
                <Input type="tel" {...field} className='max-w-xs'/>
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
