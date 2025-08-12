import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InterestsModal({ open, onClose, onSave, initialData }) {
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: { interests: initialData || [{ name: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "interests",
  });

  useEffect(() => {
    reset({ interests: initialData || [{ name: "" }] });
  }, [initialData, reset]);

  const onSubmit = (data) => {
    // Filter out empty interest names
    const filtered = data.interests.filter((i) => i.name.trim() !== "");
    onSave(filtered);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Interests" : "Add Interests"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, idx) => (
            <div key={field.id} className="flex gap-2 items-center">
              <Input
                {...register(`interests.${idx}.name`)}
                placeholder={`Interest #${idx + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(idx)}
                className="text-red-600"
              >
                🗑
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: "" })}
          >
            + Add Interest
          </Button>

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
