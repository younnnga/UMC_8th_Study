interface InputProps {
  value : string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder = "검색어를 입력하세요.",
  className,
}:InputProps) => {
  return (
    <input
      className={`w-full rounded-md border border-gray-500 p-2 shadow-sm 
      focus:border-blue-500 foucs:ring-blue-500 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e)=> onChange(e.target.value)}
      />
  );
};