import { Company } from '@/api/types';
import { ComponentsGuard } from '@/routes/auth/ComponentsGuard';
import { ImageIcon } from '@radix-ui/react-icons';
import { Trash2Icon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ScrollArea } from './ui/scroll-area';

type CompanyProps = {
  setCompanyId: React.Dispatch<React.SetStateAction<number | null>>;
  company: Company;
  setActive: () => void;
};

export const CompanyCard: React.FC<CompanyProps> = ({
  company,
  setActive,
  setCompanyId,
}) => {
  const { companyName, avatar, service, description, createdDate, id } =
    company;

  return (
    <div className="relative">
      <ComponentsGuard allowedRoles={['USER']}>
        <Button
          aria-label="delete company"
          variant={'ghost'}
          className="absolute right-1 top-1 z-50"
          onClick={() => {
            setActive();
            setCompanyId(id);
          }}
        >
          <Trash2Icon />
        </Button>
      </ComponentsGuard>
      <Link to={`${id}`}>
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <Avatar>
              {avatar ? (
                <AvatarImage src={avatar} />
              ) : (
                <AvatarFallback>
                  <ImageIcon />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-center">{companyName}</CardTitle>
              <CardDescription className="text-center">
                Main information about the company
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex justify-between mb-4">
                <p>service</p>
                <p>{service}</p>
              </div>
              <ScrollArea className="h-[100px]">{description}</ScrollArea>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-between">
              <p>founded</p>
              <data>{createdDate}</data>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};
