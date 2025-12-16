// @ts-ignore force, cause this for generic use
/** biome-ignore-all lint/suspicious/noTsIgnore: > */

import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';

interface FieldConfig {
  label: string;
  type?: 'text' | 'textarea' | 'number';
}

interface FieldObjectProps<T extends FieldValues, O extends object> {
  form: UseFormReturn<T>;
  name: keyof T & string;
  label: string;
  shape: { [K in keyof O]: FieldConfig };
}

export const FieldObject = <T extends FieldValues, O extends object>({ form, name, label, shape }: FieldObjectProps<T, O>) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>

      <div className="space-y-4">
        <div className="border p-4 rounded space-y-2">
          {Object.entries(shape).map(([key, _config]) => {
            const config = _config as FieldConfig;
            return (
              <FormField
                control={form.control}
                key={key}
                name={`${name}.${key}` as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{config.label}</FormLabel>
                    <FormControl>
                      {config.type === 'textarea' ? (
                        <Textarea {...field} value={field.value ?? ''} />
                      ) : config.type === 'number' ? (
                        <Input
                          type="number"
                          value={field.value ?? ''}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === '' ? undefined : Number(value));
                          }}
                        />
                      ) : (
                        <Input type={config.type ?? 'text'} {...field} value={field.value ?? ''} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>
      </div>
      <FormMessage />
    </FormItem>
  );
};
