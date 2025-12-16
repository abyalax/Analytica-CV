'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FC, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { FallBack } from '~/components/fragments/fallback';
import { FieldObject } from '~/components/fragments/input/field-object';
import { Section } from '~/components/layouts/section';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { FieldMarkdown } from '../../../../../components/fragments/input/field-markdown';
import { FormDataJobs, jobsSchema } from './schema';

type Props = {
  initialValues?: FormDataJobs;
  onSubmit: (_data: FormDataJobs) => void;
  isLoading?: boolean;
  buttonText?: string;
};

const defaultValues: FormDataJobs = {
  title: '',
  company: '',
  location: '',
  employment_type: '',
  level: '',
  description: '',
  responsibilities: '',
  requirements: '',
  skills: '',
  experience_year: 0,
  salary_range: {
    min: 0,
    max: 0,
    currency: 'id-ID',
  },
  status: '',
};

export const FormJobs: FC<Props> = ({ onSubmit, initialValues, isLoading = false, buttonText = 'Submit' }) => {
  const form = useForm<FormDataJobs>({
    resolver: zodResolver(jobsSchema),
    mode: 'onBlur',
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  return (
    <Suspense fallback={<FallBack />}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employment_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type Of Employee</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Level</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Section>
              <FieldObject
                form={form}
                name="salary_range"
                label="Salary Range"
                shape={{
                  min: { label: 'Minimum', type: 'number' },
                  max: { label: 'Maximum', type: 'number' },
                  currency: { label: 'Currency', type: 'text' },
                }}
              />
            </Section>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="prose max-w-none">
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Requierement</FormLabel>
                    <FormControl>
                      <FieldMarkdown {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="mt-5">
            {buttonText}
          </Button>
        </form>
      </Form>
    </Suspense>
  );
};
