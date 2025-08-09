import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function SkillCategoryModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const { register, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: initialData || {
      title: "",
      description: "",
      badges: [{ name: "", level: "Intermediate" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "badges",
  });

  React.useEffect(() => {
    reset(
      initialData || {
        title: "",
        description: "",
        badges: [{ name: "", level: "Intermediate" }],
      }
    );
  }, [initialData, reset]);

  const onSubmit = (data) => {
    // Filter out empty badge names
    const filteredBadges = data.badges.filter(
      (badge) => badge.name.trim() !== ""
    );
    onSave({ ...data, badges: filteredBadges });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Skill Category" : "Add Skill Category"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Category Title*"
            {...register("title", { required: true })}
          />

          <Textarea
            placeholder="Category Description (optional)"
            {...register("description")}
          />

          <div className="space-y-2">
            <p className="font-semibold">Badges / Skills</p>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input
                  placeholder={`Skill #${index + 1} Name`}
                  {...register(`badges.${index}.name`)}
                />
                <Select
                  defaultValue={field.level}
                  onValueChange={(val) =>
                    setValue(`badges.${index}.level`, val)
                  }
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                  className="text-red-600"
                >
                  🗑
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ name: "", level: "Intermediate" })}
            >
              + Add Skill
            </Button>
          </div>

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
