'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { FaSpinner } from 'react-icons/fa';

// Define the form schema using Zod
const FormSchema = z.object({
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
});

export default function CalendarForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form using React Hook Form with Zod validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Handle form submission
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    const selectedDate = data.dob;
    const currentDate = new Date();

    // Simulate a network request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if the selected date is in the future
    if (selectedDate > currentDate) {
      router.push('/error'); // Redirect to error page if future date
    } else {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      router.push(`/date/${formattedDate}`); // Redirect to the selected date page
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg font-medium text-gray-700">
                  Select a Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal flex justify-between items-center',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP') // Show formatted selected date
                        ) : (
                          <span className="text-gray-500">Pick a date</span> // Show placeholder if no date is selected
                        )}
                        <CalendarIcon className="ml-2 h-5 w-5 text-gray-400" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange} // Handle date selection
                      disabled={(date) => date > new Date()} // Disable future dates
                      initialFocus
                      className="rounded-lg shadow-lg"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-sm text-gray-500">
                  Select a date to view details. Future dates are not allowed.
                </FormDescription>
                <FormMessage className="text-red-500 text-sm mt-1" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={`mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center ${
              isSubmitting ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Redirecting...
              </>
            ) : (
              'Go to Notes'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
