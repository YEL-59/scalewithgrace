import { useForm, useFormContext, useWatch } from "react-hook-form";
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
  const methods = useFormContext();
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
      <div className="space-y-4 bg-white rounded p-6 h-full">
        <h1 className="text-2xl font-bold mb-6">Contact Information</h1>
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
        <TextInput name="title" label="Title" placeholder="Web Developer" />

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

        {values.summary && (
          <p className="text-xs text-gray-500 italic">AI generated summary</p>
        )}

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
      <div className="rounded p-2 h-full">
        <h1 className="text-2xl font-medium mb-4 font-poppins">Preview</h1>
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

const PreviewSection = () => {
  const { setValue, getValues } = useFormContext();
  const values = getValues();
  return (
    <div className="bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="flex mb-8">
        <div className="w-40">
          <h3 className="text-base font-semibold text-gray-900 tracking-wide font-trirong">
            Summary
          </h3>
        </div>
        <div>
          <h1
            className="text-3xl font-bold text-gray-900 mb-2 font-trirong outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const fullName = e.currentTarget.innerText.trim();
              const [first = "", ...rest] = fullName.split(" ");
              const last = rest.join(" ");
              setValue("firstName", first, { shouldDirty: true });
              setValue("lastName", last, { shouldDirty: true });
            }}
          >
            {(values.firstName || "Fred") + " " + (values.lastName || "Lynch")}
          </h1>

          <p
            className="text-gray-600 text-lg font-poppins"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              const title = e.currentTarget.innerText;
              setValue("title", title);
            }}
          >
            {values.title || "Web Developer"}
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide font-poppins">
              Contacts
            </h3>
          </div>
          <div className="flex-1">
            <div className="space-y-1 text-sm text-[#212121] font-poppins">
              <p>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => {
                    const address = e.currentTarget.innerText;
                    setValue("address", address);
                  }}
                >
                  {values.address || "2207 Beach"},
                </span>
                <span
                  contentEditable
                  suppressHydrationWarning
                  onInput={(e) => {
                    const city = e.currentTarget.innerText;
                    setValue("city", city);
                  }}
                >
                  {values.city || "Avenue"},
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => {
                    const state = e.currentTarget.innerText;
                    setValue("state", state);
                  }}
                >
                  {values.state || "Los Angeles"}
                </span>
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => {
                  const email = e.currentTarget.innerText;
                  setValue("email", email);
                }}
              >
                {values.email || "fredlynch@mail.me"}
              </p>
              <p
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => {
                  const phone = e.currentTarget.innerText;
                  setValue("phone", phone);
                }}
              >
                {values.phone || "(914) 479-6342"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900  tracking-wide font-poppins">
              Profile
            </h3>
          </div>
          <div className="flex-1">
            <p
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => {
                const summary = e.currentTarget.innerText;
                setValue("summary", summary);
              }}
              className="text-sm text-[#212121] leading-relaxed font-poppins"
            >
              {values.summary ||
                "Graphic designer with +8 years of experience in branding and print design. Skilled at Adobe Creative Suite (Photoshop, Illustrator, InDesign) as print design, logo design, packaging design and typography concepts."}
            </p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 font-poppins tracking-wide">
              Education
            </h3>
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-medium text-gray-900 font-poppins">
                  2005 – 2007 — Los Angeles University
                </h4>
                <span className="text-xs text-gray-500 font-poppins">
                  Los Angeles
                </span>
              </div>
              <p className="text-sm text-gray-700  font-poppins">
                Master of Graphic Design
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Employment */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 font-poppins tracking-wide">
              Employment
            </h3>
          </div>
          <div className=" space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-medium text-gray-900 font-poppins">
                  2005 – 2007 — UI Designer at Market Studios
                </h4>
                <span className="text-xs text-gray-500 font-poppins">
                  New York
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-poppins">
                Successfully translated subject matter into concrete design for
                newsletters, promotional materials and sales collateral. Created
                design theme and graphics for marketing and sales presentations,
                training videos and corporate websites.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-medium text-gray-900 font-poppins">
                  2007 – 2009 — Graphic Designer at FireWeb
                </h4>
                <span className="text-xs text-gray-500 font-poppins">
                  Los Angeles
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-poppins">
                Created new design themes for marketing and collateral
                materials. Collaborated with creative team to design and produce
                computer-generated artwork for marketing and promotional
                materials.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 font-poppins tracking-wide">
              Soft Skills
            </h3>
          </div>
          <div className="">
            <div className="grid grid-cols-2 gap-8">
              <ul className="space-y-1">
                <li className="text-sm text-gray-700 font-poppins">
                  • Communication
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Time management
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Teamwork
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Creativity
                </li>
              </ul>
              <ul className="space-y-1">
                <li className="text-sm text-gray-700 font-poppins">
                  • Attention to details
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Desire to learn
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Meeting deadlines
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="mb-8">
        <div className="flex items-start">
          <div className="w-40 flex-shrink-0">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide font-poppins">
              Technical Skills
            </h3>
          </div>
          <div className="">
            <div className="grid grid-cols-2 gap-8">
              <ul className="space-y-1">
                <li className="text-sm text-gray-700 font-poppins">• Figma</li>
                <li className="text-sm text-gray-700 font-poppins">• Sketch</li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Adobe Photoshop
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Adobe Illustrator
                </li>
              </ul>
              <ul className="space-y-1">
                <li className="text-sm text-gray-700 font-poppins">
                  • Web Design (HTML/CSS)
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Premiere Pro
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • After Effects
                </li>
                <li className="text-sm text-gray-700 font-poppins">
                  • Photography
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
