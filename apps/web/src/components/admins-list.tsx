import {
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
} from '@/api/admins/admins-query';
import { useQueryParams } from '@/hooks/use-query-params';
import { toast } from '@/hooks/use-toast';
import { useToggleState } from '@/hooks/use-toggle-state';
import { User } from '@/types/User';
import { Trash2Icon } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditPopover } from './edit-popover';
import { EditUserForm } from './form/edit-user-form';
import { PaginationItems } from './pagination-items';
import { SubmitDialog } from './submit-dialog';
import { Spinner } from './ui/Spinner';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export const AdminsList: React.FC = () => {
  const [adminId, setAdminId] = useState<number | null>(null);
  const navigate = useNavigate();
  const { allQueryParams } = useQueryParams();
  const [admin, setAdmin] = useState<User | null>();
  const [isActive, setIsActive, removeIsActive, toggle] = useToggleState();
  const {
    data: usersData,
    isError,
    isLoading,
  } = useGetAllAdminsQuery({ page: allQueryParams.page });

  const { mutateAsync: deleteAdmin, error: deleteError } =
    useDeleteAdminMutation();
  const removeAdminValue = () => {
    setAdmin(null);
  };
  const removeAdmin = async () => {
    try {
      if (!adminId) {
        throw new Error("Admin's id is required");
      }
      const admin = await deleteAdmin(adminId);
      toast({
        title: `Admin ${admin.name} ${admin.surname} has been deleted`,
      });
      removeAdminValue();
      // removeIsActive();
    } catch (error) {
      console.error();
      toast({
        title: 'Process failed',
        description: `${deleteError?.message}`,
        variant: 'destructive',
      });
      throw new Error(`Failed to delete admin: ${error}`);
    }
  };

  if (isError) {
    return <p>Oops! Something went wrong!</p>;
  }

  if (isLoading) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <Spinner spearerSize="large" />
      </div>
    );
  }

  if (!usersData) {
    return <p>There is no user data</p>;
  }
  const { meta, data: users } = usersData;

  return (
    <div>
      <Button
        onClick={() => {
          navigate('/create-admin');
        }}
        className="mb-5"
        variant={'outline'}
      >
        Add admin
      </Button>
      <Table className="bg-card mb-5">
        <TableCaption>A list of users</TableCaption>
        <TableHeader>
          <TableRow className="p-4">
            <TableHead className="w-[100px] text-center">Id</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Surname</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(({ id, name, surname, email, role }) => (
            <TableRow
              onDoubleClick={() => {
                setAdmin({ id, name, surname, email, role });
                // setIsActive();
              }}
              key={id}
            >
              <TableCell className="text-center">{id}</TableCell>
              <TableCell className="text-center">{name}</TableCell>
              <TableCell className="text-center">{surname}</TableCell>
              <TableCell className="text-center">{email}</TableCell>
              <TableCell className="text-center">{role}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setAdminId(id);
                    setIsActive();
                  }}
                  variant={'ghost'}
                >
                  <Trash2Icon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta.lastPage > 1 && (
        <PaginationItems previousPage={meta.prev} nextPage={meta.next} />
      )}
      {admin && (
        <EditPopover
          isOpen={Boolean(admin)}
          setIsOpen={removeAdminValue}
          editForm={
            <EditUserForm
              isAdmin={true}
              user={admin}
              close={removeAdminValue}
            />
          }
        />
      )}
      <SubmitDialog
        isActive={isActive}
        removeValue={removeAdmin}
        setIsActive={toggle}
        message="admin"
      />
    </div>
  );
};
