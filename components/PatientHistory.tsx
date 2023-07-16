'use client';

import Link from 'next/link';
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

const formSchema = z.object({
  pc: z.string().min(5, {
    message: 'PC must be at least 5 characters.',
  }),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

export function PatientHistory() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pc: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md w-full">
        <FormField
          control={form.control}
          name="pc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Presenting Complaint</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// const PatientHistory = () => {
//   return (
//     <div>
//       <h2>Patient History</h2>
//       <form action="">

//         <div>
//           <label htmlFor="pc">Presenting Complaint</label>
//           <textarea name="pc" id="pc" />
//         </div>

//         <div>
//           <label htmlFor="hpc">History of Presenting Complaint</label>
//           <textarea name="hpc" id="hpc" />
//         </div>

//         <div>
//           <label htmlFor="pmh">Past Medical/Surgical History</label>
//           <textarea name="pmh" id="pmh" />
//         </div>

//         <div>
//           <label htmlFor="dhx">Drug History</label>
//           <textarea name="dhx" id="dhx" />
//         </div>

//         <div>
//           <label htmlFor="fhx">Family History</label>
//           <textarea name="fhx" id="fhx" />
//         </div>

//         <div>
//           <label htmlFor="shx">Social History</label>
//           <textarea name="shx" id="shx" />
//         </div>

//         <div>
//           <label htmlFor="sr">Systems Review</label>
//           <textarea name="sr" id="sr" />
//         </div>

//         <button type="submit">Save</button>

//       </form>
//     </div>
//   )
// }
