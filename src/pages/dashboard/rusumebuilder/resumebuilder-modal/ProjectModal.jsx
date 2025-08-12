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
import { Textarea } from "@/components/ui/textarea";

export default function ProjectModal({ open, onClose, onSave, initialData }) {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      url: "",
      points: [{ value: "" }],
    },
  });

  // Reset form when initialData or open changes
  useEffect(() => {
    if (initialData) {
      // Ensure points exists and is in proper format
      const points = initialData.points?.map((p) =>
        typeof p === "string" ? { value: p } : p
      ) || [{ value: "" }];
      reset({ ...initialData, points });
    } else {
      reset({
        name: "",
        description: "",
        url: "",
        points: [{ value: "" }],
      });
    }
  }, [initialData, open, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "points",
  });

  const onSubmit = (data) => {
    const formatted = {
      ...data,
      points: data.points.map((p) => p.value).filter(Boolean),
    };
    onSave(formatted);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Project Name*"
            {...register("name", { required: true })}
          />
          <Textarea
            placeholder="Description*"
            {...register("description", { required: true })}
          />
          <Input placeholder="URL (optional)" {...register("url")} />

          {/* Dynamic points list */}
          <div className="space-y-2">
            <p className="font-semibold">Project Highlights / Features</p>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Textarea
                  placeholder={`Point ${index + 1}`}
                  {...register(`points.${index}.value`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                  aria-label={`Remove point ${index + 1}`}
                >
                  🗑
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ value: "" })}
            >
              + Add Point
            </Button>
          </div>

          <div className="flex justify-end gap-2">
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
