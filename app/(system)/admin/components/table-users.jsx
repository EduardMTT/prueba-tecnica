'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import DialogEditUser from './dialog-edit-user';
import { DialogDeleteUser } from './dialog-delete-user';
import { Skeleton } from '@/components/ui/skeleton';
import { useUsers } from '../hooks/useUser';
import { useState } from 'react';

export function TableUsers() {
  const { isPending, data: users, isError, error } = useUsers();

  const [deleteButtonHovered, setDeleteButtonHovered] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);

  const handleEdit = (user = null) => {
    setCurrentUser(user);
    setIsOpenDialogEdit(true);
  };
  const handleClose = (open) => {
    setIsOpenDialogEdit(open);
    setCurrentUser(null);
  };

  if (isPending) {
    return <UsersTableSkeleton />;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <span className="font-bold text-2xl flex flex-row items-center gap-4">
            <Users className="w-10 h-10 text-green-950 p-1" />
            Usuarios registrados
          </span>
        </CardHeader>
        <div className="h-2 bg-gradient-to-r from-[#11de40] to-[#5debf2]"></div>
        <CardContent className="rounded shadow-sm bg-white p-4 m-4">
          <Table className="">
            <TableCaption>Lista de usuarios registrados</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nombre</TableHead>
                <TableHead>Apellidos</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users &&
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className={`bg-white transition-all duration-300 ${
                      deleteButtonHovered === user.id
                        ? 'shadow-lg bg-red-800'
                        : 'hover:shadow-lg bg-white'
                    } h-full`}
                  >
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="flex flex-row items-center gap-3">
                      <DialogDeleteUser
                        id={user.id}
                        setDeleteButtonHovered={setDeleteButtonHovered}
                      />
                      <DialogEditUser
                        isOpenDialogEdit={isOpenDialogEdit}
                        handleClose={handleClose}
                        currentUser={currentUser}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(user)}
                      >
                        <Pencil className=" h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

function UsersTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <span className="font-bold text-2xl flex flex-row items-center gap-4">
          <Users className="w-10 h-10 text-green-950 p-1" />
          Usuarios registrados
        </span>
      </CardHeader>

      <div className="h-2 bg-gradient-to-r from-[#11de40] to-[#5debf2]"></div>

      <CardContent className="rounded shadow-sm bg-white p-4 m-4">
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[140px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-4 w-[80px]" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-6 w-6 rounded" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
