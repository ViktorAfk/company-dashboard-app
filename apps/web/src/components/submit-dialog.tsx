import React from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
type Props = {
  setIsActive: () => void;
  isActive: boolean;
  message: string;
  removeValue: () => void;
};
export const SubmitDialog: React.FC<Props> = ({
  message,
  setIsActive,
  isActive,
  removeValue,
}) => {
  return (
    <Dialog open={isActive} onOpenChange={setIsActive}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            {`This action cannot be undone. This will permanently delete ${message} and remove all current data from our servers.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={() => removeValue()}>
            Confirm
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
