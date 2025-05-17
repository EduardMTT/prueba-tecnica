'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateCategory } from '../hooks/useCreateCategory';
import { Plus } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const formSchema = z.object({
  name: z.string().min(1, 'El nombre de categoría es requerido'),
  description: z.string().min(1, 'El campo descripción es requerido'),
});

export default function DialogCreateCategory({ isOpenDialogAdd, handleClose }) {
  const createCategoriaMutation = useCreateCategory();
  const isSubmitting = createCategoriaMutation.isPending;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      await createCategoriaMutation.mutateAsync(values);
      closeAndReset(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const closeAndReset = (open) => {
    handleClose(open);
  };

  return (
    <Dialog open={isOpenDialogAdd} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Agregar categoría
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar categoría</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="categoria-form">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel
                        htmlFor="name"
                        className="sm:text-right flex items-center gap-2"
                      >
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="name"
                          className="col-span-1 sm:col-span-3"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel
                        htmlFor="description"
                        className="sm:text-right"
                      >
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          id="description"
                          className="col-span-1 sm:col-span-3"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => closeAndReset(false)}
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            Cerrar
          </Button>

          <Button
            type="submit"
            form="categoria-form"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Guardando...' : 'Agregar categoría'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
