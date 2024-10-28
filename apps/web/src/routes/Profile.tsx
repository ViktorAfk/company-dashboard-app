import { useGetUserQuery } from '@/api/user/users-query';
import { EditPopover } from '@/components/edit-popover';
import { ChangePasswordForm } from '@/components/form/change-password-form';
import { EditUserForm } from '@/components/form/edit-user-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthContext } from '@/hooks/auth-context';
import { useToggleState } from '@/hooks/use-toggle-state';

export function Profile() {
  const { authData } = useAuthContext();
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserQuery(authData?.userId);
  const [isShowing, setIsShowing, stopShowing, toggle] = useToggleState();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    <p>Oops, something went wrong</p>;
  }

  return !userData ? (
    <p>There is no current User</p>
  ) : (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <p>Name</p>
              <p>{userData.name}</p>
            </div>
            <div className="space-y-1">
              <p>Surname</p>
              <p>{userData.surname}</p>
            </div>
            <div className="space-y-1">
              <p>Email</p>
              <p>{userData.email}</p>
            </div>
            <div className="space-y-1">
              <p>Role</p>
              <p>{userData.role}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={setIsShowing}>Edit information</Button>
          </CardFooter>
        </Card>
        <EditPopover
          setIsOpen={toggle}
          isOpen={isShowing}
          buttonText={'Edit info'}
          editForm={
            <EditUserForm
              user={{
                id: userData.id,
                email: userData.email,
                surname: userData.surname,
                name: userData.name,
              }}
              close={stopShowing}
            />
          }
        />
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ChangePasswordForm userId={userData.id} />
          </CardContent>
          {/* <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
