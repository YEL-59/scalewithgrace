import { useFormContext, useWatch } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const YourDetails = () => {
  const methods = useFormContext(); // Use shared form context
  const values = useWatch({ control: methods.control });

  const onSubmit = (data) => {
    console.log("YourDetails submitted:", data);
  };

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
    >
      {/* Left Form */}
      <div className="space-y-4 bg-white rounded p-5 h-full">
        <h1 className="text-2xl font-bold">Contact Information</h1>
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            name="firstName"
            label="First Name*"
            placeholder="Nazmul"
          />
          <TextInput name="lastName" label="Last Name*" placeholder="Hasan" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            name="email"
            label="Email*"
            placeholder="example@mail.com"
          />
          <TextInput name="phone" label="Phone*" placeholder="88017724999675" />
        </div>

        <TextInput
          name="linkedin"
          label="LinkedIn"
          placeholder="linkedin.com/in/..."
        />
        <TextAreaInput
          name="summary"
          label="Summary"
          placeholder="About you..."
        />

        <div className="grid grid-cols-2 gap-4">
          <TextInput name="address" label="Address" placeholder="123 Street" />
          <TextInput name="city" label="City" placeholder="Sylhet" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextInput name="state" label="State" placeholder="Dhaka" />
          <TextInput
            name="website"
            label="Website"
            placeholder="www.example.com"
          />
        </div>

        <Button type="submit">Save</Button>
      </div>

      {/* Right Preview */}
      <div className="bg-white rounded p-5 h-full">
        <h1 className="text-2xl font-bold mb-4">Preview</h1>
        <PreviewSection values={values} />
      </div>
    </form>
  );
};

export default YourDetails;

// Reusable inputs
const TextInput = ({ name, label, placeholder }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const TextAreaInput = ({ name, label, placeholder }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const PreviewSection = ({ values }) => (
  <div className="border p-4 rounded shadow space-y-2 bg-white h-full">
    <p className="text-lg font-semibold">
      {values.firstName} {values.lastName}
    </p>
    <p className="text-gray-700">Web Designer</p>
    <p className="text-sm text-gray-600">
      {values.address}, {values.city}
    </p>

    <p className="mt-4 text-sm">
      <strong>Email:</strong> {values.email}
      <br />
      <strong>Phone:</strong> {values.phone}
    </p>

    <p className="mt-4 text-sm">
      <strong>LinkedIn:</strong> {values.linkedin}
    </p>

    <p className="mt-4 text-sm">
      <strong>Summary:</strong> <br />
      {values.summary}
    </p>

    <p className="mt-4 text-sm">
      <strong>Website:</strong> {values.website}
    </p>
  </div>
);
