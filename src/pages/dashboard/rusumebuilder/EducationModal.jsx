import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EducationModal = ({ open, onClose, onSave, initialData }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset(); // clear form when adding new
    }
  }, [initialData, reset, open]);

  const handleFormSubmit = (data) => {
    onSave(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Education" : "Add Education"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input
            {...register("institution")}
            placeholder="Institution Name"
            required
          />
          <Input
            {...register("degree")}
            placeholder="Degree / Program"
            required
          />
          <Input
            {...register("location")}
            placeholder="Location (e.g., Dhaka)"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              {...register("startDate")}
              placeholder="Start Year (e.g., 2020)"
              required
            />
            <Input
              {...register("endDate")}
              placeholder="End Year (e.g., 2024)"
              required
            />
          </div>
          <Textarea
            {...register("description")}
            placeholder="Optional description or achievements"
          />

          <DialogFooter>
            <Button type="submit" className="w-full">
              {initialData ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EducationModal;
