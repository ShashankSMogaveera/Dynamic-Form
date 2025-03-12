interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: string[]; 
  error?: string;
}

const InputField = ({ label, type, name, value, onChange, options, error }: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold">{label}</label>

      {["text", "email", "tel","number"].includes(type) && (
        <input type={type} name={name} value={value} onChange={onChange} className="w-full border p-2 rounded-md" />
      )}


      {type === "dropdown" && options && (
        <select name={name} value={value} onChange={onChange} className="w-full border p-2 rounded-md">
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}


      {type === "radio" && options && (
        <div>
          {options.map((option) => (
            <label key={option} className="inline-flex items-center space-x-2 mr-4">
              <input type="radio" name={name} value={option} checked={value === option} onChange={onChange} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

  
      {type === "checkbox" && (
        <label className="inline-flex items-center space-x-2">
          <input type="checkbox" name={name} checked={value === "true"} onChange={onChange} />
          <span>{label}</span>
        </label>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
