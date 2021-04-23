import React, { useEffect, useState } from "react";
import { useCombobox, useMultipleSelection } from "downshift";

import { CloseIcon } from "../Components/Icons";
import construct_url from "../Helpers/construct_url";

function MultiSelect({callback, label}) {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const query_values = (query) => {
    if (!query) {
      setResults([]);
      return [];
    }

    if (query && query?.trim()?.length < 2) {
      setResults([]);
      return [];
    }

    const url = construct_url(`${process.env.REACT_APP_SERVER_ENDPOINT}/instructors/${query}`, { search: 1, limit: 10 });

    fetch(url)
    .then(r => r.json())
    .then(res => {
      if (res?.code) {
        alert(JSON.stringify(res));
        return;
      }

      setResults(res);
      return res;
    })
    .catch(err => {
      setResults([]);
      console.error(err);
    });
  }

  useEffect(() => {
    query_values(inputValue);
  }, [inputValue])

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: [] });

  const getFilteredItems = () => {
    return results;
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    inputValue,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    items: getFilteredItems(), // run after selection
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: false, // close menu open after selection.
          }
      }
      return changes
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);
          break
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue("");
            if (!selectedItems.includes(selectedItem.PrimaryInstructor))
              addSelectedItem(selectedItem.PrimaryInstructor);
          }
          break
        default:
          break
      }
    },
  });

  // Fetch data when selectedItems change
  useEffect(() => {
    const recent = selectedItems[selectedItems.length - 1];
    const url = construct_url(`${process.env.REACT_APP_SERVER_ENDPOINT}/instructor/${recent}`, {compare: 1});

    if (recent?.length > 0)
    {
      fetch(url.toString())
      .then(r => r.json())
      .then(res => {
        if (res?.code) {
          alert(JSON.stringify(res));
          return;
        }

        setSelected([...selected, res]);
      })
      .catch(err => {
        console.error(err);
      });
    }
  }, [selectedItems]);

  useEffect(() => {
    callback(selected);
  }, [selected]);

  return (
    <div className="flex flex-col">
      {label && <label {...getLabelProps()}>{label}</label>}
      {/* Searchbox */}
      <div {...getComboboxProps()} className={`flex items-center w-full px-3 py-2 bg-white border border-gray-300 ${isOpen && results.length ? "rounded-t" : "rounded"} shadow md:py-3`}>
        <button aria-label="Search courses" className="focus-within:outline-none">
          <div className="text-gray-500 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" height={20} width={20}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </button>
        <input className="w-full pl-4 font-medium outline-none focus:placeholder-blue-700 focus:outline-none" type="search" placeholder="Search instructors"
          {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }),)}
        />
      </div>
      {/* Search results */}
      <ul className={`${isOpen && results.length ? 'rounded-b-lg border border-gray-300 shadow bg-white overflow-hidden' : 'hidden'}`} {...getMenuProps()} >
        {isOpen &&
          results?.map((item, index) => (
            <li className={`cursor-pointer font-medium p-2 ${highlightedIndex === index ? 'bg-indigo-50 text-blue-800' : 'bg-transparent'}`}
              key={`${item}${index}`} {...getItemProps({ item, index })}>
              {item?.PrimaryInstructor?.split(", ").reverse().join(" ")}
            </li>
          ))}
      </ul>
      {/* Selected items */}
      <div className="flex flex-row flex-wrap mt-4">
        {selectedItems.map((selectedItem, index) => (
          <div className="flex rounded-lg flex-row m-1 items-center px-2 py-0.5 font-medium text-blue-700 bg-transparent ring-1 ring-blue-700"
            key={`selected-item-${index}`} {...getSelectedItemProps({ selectedItem, index })}>
            <div className="mr-1">{selectedItem}</div>
            <div className="cursor-pointer" onClick={e => { e.stopPropagation(); removeSelectedItem(selectedItem) }}><CloseIcon size={18} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default MultiSelect;