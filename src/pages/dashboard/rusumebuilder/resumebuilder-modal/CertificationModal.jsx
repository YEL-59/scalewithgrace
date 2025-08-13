import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

export default function CertificationModal({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData || {
      certificationName: "",
      issuingOrganization: "",
      dateEarned: "",
      expirationDate: "",
      credentialId: "",
      certificationURL: "",
      notes: "",
    },
  });

  // Reset form values whenever modal opens or initialData changes
  useEffect(() => {
    if (open) {
      reset(
        initialData || {
          certificationName: "",
          issuingOrganization: "",
          dateEarned: "",
          expirationDate: "",
          credentialId: "",
          certificationURL: "",
          notes: "",
        }
      );
    }
  }, [open, initialData, reset]);

  const onSubmit = (data) => {
    onSave(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Certification" : "Add Certification"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Your input fields remain the same */}
          <div>
            <label
              htmlFor="certificationName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Certification Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="certificationName"
              placeholder="e.g. Certified Public Accountant (CPA)"
              {...register("certificationName", { required: true })}
            />
          </div>
          {/* ... rest of your form inputs */}
          <div>
            <label
              htmlFor="issuingOrganization"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Issuing Organization <span className="text-red-500">*</span>
            </label>
            <Input
              id="issuingOrganization"
              placeholder="e.g. American Institute of CPAs"
              {...register("issuingOrganization", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="dateEarned"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date Earned <span className="text-red-500">*</span>
            </label>
            <Input
              id="dateEarned"
              type="month"
              {...register("dateEarned", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="expirationDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expiration Date (optional)
            </label>
            <Input
              id="expirationDate"
              type="month"
              {...register("expirationDate")}
            />
          </div>
          <div>
            <label
              htmlFor="credentialId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Credential ID / License Number
            </label>
            <Input
              id="credentialId"
              placeholder="Optional"
              {...register("credentialId")}
            />
          </div>
          <div>
            <label
              htmlFor="certificationURL"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Certification URL
            </label>
            <Input
              id="certificationURL"
              placeholder="Link to certification verification"
              {...register("certificationURL")}
            />
          </div>
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes / Description
            </label>
            <Textarea
              id="notes"
              placeholder="Additional details about your certification"
              rows={3}
              {...register("notes")}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
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
