'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { useState } from 'react';
import { useCategories } from '@/app/hooks/useCategories';
import DialogCreateCategory from './dialog-create-category';
import DialogEditCategory from './dialog-edit-category';
import { DialogDeleteCategory } from './dialog-delete-category';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, Pencil } from 'lucide-react';

export default function PanelCategories({ handleViewRooms }) {
  const [isHovered, setIsHovered] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [isOpenDialogAdd, setIsOpenDialogAdd] = useState(false);
  const handleDialogChange = (open) => {
    setIsOpenDialogAdd(open);
  };
  const handleEdit = (category = null) => {
    setCurrentCategory(category);
    setIsOpenDialogEdit(true);
  };

  const handleClose = (open) => {
    setIsOpenDialogEdit(open);
    setCurrentCategory(null);
  };

  const [deleteButtonHovered, setDeleteButtonHovered] = useState(null);
  const [viewButtonHovered, setViewButtonHovered] = useState(null);
  const { isPending, data: categories, isError, error } = useCategories();

  if (isPending) {
    return (
      <div className="h-[100px] w-[200px] flex flex-col">
        <Skeleton className="h-8 w-full mb-2" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error?.message || 'Failed to load categories.'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="flex w-full justify-end mb-6">
          <DialogCreateCategory
            isOpenDialogAdd={isOpenDialogAdd}
            handleClose={handleDialogChange}
          />
        </div>

        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                onMouseEnter={() => setIsHovered(category.id)}
                onMouseLeave={() => setIsHovered(false)}
                className={`bg-[#025575] overflow-hidden border-[#c7d2d9] transition-all duration-300 ${
                  deleteButtonHovered === category.id
                    ? 'shadow-lg bg-red-800'
                    : viewButtonHovered === category.id
                    ? 'shadow-lg bg-cyan-500'
                    : 'hover:shadow-lg hover:bg-[#0466df]'
                } h-full`}
              >
                <CardHeader className="relative z-10 pb-1">
                  <CardTitle className="text-xl font-bold text-white tracking-tight flex flex-row justify-between">
                    {category.name}
                    <div className="gap-2 flex flex-row">
                      <DialogEditCategory
                        isOpenDialogEdit={isOpenDialogEdit}
                        handleClose={handleClose}
                        currentCategory={currentCategory}
                        id={category.id}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(category)}
                      >
                        <Pencil className=" h-4 w-4" />
                      </Button>
                      <DialogDeleteCategory
                        id={category.id}
                        setDeleteButtonHovered={setDeleteButtonHovered}
                      />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-blue-100 leading-relaxed">
                    {category.description}
                  </p>
                  <div
                    className={`mt-4 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 ${
                      isHovered === category.id && deleteButtonHovered === null
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-70'
                    }`}
                  />
                </CardContent>
                <CardFooter className="flex flex-row justify-center">
                  <Button
                    variant="ghost"
                    className="text-white"
                    onMouseEnter={() => setViewButtonHovered(category.id)}
                    onMouseLeave={() => setViewButtonHovered(null)}
                    onClick={() => handleViewRooms(category)}
                  >
                    <Home />
                    Ver habitaciones
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No hay categorías disponibles
          </p>
        )}
      </div>
    </>
  );
}
