'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

// UI Elements
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from './ui/toast';
import { usePatientStore } from '@/stores/currentPatientStore';
import { useProviderStore } from '@/stores/currentProviderStore';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  surname: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  sex: z.string({ required_error: 'Sex is required' }),
  dateOfBirth: z.string().min(6, { message: 'DOB is required' }),
  email: z.string().email().optional(),
  phone: z.string(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  emergencyContact: z.string(),
  providerId: z.string(),
  practiceId: z.string(),
});

const supabase = createClientComponentClient();

export function RegisterPatient() {
  const { providerId, practiceId } = useProviderStore().providerInfo;

  const setCurrentPatient = usePatientStore((state) => state.setCurrentPatient);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      surname: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      streetAddress: '',
      city: '',
      emergencyContact: '',
      practiceId,
      providerId,
    },
    mode: 'onChange',
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      firstName,
      surname,
      sex,
      dateOfBirth,
      email,
      phone,
      city,
      streetAddress,
      emergencyContact,
      practiceId,
      providerId,
    } = values;

    try {
      if (!practiceId || !providerId) throw Error('User is not logged in');

      const { data, error } = await supabase
        .from('Patients')
        .insert({
          first_name: firstName,
          surname,
          sex,
          date_of_birth: dateOfBirth,
          email,
          phone,
          street_address: streetAddress,
          city,
          emergency_contact: emergencyContact,
          primary_provider: providerId,
          practice: practiceId,
        })
        .select('id, first_name, surname');
      if (error) throw error;
      else {
        const [
          {
            id: patientId,
            first_name: patientFirstName,
            surname: patientLastName,
          },
        ] = data as Patient[];
        if (patientId && patientFirstName && patientLastName) {
          setCurrentPatient({ patientId, patientFirstName, patientLastName });
        }

        toast({
          title: 'Patient successfully created',
          description: 'Ready to start clerking?',
          action: (
            <ToastAction altText="Clerk Patient">
              <Link href="/dashboard/new/exam">Clerk Patient</Link>
            </ToastAction>
          ),
        });

        form.reset();
      }
    } catch {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  }

  const { toast } = useToast();

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
                <Input type="date" {...field} className="max-w-xs" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="max-w-xs" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input type="text" {...field} className="max-w-xs" />
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
                <Input type="tel" {...field} className="max-w-xs" />
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
