"use client";

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
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // Selected collections based on IDs in value
  const selected: CollectionType[] = value
    .map((id) => collections.find((collection) => collection._id === id))
    .filter((collection): collection is CollectionType => collection !== undefined);

  // Filter to get collections that haven't been selected yet
  const selectables = collections.filter(
    (collection) => !selected.find((sel) => sel._id === collection._id)
  );

  return (
    <div className="relative w-full max-w-md">
      <div className="flex flex-wrap gap-2 border p-2 rounded-md bg-gray-100">
        {selected.map((collection) => (
          <div
            key={collection._id}
            className="flex items-center bg-blue-100 px-2 py-1 rounded-md"
          >
            {collection.title}
            <button
              onClick={() => onRemove(collection._id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}

        <input
          className="flex-1 p-2 border rounded-md focus:outline-none"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
      </div>

      {open && selectables.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-md z-10 max-h-40 overflow-auto">
          {selectables
            .filter((collection) =>
              collection.title.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((collection) => (
              <li
                key={collection._id}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                onClick={() => {
                  onChange(collection._id);
                  setInputValue("");
                  setOpen(false);
                }}
              >
                {collection.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
