import React, { useState } from "react";
import { Omnibox, InstructorResult } from "./Omnibox";
import construct_url from "../Helpers/construct_url";
import { Link } from "react-router-dom";

function InstructorSelect({ onSelect }) {
  const [instructor, setInstructor] = useState(null);
  const [instructorData, setInstructorData] = useState(null);
  const [results, setResults] = useState([]);

  const normalize = (input) => {
    const total = (input.A + input.B + input.C + input.D + input.F + input.W);
    const to_return = {
      A: Math.round((input.A / total) * 100),
      B: Math.round((input.B / total) * 100),
      C: Math.round((input.C / total) * 100),
      D: Math.round((input.D / total) * 100),
      F: Math.round((input.F / total) * 100),
      W: Math.round((input.W / total) * 100),
    };
    return to_return;
  }

  const search_instructors = ({ target: { value } }) => {
    const input = value.trim();
    const url = construct_url(`${process.env.REACT_APP_SERVER_ENDPOINT}/instructors/${input}`, { "search": 1, limit: 10 });

    if (input.length > 2) {
      fetch(url)
      .then(r => r.json())
      .then(res => {
        res?.status ? setResults([]) : setResults(res);
      });
    }
    else {
      setResults([]);
    }
  }

  const select_result = (name) => {
    setInstructor(name);
    setResults([]);

    const url = construct_url(`${process.env.REACT_APP_SERVER_ENDPOINT}/instructor/${name}`, { "compare": 1 });

    fetch(url)
    .then(r => r.json())
    .then(res => {
      setInstructorData(res);
      const normalized = { ...res, ...normalize(res) };
      onSelect(normalized);
    });
  }

  return (
    <div>
      <div className="flex flex-col">

        <div className="mb-2 text-xl font-semibold">
          <Link to={`instructor/${instructor}`}>{instructor}</Link>
        </div>

        <Omnibox category="instructors" filter={search_instructors} padding={0}>
          {results && results.map((d, i) => <InstructorResult selectInstructor={select_result} key={i} {...d} />)}
        </Omnibox>

        <div className="flex flex-row justify-between mt-3 text-xl font-medium">

          <div className="flex flex-col">
            <div className="text-base text-gray-600">Average GPA:</div>
            <div>{instructorData && (instructorData.avg_gpa ? instructorData.avg_gpa.toFixed(2) : "N/A")}</div>
          </div>

          <div className="flex flex-col">
            <div className="text-base text-gray-600">DFW Rate:</div>
            <div>{instructorData && (instructorData.dfw_rate ? `${instructorData.dfw_rate}%` : "N/A")}</div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default InstructorSelect;