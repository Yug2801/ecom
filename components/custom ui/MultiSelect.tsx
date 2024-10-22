"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  Badge,
  X,
} from "@/components/ui/command";
import { useState } from "react";

interface CollectionType {
  _id: string;
  title: string;
}

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections = [], // Default to an empty array if collections is undefined
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const selected = value.length > 0
    ? value.map((id) =>
        collections.find((collection) => collection._id === id)
      ).filter(Boolean) as CollectionType[] // filter out any undefined values
    : [];

  const selectables = collections.filter(
    (collection) => !selected.some((sel) => sel._id === collection._id)
  );

  const handleSelect = (id: string) => {
    onChange(id);
    setInputValue("");
    setOpen(false);
  };

  const handleRemove = (id: string) => {
    onRemove(id);
  };

  return (
    <div className="relative">
      <Command className="overflow-visible bg-white">
        <div className="flex gap-1 flex-wrap border rounded-md p-2">
          {selected.map((collection) => (
            <Badge key={collection._id} className="flex items-center gap-1">
              {collection.title}
              <button
                type="button"
                className="ml-1 hover:text-red-600"
                onClick={() => handleRemove(collection._id)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
          />
        </div>

        {open && selectables.length > 0 && (
          <div className="absolute w-full z-30 top-0 mt-1 overflow-auto border rounded-md shadow-md bg-white">
            <CommandGroup>
              {selectables.map((collection) => (
                <CommandItem
                  key={collection._id}
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => handleSelect(collection._id)}
                  className="hover:bg-gray-100 cursor-pointer p-2"
                >
                  {collection.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        )}
      </Command>
    </div>
  );
};

export default MultiSelect;
