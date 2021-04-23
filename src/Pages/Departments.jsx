import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";

import DepartmentCard from "../Components/Cards/DepartmentCard";
import SearchBox from "../Components/SearchBox";
import GridPlaceholder from "../Components/Placeholders/GridPlaceholder";

import departments from "../Cache/departments.json";

function Departments() {
  const history = useHistory();

  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    import("js-search").then(({ Search }) => {
      const index = new Search("index");
      index.addIndex("DEPTNAME");
      index.addIndex("CRSSUBJCD");

      index.addDocuments(departments);

      setIndex(index);
      setData(departments);
    })
    .catch(err => {
      console.error(err);
      return history.push("/error/400");
    });
  }, [history]);

  const search_departments = ({ target: { value } }) => {
    const input = value.trim();

    if (input.length < 2)
      setData(index._documents);
    else
      setData(index.search(input));
  }

  return (
    <div className="pb-8">
      <SearchBox category="departments" filter={search_departments} />

      <div className="flex flex-col min-w-full px-2 md:px-10">
        <div className="flex flex-row flex-wrap items-center justify-center mt-2">
          {data ? data.map((d, i) => <DepartmentCard key={i.toString()} {...d} />) : <GridPlaceholder/>}
        </div>
      </div>
    </div>
  );
}

export default Departments;