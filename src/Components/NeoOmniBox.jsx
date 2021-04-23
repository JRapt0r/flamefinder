import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Downshift from "downshift";

import { Search } from "../Components/Icons";

function CourseResult({ CRSNBR, CRSSUBJCD, children }) {
  const code = `${CRSSUBJCD} ${CRSNBR}`.replace(/(<b>)|(<\/b>)/g, "");

  return (
    <Link to={`/course/${code}`}>
      {children}
    </Link>
  );
}

function NeoOmniBox({label = false, height = 1}) {
  const [items, setItems] = useState([]);
  const history = useHistory();

  const create_result = ({CRSSUBJCD, CRSNBR, CRSTITLE, CLASSTITLE}) => {
    const class_title = CLASSTITLE ? (CLASSTITLE !== CRSTITLE ? `(${CLASSTITLE})` : "") : "";
    return `${CRSSUBJCD} ${CRSNBR} ${CRSTITLE} ${class_title}`;
  }

  const query_values = (input) => {
    if (input?.trim()?.length < 2) {
      setItems([]);
      return;
    }

    const url = new URL(input.trim(), `${process.env.REACT_APP_SERVER_ENDPOINT}/search/`);

    fetch(url.toString())
    .then(r => r.json())
    .then(res => {
      if (res?.code) {
        setItems([]);
        return;
      }

      setItems(res);
    })
    .catch(err => {
      setItems([]);
      console.error(err);
    });
  }

  // Redirect to a given course
  const navigate_to = ({CRSSUBJCD, CRSNBR}) => {
    const cleaned = `${CRSSUBJCD} ${CRSNBR}`.replace(/(<b>)|(<\/b>)/g, ""); // clean FTS match highlight
    history.push(`/course/${cleaned}`);
  };

  return (
    <div className="flex flex-col">

      <Downshift onInputValueChange={inputValue => query_values(inputValue)} onChange={selection => navigate_to(selection)}
        itemToString={item => (item ? `${item.CRSSUBJCD} ${item.CRSNBR}` : '')} >
        {({ getInputProps, getItemProps, getLabelProps, getMenuProps, isOpen, inputValue, highlightedIndex, selectedItem, getRootProps, }) => (
          <div>
            {label && <label {...getLabelProps()}>Search courses:</label>}

            {/* Input */}
            <div {...getRootProps({}, { suppressRefError: true })} className={`flex items-center w-full px-3 py-2 bg-white border border-gray-300 ${isOpen && items.length ? "rounded-t" : "rounded"} shadow md:py-3`}>
              <button aria-label="Search courses" className="focus-within:outline-none">
                <div className="text-gray-500 hover:text-blue-700">
                  <Search size={20} />
                </div>
              </button>
              <input {...getInputProps()} className={`w-full py-${height} pl-4 font-medium outline-none focus:placeholder-blue-700 focus:outline-none`} type="search" placeholder="Search courses" />
            </div>

            {/* Results */}
            <ul className={`${isOpen && items.length ? 'rounded-b-lg border border-gray-300 shadow bg-white overflow-hidden' : 'hidden'}`} {...getMenuProps()}>
              {isOpen ?
                items?.map((item, index) => (
                  <CourseResult {...item} {...getItemProps({ key: `${item.CRSSUBJCD}${item.CRSNBR}${index}`, index, item })} key={`${item.CRSSUBJCD}${item.CRSNBR}${(index + 1) * -1}`}>
                    <li className={`cursor-pointer font-medium p-2 ${highlightedIndex === index ? 'bg-indigo-50 text-blue-800' : 'bg-transparent'}`}
                      {...getItemProps({ key: `${item.CRSSUBJCD}${item.CRSNBR}${index}`, index, item })}
                      dangerouslySetInnerHTML={{ __html: create_result(item) }}>
                    </li>
                  </CourseResult>
                ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    </div>
  );
}

export default NeoOmniBox;