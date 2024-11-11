import {
  useDeleteUserQueryLogo,
  useGetUserQuery,
  useUpdateUserLogoQuery,
} from '@/api/user/users-query';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { UserIcon } from './ui/icons';

type Props = {
  userName: string | undefined;
  userId: number | undefined;
};

const fileTypes = ['JPEG', 'PNG', 'TFT', 'JPG'];

export const UserAvatar: React.FC<Props> = ({ userName, userId }) => {
  const { data: user } = useGetUserQuery(userId);
  const {
    mutateAsync: loadUserLogo,
    error: loadError,
    isPending,
  } = useUpdateUserLogoQuery();
  const { mutateAsync: removeAvatar } = useDeleteUserQueryLogo();

  const uploadAvatar = async (file: File) => {
    try {
      if (!userId) {
        throw new Error('There is no user id');
      }
      await loadUserLogo({ id: userId, file });
      toast({
        title: 'Avatar has been added',
      });
    } catch (error) {
      console.error();
      toast({
        title: 'Process failed',
        description: `${loadError?.message}`,
        variant: 'destructive',
      });
      throw new Error(`Failed to create company: ${error}`);
    }
  };

  const removeUserAvatar = async () => {
    try {
      if (!userId) {
        throw new Error('There is no user id');
      }
      await removeAvatar(userId);
      toast({
        title: 'Avatar has been removed',
      });
    } catch (error) {
      console.error();
      toast({
        title: 'Process failed',
        description: `${loadError?.message}`,
        variant: 'destructive',
      });

      throw new Error(`Failed to remove avatar: ${error}`);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex flex-col items-center">
        <Avatar className="w-16 h-16 mb-1 bg-primary-foreground rounded-full flex items-center justify-center">
          <AvatarImage src={user?.avatar || ''} className="rounded-full" />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
        <p className="text-white text-lg text-center">
          {userName || 'User name'}
        </p>
      </div>
      {user?.avatar ? (
        <Button
          disabled={isPending}
          onClick={removeUserAvatar}
          className="absolute top-0 right-0 z-10 flex items-start"
          size={'icon'}
          variant={null}
        >
          <Cross2Icon className="w-5 h-5" color="white" />
        </Button>
      ) : (
        <div className="absolute top-0 right-0 z-10">
          <FileUploader
            handleChange={uploadAvatar}
            disabled={isPending || !userId}
            name={'attachments'}
            types={fileTypes}
          >
            <PlusIcon className="w-5 h-5" color="white" />
          </FileUploader>
        </div>
      )}
    </div>
  );
};
