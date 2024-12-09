import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import DraftIcon from './Icons/DraftIcon';
import CheckIcon from './Icons/CheckIcon';

interface FormActionsProps {
  formId?: string;
  isLoading: boolean;
  onSaveDraft: () => Promise<void>;
  onPublish: () => Promise<void>;
}

const FormActions: React.FC<FormActionsProps> = ({
  formId,
  isLoading,
  onSaveDraft,
  onPublish,
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleDraftSave = async () => {
    try {
      await onSaveDraft();
      toast({
        title: "Success",
        description: "Form saved as draft",
        variant: "default",
      });
    //   router.push('/forms');
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to save draft",
        variant: "destructive",
      });
    }
  };

  const handlePublish = async () => {
    try {
      await onPublish();
      toast({
        title: "Success",
        description: "Form published successfully",
        variant: "default",
      });
      router.push('/forms');
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to publish form",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-between items-center p-4 sticky bottom-0 z-10 bg-background border-t">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDraftSave}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <DraftIcon />
        <span>Save as Draft</span>
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={handlePublish}
        disabled={isLoading || !formId}
        className="flex items-center gap-2"
      >
        <CheckIcon />
        <span>Publish form</span>
      </Button>
    </div>
  );
};

export default FormActions;