import { useGetUserQuery } from '@/api/user/users-query';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthContext } from '@/hooks/auth-context';

export function Profile() {
  const { authData } = useAuthContext();
  const {
    data: userData,
    isLoading,
    isError,
  } = useGetUserQuery(authData?.userId);
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
            <Button>Edit information</Button>
          </CardFooter>
        </Card>
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
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
