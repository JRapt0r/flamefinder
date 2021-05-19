import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import GridPlaceholder from "../Components/Placeholders/GridPlaceholder";
import SearchBox from "../Components/SearchBox"

import construct_url from "../Helpers/construct_url";
import { create_course_cards } from "../Helpers/create_cards";

function Course() {
  const { courseID } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const [dpt, nbr] = courseID.split(" ");
    const url = construct_url(`${import.meta.env.VITE_SERVER_ENDPOINT}/classes`, {
      'department': dpt,
      'course_number': nbr
    });

    fetch(url).then(r => r.json()).then(res => {
      if (res?.code) {
        return history.push(`/error/${res.code}`);
      }
      else {
        import("js-search").then(({ Search }) => {
          const index = new Search("index");
          index.addIndex("PrimaryInstructor");
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
  }, [courseID, pathname, history]);

  const search_classes = ({ target: { value } }) => {
    const input = value.trim();

    if (input.length < 2)
      setData(index._documents);
    else
      setData(index.search(input));
  }

  return (
    <div className="pb-8">
      <SearchBox category="classes" filter={search_classes} />

      <div className="flex flex-col">
        <div className="mt-4 space-y-4 sm:flex-row">
          {data ? data.length === 0 ? <div className="my-4 text-2xl font-semibold text-center">No grades on record</div> :
          create_course_cards(data) : <GridPlaceholder offset={"156px"}/>}
        </div>
      </div>
    </div>
  );
}

export default Course;