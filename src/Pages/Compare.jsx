import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Chart } from "react-google-charts";
import { Wave } from "react-css-spinners";

import MultiSelect from "../Components/MultiSelect";
import { ChevronDown, ChevronUp } from "../Components/Icons";


function CompareInfo({A, B, C, D, F, W, other}) {
  return (
    <div className="flex flex-row justify-between py-2 text-sm font-medium border-t-2 sm:text-base sm:justify-around bg-gray-50">
      <div>
        <div className="text-sm text-gray-700">A:</div>
        <div className="font-semibold">{A}</div>
      </div>
      <div>
        <div className="text-sm text-gray-700">B:</div>
        <div className="font-semibold">{B}</div>
      </div>
      <div>
        <div className="text-sm text-gray-700">C:</div>
        <div className="font-semibold">{C}</div>
      </div>
      <div>
        <div className="text-sm text-gray-700">D:</div>
        <div className="font-semibold">{D}</div>
      </div>
      <div>
        <div className="text-sm text-gray-700">F:</div>
        <div className="font-semibold">{F}</div>
      </div>
      <div>
        <div className="text-sm text-gray-700">W:</div>
        <div className="font-semibold">{W}</div>
      </div>
      <div>
        <div className="text-sm text-gray-700">Other:</div>
        <div className="font-semibold">{other}</div>
      </div>
    </div>
  );
}

function CompareCard({data}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col border-t-2">
      <div className={`flex flex-row items-center py-4 font-medium`}>
        <div className="flex flex-col items-start w-5/12 pr-4">
          <div className="text-xs text-gray-700 sm:text-sm">
            {data.PrimaryInstructor ? "Instructor:" : "Course:"}
          </div>

          <Link to={data.PrimaryInstructor ? `/instructor/${data.PrimaryInstructor}` : `/course/${data.CODE}`}
                className="font-semibold sm:text-lg hover:text-blue-700">
            {data.PrimaryInstructor || data.CODE}
          </Link>
        </div>
        <div className="flex flex-col items-center w-3/12">
          <div className="flex flex-col">
            <div className="text-xs text-gray-700 sm:text-sm">Average GPA:</div>
            <div className="font-semibold sm:text-lg">{data.avg_gpa?.toFixed(2) || "N/A"}</div>
          </div>
        </div>
        <div className="flex flex-col items-end w-3/12">
          <div className="text-xs text-gray-700 sm:text-sm">DFW Rate:</div>
          <div className="font-semibold sm:text-lg">{data.dfw_rate === null ? "N/A" : `${data.dfw_rate?.toFixed(2)}%`}</div>
        </div>
        <div className="flex flex-col items-end w-1/12">
          <button onClick={toggleExpanded} className="text-black focus-within:outline-none hover:text-blue-700">
            {isExpanded ? <ChevronUp/> : <ChevronDown/>}
          </button>
        </div>
      </div>
      {isExpanded && <CompareInfo {...data}/>}
    </div>
  );
}

function Compare({ type = "instructors" }) {
  const history = useHistory();
  const [searchingFor, setSearchingFor] = useState(type);
  const [compData, setCompData] = useState([]);
  const [gradeData, setGradeData] = useState([]);

  const changeType = ({target}) => {
    history.push(`/compare/${target.value}`);
    setSearchingFor(target.value);
  };

  const normalize = (input) => {
    const total = (input?.A + input?.B + input?.C + input?.D + input?.F + input?.W);
    const to_return = {
      ...input,
      A: Math.round((input?.A / total) * 100),
      B: Math.round((input?.B / total) * 100),
      C: Math.round((input?.C / total) * 100),
      D: Math.round((input?.D / total) * 100),
      F: Math.round((input?.F / total) * 100),
      W: Math.round((input?.W / total) * 100)
    };
    return to_return;
  }

  const createData = (input) => {
    const normalized = input.map(inst => normalize(inst));
    const data = [
      ['Letter Grade', ...normalized.map(data => data.PrimaryInstructor ? data.PrimaryInstructor : data.CODE )],
      ['A', ...normalized.map(data => data?.A)],
      ['B', ...normalized.map(data => data?.B)],
      ['C', ...normalized.map(data => data?.C)],
      ['D', ...normalized.map(data => data?.D)],
      ['F', ...normalized.map(data => data?.F)],
      ['W', ...normalized.map(data => data?.W)]
    ];
    setCompData(input);
    setGradeData(data);
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-6.5rem)]">

      <div className="px-3 pt-2 font-semibold sm:m-2 md:px-8 md:pt-1 md:m-4">
        <div className="mb-4 text-4xl">
          Compare
          <select onChange={changeType} className="ml-2 font-semibold bg-transparent border-b-2 border-blue-700" name="compare-type" id="compare-type">
            <option selected={type === "instructors"} value="instructors">instructors</option>
            <option selected={type === "courses"} value="courses">courses</option>
          </select>
        </div>

        <MultiSelect label={searchingFor} callback={createData} />
      </div>


      {gradeData[0]?.length > 1 ?
        <div className="mt-2 bg-white border-t-2 rounded-md md:border md:shadow md:mx-12 md:px-8 md:pt-4 md:pb-4 md:mb-10">
          <div className="w-full">
            <Chart
              width={'100%'}
              height={'60vh'}
              chartType="ColumnChart"
              loader={<div className="flex items-center justify-center min-w-full min-h-full">
                <Wave color="#1e40af" size={72} thickness={8} /></div>}
              data={gradeData}
              options={{
                legend: { position: 'bottom' },
                chartArea: { width: '90%', height: '80%', backgroundColor: "transparent" },
                title: "Grade distribution (normalized)",
                titleTextStyle: { fontName: 'Inter', fontSize: 18, color: "#4b5563", bold: true },
                tooltip: { textStyle: { fontName: "Inter" }, showColorCode: false },
              }}
            />
          </div>

          <div className={`flex flex-col m-4 pt-4 md:px-8 md:pt-6`}>
            {compData.map(data => <CompareCard key={data?.PrimaryInstructor ?? data.CODE} data={data} />)}
          </div>
        </div> : null}
    </div>
  );
}

export default Compare;