import { Input } from "@/components/ui/input";

const PersonalInfoForm = ({ form, setForm }) => {
  const fields = [
    { key: "full_name", placeholder: "Your Full Name" },
    { key: "title", placeholder: "Your Job Title" },
    { key: "email", placeholder: "Email", type: "email" },
    { key: "phone", placeholder: "Phone Number", type: "tel" },
    { key: "company", placeholder: "Company Name" },
    { key: "companyAddress", placeholder: "Company Address" },
    { key: "hiringManager", placeholder: "Hiring Manager's Name (optional)" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {fields.map((field) => (
        <Input
          key={field.key}
          placeholder={field.placeholder}
          type={field.type || "text"}
          value={form[field.key]}
          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
        />
      ))}
    </div>
  );
};

export default PersonalInfoForm;
