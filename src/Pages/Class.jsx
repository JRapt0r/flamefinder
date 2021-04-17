import { React, useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import LoadingPlaceholder from "../Components/LoadingPlaceholder";

import construct_url from "../Helpers/construct_url";
import SimilarClasses from "../Components/Class/SimilarClasses";
import CourseDescription from "../Components/Class/CourseDescription";
import ClassMetadata from "../Components/Class/ClassMetadata";

function Class() {
  const { classID } = useParams();
  const history = useHistory();
  const [data, setData] = useState(null);
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const [department, course_number, PrimaryInstructor, season, year] = classID.split("+");
    const params = {
      'instructor': PrimaryInstructor,
      'department': department,
      'course_number': course_number,
      'season': season,
      'year': year,
    };

    fetch(construct_url(`${process.env.REACT_APP_SERVER_ENDPOINT}/class`, params))
    .then(r => r.json())
    .then(res => {
      if (res?.code === 404) {
        return history.push("/error/404");
      }
      else {
        const url = construct_url(`${process.env.REACT_APP_SERVER_ENDPOINT}/course_info`,
        { "department": res.CRSSUBJCD, "course_number": res.CRSNBR });

        fetch(url).then(r1 => r1.json()).then(r2 => {
          setMetaData(r2);
          setData(res);
        })
        .catch(e2 => {
          console.error(e2);
          return history.push("/error/400");
        })
      }
    })
    .catch(e1 => {
      console.error(e1);
      return history.push("/error/400");
    });
  }, [classID, history]);

  return (
    <div className="flex flex-col p-4 m-2 bg-white border border-gray-300 rounded-md shadow-xl md:px-8 md:pt-6 md:pb-10 md:m-6">

      <div className="text-xl font-semibold text-blue-700 uppercase md:text-2xl">
        {data ? <Link className="hover:text-blue-800" to={`/course/${data.CRSSUBJCD} ${data.CRSNBR}`}>{data.CRSSUBJCD} {data.CRSNBR}</Link> : <LoadingPlaceholder length={4} />}
      </div>

      <div className="text-3xl font-semibold md:text-4xl">{metaData ? metaData.CRSTITLE : <LoadingPlaceholder length={16} />}</div>

      <ClassMetadata data={data} metaData={metaData}/>

      <CourseDescription course_desc={metaData?.CRSSUBJDESC}/>

      <SimilarClasses classes={data?.similar_class} />
    </div>
  );
}

export default Class;