import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import SearchBox from "../Components/SearchBox"
import GridPlaceholder from "../Components/Placeholders/GridPlaceholder";
import { create_dept_cards } from "../Helpers/create_cards";

function  Courses() {
  const { department } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`${import.meta.env.VITE_SERVER_ENDPOINT}/department/${department}`)
    .then(r => r.json()).then(res => {
      if (res?.code) {
        return history.push(`/error/${res.code}`);
      }
      else {
        import("js-search").then(({ Search }) => {
          const index = new Search("index");
          index.addIndex("CRSSUBJCD");
          index.addIndex("CRSNBR");
          index.addIndex("CRSTITLE");

          index.addDocuments([...res.map((r, i) => ({ ...r, index: i }))]);

          setIndex(index);
          setData(res);
        })
        .catch(e2 => {
          console.error(e2);
          return history.push("/error/400");
        });
      }
    })
    .catch(e1 => {
      console.error(e1);
      return history.push("/error/400");
    });
  }, [department, pathname, history]);

  const search_courses = ({ target: { value } }) => {
    const input = value.trim();

    if (input.length < 2)
      setData(index._documents);
    else
      setData(index.search(input));
  }

  return (
    <div className="pb-8">
      <SearchBox category="courses" filter={search_courses} />

      <div className="flex flex-col">
        <div className="mt-4 space-y-4 sm:flex-row">
          {data ? create_dept_cards(data) : <GridPlaceholder offset={"156px"}/>}
        </div>
      </div>
    </div>
  );
}

export default Courses;