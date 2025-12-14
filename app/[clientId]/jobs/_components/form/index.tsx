'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { InputJobDescriptions } from '../input-job-desc';
import { FormDataJobs, jobsSchema } from './schema';

type Props = {
  initialValues?: FormDataJobs;
  onSubmit: (_data: FormDataJobs) => void;
  isLoading?: boolean;
  buttonText?: string;
};

export const FormJobs: FC<Props> = ({ onSubmit, initialValues, isLoading = false, buttonText = 'Submit' }) => {
  const form = useForm<FormDataJobs>({
    resolver: zodResolver(jobsSchema),
    mode: 'onBlur',
    defaultValues: initialValues,
  });

  return (
    <div className="prose max-w-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* TODO : Complete Input Form */}
          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Requierement</FormLabel>
                <FormControl>
                  <InputJobDescriptions {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="mt-5">
            {buttonText}
          </Button>
        </form>
      </Form>
    </div>
  );
};
