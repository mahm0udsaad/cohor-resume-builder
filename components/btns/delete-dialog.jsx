import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastProvider } from "@/components/ui/toast";
import { deleteResume } from "@/actions/resumes";
import { useTranslation } from "@/app/i18n/client";

export function DeleteConfirmation({ lng, resumeId, email }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation(lng, "forms"); // Use the translation function

  const handleDelete = async () => {
    setIsLoading(true);
    // Simulate delete operation
    await deleteResume(resumeId, email);
    setIsLoading(false);
    setIsOpen(false);
    toast({
      variant: "success",
      title: t("successTitle"),
      description: t("deleteSuccessMessage"),
      duration: 3000,
    });
  };

  return (
    <ToastProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              {t("confirmDeletionTitle")}
            </DialogTitle>
            <DialogDescription>{t("confirmDeletionMessage")}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              {t("cancelButton")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                t("deleteButton")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toast />
    </ToastProvider>
  );
}
