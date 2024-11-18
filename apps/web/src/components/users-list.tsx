import { useGetAllUsersQuery } from '@/api/user/users-query.ts';
import { useQueryParams } from '@/hooks/use-query-params';
// import { useNavigate } from 'react-router-dom';
import { PaginationItems } from './pagination-items.tsx';
import { Spinner } from './ui/Spinner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export const UsersList: React.FC = () => {
  const { allQueryParams } = useQueryParams();
  // const navigate = useNavigate();
  const {
    data: usersData,
    isError,
    isLoading,
  } = useGetAllUsersQuery({ page: allQueryParams.page });

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
            <TableRow key={id}>
              <TableCell className="text-center">{id}</TableCell>
              <TableCell className="text-center">{name}</TableCell>
              <TableCell className="text-center">{surname}</TableCell>
              <TableCell className="text-center">{email}</TableCell>
              <TableCell className="text-center">{role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta.lastPage > 1 && (
        <PaginationItems previousPage={meta.prev} nextPage={meta.next} />
      )}
    </div>
  );
};
