'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

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
import { useToast } from '@/components/ui/use-toast';
import { registerNewProvider } from '@/app/register/complete/actions';

const formSchema = z.object({
  id: z.string(),
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  surname: z.string().min(2, {
    message: 'Surname must be at least 2 characters.',
  }),
  speciality: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string(),
});

const supabase = createClientComponentClient();

export function AdminCompleteSignup({ userId }: { userId: string }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      surname: '',
      speciality: '',
      email: '',
      phone: '',
      id: userId,
    },
    mode: 'onChange',
  });
  function removeSpecialCharacters(str: string) {
    return str.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase();
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    registerNewProvider(values)
      .then((data) => {
        if (data) {
          console.log(data);
          toast({ title: 'Your details have been updated' });
          router.refresh();
          // router.push('/dashboard');
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      });
  }

  const { toast } = useToast();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-4 space-y-8 max-w-sm w-full mx-auto"
          autoSave="off"
          autoComplete="off"
        >
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
            name="speciality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speciality</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="max-w-xs" />
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
    </>
  );
}
