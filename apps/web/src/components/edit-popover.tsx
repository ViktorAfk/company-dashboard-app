import React from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type Props = {
  editForm: React.ReactNode;
  buttonText: string;
  isOpen: boolean;
  setIsOpen: () => void;
  hasButtonTrigger?: boolean;
};

export const EditPopover: React.FC<Props> = ({
  editForm,
  buttonText,
  isOpen,
  setIsOpen,
  hasButtonTrigger = false,
}) => {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        {hasButtonTrigger && (
          <Button type="button" variant={'default'}>
            {buttonText}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="h-[400px] p-10 w-80 overflow-y-auto">
        {editForm}
      </PopoverContent>
    </Popover>
  );
};
