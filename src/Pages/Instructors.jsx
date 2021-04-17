import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Index from "../Components/NameIndex";

import SearchBox from "../Components/SearchBox";
import construct_url from "../Helpers/construct_url";

function Instructors() {
  const { letter } = useParams();
  const [data, setData] = useState(null);
  const [orig, setOrig] = useState(null);

  useEffect(() => {
    const curr_letter = letter ? letter : "A";
    const url = construct_url(`${process.env.REACT_APP_SERVER_ENDPOINT}/instructors/${curr_letter}`);

    fetch(url)
    .then(r => r.json())
    .then(res => {
      setData(res);
      setOrig(res);
    });

  }, [letter]);

  const search_instructors = ({ target: { value } }) => {
    const input = value.trim();
    const url = construct_url(`${process.env.REACT_APP_SERVER_ENDPOINT}/instructors/${input}`, {"search": 1});

    if (input.length > 2)
    {
      fetch(url)
      .then(r => r.json())
      .then(res => {
        if (res?.status) {
          setData([])
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
      <Index/>

      <div id="instructors">
        <div className="grid grid-flow-row grid-cols-2 gap-3 px-4 py-4 mx-2 mb-10 font-medium bg-white border border-gray-300 rounded-md shadow md:text-lg md:py-6 md:mx-6 sm:px-6 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5">
          {data ? data.length ? data.map(({PrimaryInstructor},i) => <div key={i}><Link to={`/instructor/${PrimaryInstructor}`}>{PrimaryInstructor}</Link></div>)
                              : <div>No instructors found</div> :
                <div className="min-h-body">Loading instructors...</div>}
        </div>
      </div>

    </div>
  );
}

export default Instructors;