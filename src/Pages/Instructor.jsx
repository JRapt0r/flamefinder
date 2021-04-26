import { React, useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import SearchBox from "../Components/SearchBox";

import LoadingPlaceholder from "../Components/Placeholders/LoadingPlaceholder";
import { SmallExternalLink } from "../Components/Icons";

import construct_url from "../Helpers/construct_url";
import find_rmp from "../Helpers/find_rmp";
import GridPlaceholder from "../Components/Placeholders/GridPlaceholder";
import { create_course_cards } from "../Helpers/create_cards";

function Instructor() {
  const { instructorID } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);

  const [instData, setInstData] = useState(null);
  const [numClasses, setNumClasses] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const url = construct_url(`${process.env.REACT_APP_SERVER_ENDPOINT}/classes`, {
      'instructor': instructorID
    });

    fetch(url)
    .then(r => r.json())
    .then(res => {
      import("js-search").then(({ Search }) => {
        const index = new Search("index");
        index.addIndex("CRSTITLE");
        index.addIndex("CRSNBR");
        index.addIndex("CRSSUBJCD");

        index.addDocuments([...res.map((r, i) => ({ ...r, index: i }))]);

        setIndex(index);
        setData(res);
      })
      .catch(e2 => {
        console.error(e2);
        return history.push("/error/400");
      });

      setNumClasses(res.length);

      fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/instructor/${instructorID}`)
      .then(i => i.json())
      .then(instResp => {
        setInstData(instResp);
      })
      .catch(e3 => {
        console.error(e3);
        return history.push("/error/400");
      });
    })
    .catch(e1 => {
      console.error(e1);
      return history.push("/error/400");
    });
  }, [instructorID, pathname, history]);

  const search_classes = ({ target: { value } }) => {
    const input = value.trim();

    if (input.length < 2)
      setData(index._documents);
    else
      setData(index.search(input));
  }

  return (
    <div className="grid md:grid-cols-5 md:min-h-body">

      {/* Instructor metadata sidebar */}
      <div className="flex flex-col px-6 py-4 bg-white shadow-sm md:border-r-2 md:col-span-1">

        <div className="sticky top-4">

          <div className="flex flex-row items-center justify-between md:items-baseline md:flex-col">
            <div className="text-xl font-semibold md:text-2xl">
              {instructorID.split(", ").reverse().join(" ")}
            </div>

            <a className="flex flex-row items-center text-base font-semibold tracking-wider text-blue-700 hover:text-blue-800" target="_blank" rel="noreferrer" href={find_rmp(instructorID)}>
              RMP <SmallExternalLink size={18} />
            </a>
          </div>

          <div className="flex flex-row justify-between mt-4 md:space-y-2 md:flex-col">
            <div className="flex flex-col">
              <div className="text-sm text-gray-800">Classes taught</div>
              <div className="text-lg font-semibold">{numClasses ? numClasses : <LoadingPlaceholder length={2} placeholder="2" />}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-gray-800">Average GPA</div>
              <div className="text-lg font-semibold">{instData ? (instData.avg_gpa)?.toFixed(2) || "N/A" : <LoadingPlaceholder placeholder="4.00" length={1} />}</div>
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-gray-800">DFW rate</div>
              <div className="text-lg font-semibold">{instData ? <div>{instData.dfw_rate ? `${instData.dfw_rate?.toFixed(2)}%` : null || "N/A"}</div> : <LoadingPlaceholder placeholder="2" length={5} />}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes */}
      <div className="flex flex-col md:col-span-4">
        <SearchBox category="classes" filter={search_classes} />
        <div className="mt-2 mb-8 md:flex-row">
          {data ? create_course_cards(data) : <GridPlaceholder/>}
        </div>
      </div>

    </div>
  );
}

export default Instructor;