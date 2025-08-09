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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect } from "react";

export default function ExperienceModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: initialData || {
      title: "",
      company: "",
      location: "",
      jobType: "",
      startDate: "",
      endDate: "",
      technologies: "",
      points: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "points",
  });

  // Reset form values when modal opens or initialData changes
  useEffect(() => {
    if (open) {
      reset(
        initialData || {
          title: "",
          company: "",
          location: "",
          jobType: "",
          startDate: "",
          endDate: "",
          technologies: "",
          points: [{ value: "" }],
        }
      );
      // Also set Select value explicitly, because controlled component
      if (initialData?.jobType) {
        setValue("jobType", initialData.jobType);
      }
    }
  }, [open, initialData, reset, setValue]);

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
            {initialData ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Job Title*"
            {...register("title", { required: true })}
          />
          <Input
            placeholder="Company Name*"
            {...register("company", { required: true })}
          />
          <Input
            placeholder="Location*"
            {...register("location", { required: true })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Start Date (e.g. Jan 2023)"
              {...register("startDate")}
            />
            <Input
              placeholder="End Date (e.g. Present)"
              {...register("endDate")}
            />
          </div>

          <Select
            defaultValue={initialData?.jobType}
            onValueChange={(val) => setValue("jobType", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Technologies Used (e.g. React, Node.js, Docker)"
            {...register("technologies")}
          />

          <div className="space-y-2">
            <p className="font-semibold">Responsibilities / Achievements</p>
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
