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

    let url;

    if (label === "instructors") {
      url = construct_url(`${import.meta.env.VITE_SERVER_ENDPOINT}/instructors/${query.trim()}`, { search: 1, limit: 10 });
    }
    else if (label === "courses") {
      url = new URL(query.trim(), `${import.meta.env.VITE_SERVER_ENDPOINT}/search/`);
    }
    else {
      console.error("Invalid label");
      return;
    }

    fetch(url)
    .then(r => r.json())
    .then(res => {
      if (res?.code) {
        console.error(res);
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

  // Removes SQL match highlight
  const clean_html = (s) => {
    return s?.replace(/<\/{0,1}b>/ig,"");
  }

  const {
    isOpen,
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
        default:
          break;
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

            if (label === "instructors") {
              if (!selectedItems.includes(selectedItem.PrimaryInstructor)) {
                addSelectedItem(selectedItem.PrimaryInstructor);
                add_item(selectedItem);
              }
            }
            else if (label === "courses") {
              const code = clean_html(`${selectedItem.CRSSUBJCD} ${selectedItem.CRSNBR}`);

              if ( !selectedItems.includes(code) ) {
                addSelectedItem(code);
                add_item(selectedItem);
              }
            }
          }
          break
        default:
          break
      }
    },
  });

  const create_result = ({CRSSUBJCD, CRSNBR, CRSTITLE, CLASSTITLE}) => {
    const class_title = CLASSTITLE ? (CLASSTITLE !== CRSTITLE ? `(${CLASSTITLE})` : "") : "";
    return `${CRSSUBJCD} ${CRSNBR} ${CRSTITLE} ${class_title}`;
  }

  const remove_item = (item) => {
    setSelected(
      selected.filter(({CRSSUBJCD, CRSNBR, PrimaryInstructor}) => {
        if (PrimaryInstructor) {
          return item !== PrimaryInstructor;
        }
        else {
          return item !== `${CRSSUBJCD} ${CRSNBR}`;
        }
      })
    );
  }

  const add_item = (d) => {
    let url;

    if (label === "instructors") {
      url = construct_url(`${import.meta.env.VITE_SERVER_ENDPOINT}/instructor/${d.PrimaryInstructor}`, { compare: 1 });
    }
    else if (label === "courses") {
      url = construct_url(`${import.meta.env.VITE_SERVER_ENDPOINT}/course_overview`,
      { "CRSSUBJCD": clean_html(d.CRSSUBJCD), "CRSNBR": clean_html(d.CRSNBR) });
    }

    fetch(url.toString())
    .then(r => r.json())
    .then(res => {
      if (res?.code) {
        alert("No grade data on record for selected course");
        return;
      }

      setSelected([...selected, res]);
    })
    .catch(err => {
      console.error(err);
    });
  }

  useEffect(() => {
    callback(selected);
  }, [selected]);

  return (
    <div className="flex flex-col">
      {/* Searchbox */}
      <div {...getComboboxProps()} className={`flex items-center w-full px-3 py-2 bg-white border border-gray-300 ${isOpen && results.length ? "rounded-t" : "rounded"} shadow md:py-3`}>
        <button aria-label="Search courses" className="focus-within:outline-none">
          <div className="text-gray-500 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" height={20} width={20}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </button>
        <label className="sr-only" {...getLabelProps()}>Search ${label}:</label>
        <input className="w-full pl-4 font-medium outline-none focus:placeholder-blue-700 focus:outline-none" type="search" placeholder={`Search ${label}`}
          {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }),)}
        />
      </div>
      {/* Search results */}
      <ul className={`${isOpen && results.length ? 'rounded-b-lg border border-gray-300 shadow bg-white overflow-hidden' : 'hidden'}`} {...getMenuProps()} >
        {isOpen &&
          results?.map((item, index) => {
            if (label === "instructors")
              return (
                <li className={`cursor-pointer font-medium p-2 ${highlightedIndex === index ? 'bg-indigo-50 text-blue-800' : 'bg-transparent'}`}
                  key={`${item}${index}`} {...getItemProps({ item, index })}>
                  {item?.PrimaryInstructor}
                </li>
              );
            else if (label === "courses")
              return (
                <div {...getItemProps({ key: `${item.CRSSUBJCD}${item.CRSNBR}${index}`, index, item })} key={`${item.CRSSUBJCD}${item.CRSNBR}${(index + 1) * -1}`}>
                  <li className={`cursor-pointer font-medium p-2 ${highlightedIndex === index ? 'bg-indigo-50 text-blue-800' : 'bg-transparent'}`}
                    {...getItemProps({ key: `${item.CRSSUBJCD}${item.CRSNBR}${index}`, index, item })}
                    dangerouslySetInnerHTML={{ __html: create_result(item) }}>
                  </li>
                </div>
              );
          })
        }
      </ul>
      {/* Selected items */}
      <div className="flex flex-row flex-wrap mt-4">
        {selectedItems.map((selectedItem, index) => (
          <div className="flex rounded-lg flex-row m-1 items-center px-2 py-0.5 font-medium text-blue-700 bg-white ring-1 ring-blue-700"
            key={`selected-item-${index}`} {...getSelectedItemProps({ selectedItem, index })}>
            <div className="mr-1">{selectedItem}</div>
            <div className="cursor-pointer" onClick={e => { e.stopPropagation(); removeSelectedItem(selectedItem); remove_item(selectedItem); }}><CloseIcon size={18} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default MultiSelect;