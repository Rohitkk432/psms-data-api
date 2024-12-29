import React, { useState, useEffect, useRef, useMemo } from "react";
import cn from "classnames";
import {
  ChevronUpDownIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface DropdownProps {
  className?: string;
  selectClassName?: string;
  // eslint-disable-next-line
  options: any[];
  // eslint-disable-next-line
  selected: any;
  // eslint-disable-next-line
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  selectMultiple?: boolean;
  dataKey?: string;
  dropdownHeight?: string;
  selectPlaceholder?: string;
  disabled?: boolean;
  maximumSelect?: number;
  wrapOptions?:boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  selectClassName,
  options,
  selected,
  setSelected,
  dropdownHeight,
  dataKey,
  selectPlaceholder,
  selectMultiple = false,
  disabled = false,
  maximumSelect = 0,
  wrapOptions = false
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown element
  const inputRef = useRef<HTMLInputElement>(null); // Declare inputRef

  // Close the dropdown when clicking outside
  useEffect(() => {
    if (disabled === true) {
      setOpen(false);
    } else {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      // Attach the event listener when the component mounts
      document.addEventListener("click", handleClickOutside);

      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [dropdownRef, disabled]);

  const showDropdown = useMemo(() => {
    if (!Array.isArray(selected)) return options;
    return options.filter((opt) => {
      if (
        (search === "" || opt.toLowerCase().includes(search.toLowerCase())) &&
        !selected.includes(opt)
      ) {
        return opt;
      }
    });
  }, [search, selected, options]);

  useEffect(() => {
    if (showDropdown.length === 0 && search === "") {
      setOpen(false);
    }
  }, [showDropdown]);

  useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open]);

  const handleMutipleAdd = (item: string) => {
    if(maximumSelect===0){
      setSelected([...selected, item]);
    }else{
      const _selectedFinal = [...selected, item];
      setSelected(_selectedFinal.slice(-maximumSelect));
    }
  };

  const handleMultipleRemove = (item: string) => {
    setSelected(
      selected.filter((selectedItem: string) => selectedItem !== item),
    );
    inputRef.current?.focus(); // Focus the input after removing an item
  };

  const handleSelect = (
    event: React.MouseEvent<HTMLDivElement>,
    opt: string,
  ) => {
    event.stopPropagation();
    if (selectMultiple) {
      handleMutipleAdd(opt);
      setSearch("");
    } else {
      setSelected(opt);
      setOpen(false);
    }
  };

  return (
    <>
      <div
        ref={dropdownRef}
        className={cn(
          `relative text-base lg:text-lg  disable-text-select flex flex-col`,
          className,
        )}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (disabled === true) return;
            if (open && selectMultiple) return;
            if (showDropdown.length === 0) return;
            if (!open && selectMultiple) {
              console.log("Focusing input"); // Debug log
              setTimeout(() => {
                inputRef.current?.focus(); // Focus the input after a short delay
              }, 0);
            }
            setOpen(!open);
          }}
          className={cn(
            `px-2 py-3 bg-white border-2 ${open ? "border-[#1c1c1c]" : selected !== "" && selected !== undefined && selected !== null ? "border-primary-500" : "border-gray-400"} flex justify-between items-center rounded-lg ${disabled ? "cursor-not-allowed" : ""}`,
            selectClassName,
          )}
        >
          {!selectMultiple && (
            <div className="px-4">
              {selected !== "" && selected !== undefined && selected !== null
                ? dataKey !== undefined
                  ? selected[dataKey]
                  : selected
                : selectPlaceholder !== undefined
                  ? selectPlaceholder
                  : "Select Option"}
            </div>
          )}
          {selectMultiple && (
            <div className="px-4 flex items-center gap-3 flex-wrap">
              {Array.isArray(selected) &&
                selected.map((item: string, idx: number) => {
                  return (
                    <div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMultipleRemove(item);
                      }}
                      className="flex items-center gap-2.5 px-3 py-1 bg-white border border-[#E2E2E2] 
                  shadow-[0px_2px_4px_0px_#1C1C1E14] text-base text-[#1C1C1E] rounded-lg"
                    >
                      <div>{item}</div>
                      <XMarkIcon className="w-4 h-4 text-[#7F7F80]" />
                    </div>
                  );
                })}
              {open && (
                <input
                  ref={inputRef} // Attach the ref to the input
                  placeholder={"search"}
                  type="text"
                  className="text-base clear-input-style text-[#1c1c1c]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              )}
              {!open && showDropdown.length > 0 && (
                <div
                  className="text-base text-[#7F7F80]"
                >
                  search
                </div>
              )}
            </div>
          )}
          <ChevronUpDownIcon className="w-5 h-5 shrink-0" />
        </div>
        <div
          className={`absolute text-[#1c1c1c] w-full px-2 max-h-[16rem] h-fit overflow-scroll top-[110%] z-[200] bg-white flex-col items-center shadow-lg border border-gray-100 rounded-lg ${open ? "flex" : "hidden"}`}
          style={dropdownHeight ? { maxHeight: dropdownHeight } : {}}
        >
          {showDropdown.map((opt, idx) => {
            return (
              <div
                key={idx}
                onClick={(e) => handleSelect(e, opt)}
                className={cn(`py-3 px-4 w-full flex items-center justify-between gap-2 ${idx !== 0 ? "border-t border-gray-300" : ""}`,{
                  "text-center whitespace-pre":!wrapOptions,
                  "whitespace-wrap":wrapOptions,
                })}
              >
                <div className="">
                  {dataKey !== undefined ? opt[dataKey] : opt}
                </div>
                {JSON.stringify(selected) === JSON.stringify(opt) ? (
                  <CheckIcon className="w-5 h-5 text-primary-500" />
                ) : (
                  <div className="w-5 h-5"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
