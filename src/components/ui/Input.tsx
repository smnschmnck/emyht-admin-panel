interface InputProps {
  StartIcon?: React.ReactNode;
  value?: string;
  setValue?: (value: string) => void;
  name?: string;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  StartIcon,
  value,
  setValue,
  name,
  placeholder,
}) => (
  <div className="h-10 flex items-center gap-3 text-xs border bg-zinc-100 border-zinc-100 focus-within:border-blue-600 w-fit px-3 rounded-lg transition">
    {StartIcon && (
      <span className="w-4 h-4 text-gray-500 overflow-hidden">{StartIcon}</span>
    )}
    <input
      placeholder={placeholder}
      className="h-full bg-zinc-100 outline-none w-60 placeholder:text-zinc-500"
      value={value}
      onChange={setValue ? (e) => setValue(e.target.value) : undefined}
      name={name}
    />
  </div>
);
