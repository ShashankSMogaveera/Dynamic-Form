interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }
  
  const InputField = ({ label, type, name, value, onChange, error }: InputFieldProps) => {
    return (
      <div className="mb-4">
        <label className="block font-semibold">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border p-2 rounded-md"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  };
  
  export default InputField;
  