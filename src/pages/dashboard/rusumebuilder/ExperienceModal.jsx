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

export default function ExperienceModal({ open, onClose, onSave }) {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      date: "",
      points: [{ value: "" }],
    },
  });

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
          <DialogTitle>Add Experience</DialogTitle>
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
          <Input
            placeholder="Time Period (e.g. 2024 - Present)*"
            {...register("date", { required: true })}
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
