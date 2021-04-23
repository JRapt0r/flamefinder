import { React, useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import CourseCard from "../Components/Cards/CourseCard";
import SearchBox from "../Components/SearchBox"
import GridPlaceholder from "../Components/Placeholders/GridPlaceholder";

function  Courses() {
  const { department } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/department/${department}`)
    .then(r => r.json()).then(res => {

      if (res?.code) {
        return history.push(`/error/${res.code}`);
      }

      import("js-search").then(({ Search }) => {
        const index = new Search("index");
        index.addIndex("CRSSUBJCD");
        index.addIndex("CRSNBR");
        index.addIndex("CRSTITLE");

        index.addDocuments([...res.map((r, i) => ({ ...r, index: i }))]);

        setIndex(index);
        setData(res);
      })
      .catch(err => {
        console.error(err);
        return history.push("/error/400");
      });
    });
  }, [department, pathname, history]);

  const search_courses = ({ target: { value } }) => {
    const input = value.trim();

    if (input.length < 2)
      setData(index._documents);
    else
      setData(index.search(input));
  }

  const create_cards = () => {
    if (data.length === 0) return;

    let level = Math.floor(data[0]?.CRSNBR * 0.01);
    let layers = [];
    let current_layer = [];

    data.forEach((d, i) => {
      if ( level !== (Math.floor(d.CRSNBR * 0.01)) ) {
        layers.push(<div key={`${level}XX`} className="my-4 text-3xl font-bold text-center">{level}XX Level</div>);
        layers.push(<div key={`${level}YY`} className="flex flex-row flex-wrap justify-center pb-4 border-b-2">{current_layer}</div>);
        current_layer = [];
        level = Math.floor(d.CRSNBR * 0.01);
      }

      current_layer.push(<CourseCard key={i.toString()} {...d} />);
    });

    layers.push(<div key={`${level}XX`} className="my-4 text-3xl font-bold text-center">{level}XX Level</div>);
    layers.push(<div key={`${level}YY`} className="flex flex-row flex-wrap justify-center">{current_layer}</div>);
    return layers;
  }

  return (
    <div className="pb-8">
      <SearchBox category="courses" filter={search_courses} />

      <div className="flex flex-col">
        <div className="mt-4 space-y-4 sm:flex-row">
          {data ? create_cards() : <GridPlaceholder/>}
        </div>
      </div>
    </div>
  );
}

export default Courses;