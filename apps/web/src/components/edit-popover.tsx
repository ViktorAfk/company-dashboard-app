import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type Props = {
  editForm: React.ReactNode;
  buttonText?: string;
  isOpen: boolean;
  setIsOpen: () => void;
  hasButtonTrigger?: boolean;
};

export const EditPopover: React.FC<Props> = ({
  editForm,
  // buttonText,
  isOpen,
  setIsOpen,
  // hasButtonTrigger = false,
}) => {
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger />
      <PopoverContent className="h-[400px] w-max p-10 overflow-y-auto">
        {editForm}
      </PopoverContent>
    </Popover>
  );
};
