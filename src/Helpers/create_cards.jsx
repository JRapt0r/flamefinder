import React from "react";

import CourseCard from "../Components/Cards/CourseCard";
import ClassCard from "../Components/Cards/ClassCard";

function create_course_cards(data) {
  if (data.length === 0) return;

  let level = `${data[0]?.SEASON} ${data[0]?.YEAR}`;
  let layers = [];
  let current_layer = [];

  data.forEach((d, i) => {
    if (level !== `${d.SEASON} ${d.YEAR}`) {
      layers.push(<div key={`${level}XX`} className="my-2 text-2xl font-bold text-center md:my-4 md:text-3xl">{level}</div>);
      layers.push(<div key={`${level}YY`} className="flex flex-row flex-wrap justify-center pb-4 border-b-2">{current_layer}</div>);
      current_layer = [];
      level = `${d.SEASON} ${d.YEAR}`;
    }

    current_layer.push(<ClassCard key={i.toString()} {...d} />);
  });

  layers.push(<div key={`${level}XX`} className="my-2 text-2xl font-bold text-center md:my-4 md:text-3xl">{level}</div>);
  layers.push(<div key={`${level}YY`} className="flex flex-row flex-wrap justify-center">{current_layer}</div>);
  return layers;
}

function create_dept_cards(data) {
  if (data.length === 0) return;

  let level = Math.floor(data[0]?.CRSNBR * 0.01);
  let layers = [];
  let current_layer = [];

  data.forEach((d, i) => {
    if (level !== (Math.floor(d.CRSNBR * 0.01))) {
      layers.push(<div key={`${level}XX`} className="my-2 text-2xl font-bold text-center md:my-4 md:text-3xl">{level}XX Level</div>);
      layers.push(<div key={`${level}YY`} className="flex flex-row flex-wrap justify-center pb-4 border-b-2">{current_layer}</div>);
      current_layer = [];
      level = Math.floor(d.CRSNBR * 0.01);
    }

    current_layer.push(<CourseCard key={i.toString()} {...d} />);
  });

  layers.push(<div key={`${level}XX`} className="my-2 text-2xl font-bold text-center md:my-4 md:text-3xl">{level}XX Level</div>);
  layers.push(<div key={`${level}YY`} className="flex flex-row flex-wrap justify-center">{current_layer}</div>);
  return layers;
}

export {
  create_course_cards,
  create_dept_cards
}