'use client';

import {DialogFooter} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Input} from '@/components/ui/input';
import {RadioGroup, RadioGroupItem} from './ui/radio-group';

import {editPatientData} from '@/app/dashboard/patient/[id]/actions';
import {useRouter} from 'next/navigation';
import {useToast} from './ui/use-toast';

export const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  surname: z.string().min(2, {
    message: 'Surname must be at least 2 characters.',
  }),
  sex: z.string().refine((value) => ['male', 'female', ''].includes(value), {
    message: 'Sex must be male, female, or not provided.',
  }),
  dateOfBirth: z.string().min(6, {message: 'DOB is required'}),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  emergencyContactName: z.string(),
  emergencyContact: z.string(),
  providerId: z.string(),
  practiceId: z.string(),
  patientId: z.string(), 
});

function EditPatientData({
  patientData,
  patientId,
 
  onClose,
  setIsEditing,
}: CurrentPatient & {
  patientData: Patient;
  practiceId: string;
  providerId: string;
  onClose?: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    first_name,
    surname,
    sex,
    date_of_birth,
    email,
    phone,
    city,
    street_address,
    emergency_contact_name,
    emergency_contact,
    practice,
    primary_provider,
    id,
  } = patientData;

  const defaultValues = {
    firstName: first_name,
    surname: surname,
    dateOfBirth: date_of_birth || undefined,
    sex: sex || undefined,
    email: email || '',
    phone: phone || '',
    streetAddress: street_address || '',
    city: city || '',
    emergencyContactName: emergency_contact_name || '',
    emergencyContact: emergency_contact || '',
    patientId:id,
    providerId:primary_provider||"",
    practiceId:practice||""
  };
  console.log('Default:', defaultValues);

  console.log('PatientData in EditPatientData:', patientData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onChange',
  });

  const router = useRouter();
  const {toast} = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('submit values', values);

    setIsEditing((p: boolean) => !p);

    editPatientData({ ...values, patientId })
      .then(() => {
        toast({title: 'Patient data has been updated'});
        router.push(`/dashboard/patient/${patientId}`);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      });
  }

  return (
    <div className="p-4 max-w-lg w-full m-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log('Form validation errors:', errors)
          )}
          className="space-y-8 max-w-sm w-full mx-auto"
          autoSave="off"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({field}) => (
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
            render={({field}) => (
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
            render={({field}) => (
              <FormItem className="space-y-3">
                <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">
                  Sex
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    className="flex space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="male"
                          checked={field.value === 'male'}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="female"
                          checked={field.value === 'female'}
                        />
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
            render={({field}) => (
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
            render={({field}) => (
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
            render={({field}) => (
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
            render={({field}) => (
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
            render={({field}) => (
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
            render={({field}) => (
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
            render={({field}) => (
              <FormItem>
                <FormLabel>Emergency Contact Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} className="max-w-xs" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              disabled={
                !form.formState.isDirty ||
                (form.formState.isDirty && !form.formState.isValid)
              }
              type="submit"
              onClick={() => {
                   
              console.log(form.getValues())
              }}
            >
              Submit
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

export default EditPatientData;
