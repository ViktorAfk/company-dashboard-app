import { Company } from '@/api/types';
import { ImageIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
  company: Company;
};
export const CompanyCard: React.FC<CompanyProps> = ({ company }) => {
  const { companyName, avatar, service, description, createdDate, id } =
    company;
  console.log(avatar);
  return (
    <Link to={`companies/${id}`}>
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
  );
};
