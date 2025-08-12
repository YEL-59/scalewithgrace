import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SocialLinksModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {
      linkedin: "",
      github: "",
      twitter: "",
      website: "",
    },
  });

  useEffect(() => {
    reset(
      initialData || { linkedin: "", github: "", twitter: "", website: "" }
    );
  }, [initialData, reset]);

  const onSubmit = (data) => {
    onSave(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Social Links" : "Add Social Links"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("linkedin")} placeholder="LinkedIn URL" />
          <Input {...register("github")} placeholder="GitHub URL" />
          <Input {...register("twitter")} placeholder="Twitter URL" />
          <Input {...register("website")} placeholder="Website URL" />

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
