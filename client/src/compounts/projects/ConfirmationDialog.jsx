
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';

const ConfirmationDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  description = "Are you sure you want to proceed?" 
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <DialogTitle className="text-lg font-semibold text-slate-800">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-slate-600 text-left">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
