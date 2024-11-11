import {
  useDeleteCompanyLogoQuery,
  useUploadCompanyLogo,
} from '@/api/companies/query-companies';
import { toast } from '@/hooks/use-toast';
import { useToggleState } from '@/hooks/use-toggle-state';
import { cn } from '@/lib/utils';
import { ComponentsGuard } from '@/routes/auth/ComponentsGuard';
import { Avatar } from '@radix-ui/react-avatar';
import { DownloadIcon, TrashIcon } from '@radix-ui/react-icons';
import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

type Props = {
  logoUrl: string | null;
  className?: string;
  companyId: number;
};
const fileTypes = ['JPEG', 'PNG', 'TFT'];

export const CompanyLogo: React.FC<Props> = ({
  logoUrl,
  className,
  companyId,
}) => {
  const { mutateAsync: addCompanyLogo, error: loadError } =
    useUploadCompanyLogo();
  const { mutateAsync: removeCompanyLogo } =
    useDeleteCompanyLogoQuery(companyId);

  const [isLoading, startLoading, finishLoading] = useToggleState();

  const loadImage = async (file: File) => {
    startLoading();
    try {
      await addCompanyLogo({ file, companyId });

      toast({
        title: 'Logo has been added',
      });

      finishLoading();
    } catch (error) {
      console.error();
      toast({
        title: 'Creation failed',
        description: `${loadError?.message}`,
        variant: 'destructive',
      });
      finishLoading();
      throw new Error(`Failed to create company: ${error}`);
    }
    finishLoading();
  };

  const deleteLogo = async () => {
    startLoading();
    try {
      await removeCompanyLogo(companyId);
      toast({
        title: 'Logo has been deleted',
      });

      finishLoading();
    } catch (error) {
      console.error();
      toast({
        title: 'Process failed',
        description: `${loadError?.message}`,
        variant: 'destructive',
      });
      finishLoading();
      throw new Error(`Failed to create company: ${error}`);
    }
    finishLoading();
  };

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {logoUrl ? (
        <div className="flex flex-col gap-2">
          <Avatar>
            <AvatarImage className="w-20 h-20" src={logoUrl} />
          </Avatar>
          <ComponentsGuard allowedRoles={['USER']}>
            <Button
              disabled={isLoading}
              onClick={deleteLogo}
              type="button"
              size={'sm'}
              variant={'destructive'}
            >
              <TrashIcon /> Delete
            </Button>
          </ComponentsGuard>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <ComponentsGuard allowedRoles={['USER']}>
            <div className={'flex items-center'}>
              <FileUploader
                className="flex items-center"
                handleChange={loadImage}
                disabled={isLoading}
                name={'attachments'}
                types={fileTypes}
              >
                <div className="bg-secondary w-16 h-16 rounded-full flex justify-center items-center">
                  <DownloadIcon className="h-10 w-10" />
                </div>
              </FileUploader>
            </div>
          </ComponentsGuard>
        </div>
      )}
    </div>
  );
};
