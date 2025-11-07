import { useState } from "react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

interface TagInputProps {
  name?: string;
  id?: string;
  placeholder?: string;
  value: string[];
  onChange: (tags: string[]) => void;
}
const TagInput = ({
  value,
  onChange,
  name,
  id,
  placeholder,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };
  return (
    <div className="w-full">
      <div>
        {value.length > 0 ? (
          value.map((tag, index) => (
            <Badge key={index} className="mr-2 mb-2">
              {tag}
            </Badge>
          ))
        ) : (
          <span className="text-gray-500">No tags added</span>
        )}
      </div>
      <Input
        name={name}
        id={id}
        value={inputValue}
        placeholder={placeholder || "Type a tag and press Enter"}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="ring-0"
      />
    </div>
  );
};

export default TagInput;
