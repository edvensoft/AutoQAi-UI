// MultiSelect.tsx
import { Combobox } from '@headlessui/react';
import { useState } from 'react';

type Option = {
  id: number;
  name: string;
};

const options: Option[] = [
  { id: 1, name: 'React' },
  { id: 2, name: 'Vue' },
  { id: 3, name: 'Angular' },
  { id: 4, name: 'Svelte' },
];

export default function MultiSelect() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [query, setQuery] = useState('');

  const filteredOptions = options.filter(
    (opt) =>
      opt.name.toLowerCase().includes(query.toLowerCase()) &&
      !selectedOptions.find((s) => s.id === opt.id)
  );

  const handleSelect = (option: Option) => {
    setSelectedOptions([...selectedOptions, option]);
  };

  const handleRemove = (id: number) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt.id !== id));
  };

  return (
    <div className="w-72">
      <Combobox value={null} onChange={handleSelect}>
        <div className="relative">
          <div className="flex flex-wrap gap-1 mb-1">
            {selectedOptions.map((opt) => (
              <span
                key={opt.id}
                className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded flex items-center"
              >
                {opt.name}
                <button
                  className="ml-1 text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(opt.id)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <Combobox.Input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          />

          {filteredOptions.length > 0 && (
            <Combobox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
              {filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    `px-4 py-2 cursor-pointer ${
                      active ? 'bg-blue-500 text-white' : ''
                    }`
                  }
                >
                  {option.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
}
