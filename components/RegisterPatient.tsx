'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

// UI Elements
import { Button, buttonVariants } from '@/components/ui/button';
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
import { useProviderStore } from '@/stores/currentProviderStore';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  surname: z.string().min(2, {
    message: 'Surname must be at least 2 characters.',
  }),
  sex: z.string({ required_error: 'Sex is required' }),
  dateOfBirth: z.string().min(6, { message: 'DOB is required' }),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  emergencyContactName: z.string(),
  emergencyContact: z.string(),
  providerId: z.string(),
  practiceId: z.string(),
});

const supabase = createClientComponentClient();

export function RegisterPatient() {
  const router = useRouter();

  const { providerId, practiceId } = useProviderStore.getState();
  const [registeredPatient, setRegisteredPatient] = useState<{
    patientId: string;
  } | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

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
      emergencyContactName: '',
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
      emergencyContactName,
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
          emergency_contact_name: emergencyContactName,
          emergency_contact: emergencyContact,
          primary_provider: providerId,
          practice: practiceId,
        })
        .select('id, first_name, surname');
      if (error) throw error;
      else {
        const [{ id: patientId }] = data as Patient[];
        if (patientId) {
          setRegisteredPatient({
            patientId,
          });
        }

        setIsConfirmationOpen(true);
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  }

  const { toast } = useToast();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-sm w-full mx-auto"
          autoSave="off"
          autoComplete="off"
        >
          <h2 className="font-semibold text-lg">Register New Patient</h2>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  First Name
                </FormLabel>
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
                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Surname
                </FormLabel>
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
                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Sex
                </FormLabel>
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
                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Date of Birth
                </FormLabel>
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
            name="emergencyContactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Name</FormLabel>
                <FormControl>
                  <Input {...field} className="max-w-xs" />
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
                <FormLabel>Emergency Contact Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} className="max-w-xs" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={
              !form.formState.isDirty ||
              (form.formState.isDirty && !form.formState.isValid)
            }
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
      <Dialog
        open={isConfirmationOpen}
        onOpenChange={() => setIsConfirmationOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Patient successfully registered</DialogTitle>
            <DialogDescription>
              What would you like to do next?
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex justify-around">
            <Button
              variant="outline"
              onClick={() => {
                setIsConfirmationOpen(false);
                router.push('/dashboard');
              }}
            >
              Back to Dashboard
            </Button>
            <Button
              className={buttonVariants()}
              onClick={() => {
                setIsConfirmationOpen(false);
                router.push(
                  `/dashboard/new/exam/${registeredPatient?.patientId}`
                );
              }}
            >
              Clerk Patient
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
