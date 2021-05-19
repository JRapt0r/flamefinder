import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NameIndex from "../Components/NameIndex";

import SearchBox from "../Components/SearchBox";
import LoadingPlaceholder from "../Components/Placeholders/LoadingPlaceholder";
import construct_url from "../Helpers/construct_url";

function Instructors() {
  const { letter } = useParams();
  const [data, setData] = useState(null);
  const [orig, setOrig] = useState(null);

  const generate_placeholders = (num) => {
    let output = [];
    for (let i = 0; i < num; ++i) {
      output.push(<LoadingPlaceholder length={9} />);
    }
    return output;
  }

  useEffect(() => {
    const curr_letter = letter ? letter : "A";
    const url = construct_url(`${import.meta.env.VITE_SERVER_ENDPOINT}/instructors/${curr_letter}`);

    fetch(url)
    .then(r => r.json())
    .then(res => {
      setData(res);
      setOrig(res);
    });

  }, [letter]);

  const search_instructors = ({ target: { value } }) => {
    const input = value.trim();
    const url = construct_url(`${import.meta.env.VITE_SERVER_ENDPOINT}/instructors/${input}`, {"search": 1});

    if (input.length > 2)
    {
      fetch(url)
      .then(r => r.json())
      .then(res => {
        if (res?.code) {
          setData([]);
        }
        else {
          setData(res);
        }
      });
    }
    else {
      setData(orig);
    }
  }

  return (
    <div className="flex flex-col">
      <SearchBox category="instructors" filter={search_instructors} />
      <NameIndex/>

      <div id="instructors">
        <div className="grid grid-flow-row grid-cols-2 gap-3 px-4 py-4 mb-10 font-medium bg-white border-t border-b border-gray-300 shadow md:rounded-md md:border md:text-lg md:py-6 md:mx-6 sm:px-6 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5">
          {
            data
            ?
            data.length
              ?
                data.map(({PrimaryInstructor},i) => <div key={i}><Link to={`/instructor/${PrimaryInstructor}`}>{PrimaryInstructor}</Link></div>)
              :
                <div>No instructors found</div>
            :
            generate_placeholders(134).map((elem,i) => <div key={i}>{elem}</div>)
          }
        </div>
      </div>

    </div>
  );
}

export default Instructors;