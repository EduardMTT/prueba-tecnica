'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useUpdateCategory } from '../hooks/useUpdateCategory';

export const formSchema = z.object({
  name: z.string().min(1, 'El nombre de categoría es requerido'),
  description: z.string().min(1, 'El campo descripción es requerido'),
});

export default function DialogEditCategory({
  isOpenDialogEdit,
  handleClose,
  currentCategory,
}) {
  const updateCategoryMutation = useUpdateCategory();
  const isSubmitting = updateCategoryMutation.isPending;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (currentCategory) {
      form.reset({
        name: currentCategory.name || '',
        description: currentCategory.description || '',
      });
    }
  }, [currentCategory, form]);

  const handleUpdateCategory = async (data) => {
    try {
      console.log('Datos a enviar:', data);
      await updateCategoryMutation.mutateAsync({
        id: currentCategory.id,
        formData: data,
      });
      handleClose();
    } catch (error) {
      console.error('Error al editar la categoría', error);
    }
  };

  return (
    <Dialog open={isOpenDialogEdit} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar categoría</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateCategory)}
            id="category-form"
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
                      <FormLabel htmlFor="name" className="sm:text-right">
                        Nombre
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          {...field}
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
                          id="description"
                          {...field}
                          className="col-span-1 sm:col-span-3"
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-end" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0466df] text-white hover:bg-[#048fdf]"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
