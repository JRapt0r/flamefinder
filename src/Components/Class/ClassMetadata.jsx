import React from "react";
import { Link } from "react-router-dom";
import { BarChart, SmallExternalLink } from "../Icons";

import { Chart } from "react-google-charts";

import { Wave } from "react-css-spinners";
import LoadingPlaceholder from "../LoadingPlaceholder";

import find_rmp from "../../Helpers/find_rmp";

function ClassMetadata({ data, metaData }) {
  return (
    <div>
      <div className="flex flex-row flex-wrap order-1 mt-2 md:mt-3">

        {/* Instructor */}
        <div className="flex flex-col items-start w-full mb-2 md:mb-0 md:w-1/3">
          <div className="flex flex-col">
            <div className="font-medium text-gray-600">Instructor</div>
            <div className="flex flex-row font-semibold md:text-xl">
              {data ? <Link to={`/instructor/${data.PrimaryInstructor}`}>{data.PrimaryInstructor?.split(", ").reverse().join(" ")}</Link> : <LoadingPlaceholder length={11} />}
              {data ? <a className="flex flex-row items-center ml-1 text-blue-700 hover:text-blue-800" target="_blank" rel="noreferrer" href={find_rmp(data.PrimaryInstructor)}> (RMP <SmallExternalLink size={18} />)</a> : <LoadingPlaceholder length={4} />}
            </div>
          </div>
        </div>

        {/* Department */}
        <div className="flex flex-col w-1/2 md:items-center md:w-1/3">
          <div className="flex flex-col">
            <div className="font-medium text-gray-600">Department</div>
            <div className="font-semibold md:text-xl">
              {data ? <Link to={`/department/${data.CRSSUBJCD}`}>{data.DEPTNAME}</Link> : <LoadingPlaceholder length={5} />}
            </div>
          </div>
        </div>

        {/* Semester */}
        <div className="flex flex-col items-end w-1/2 md:w-1/3">
          <div className="flex flex-col">
            <div className="font-medium text-gray-600">Semester</div>
            <div className="font-semibold md:text-xl">{data ? `${data.SEASON} ${data.YEAR}` : <LoadingPlaceholder length={5} />}</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col order-3 mt-5">
        <div className="flex flex-row items-center mb-6 space-x-2 text-xl font-semibold md:text-2xl">
          <BarChart />
          <div>Grade Distribution</div>
        </div>

        <div className="flex flex-row flex-wrap justify-around">
          <div style={{ minWidth: "24rem" }} className="w-1/2 h-96">
            {data ? <Chart
              width={'100%'}
              height={'100%'}
              chartType="ColumnChart"
              loader={<div className="flex items-center justify-center min-w-full min-h-full">
                <Wave color="#1e40af" size={72} thickness={8} /></div>}
              data={[
                [
                  'Letter Grade',
                  'Grade Count',
                  { role: 'style' },
                  {
                    sourceColumn: 0,
                    role: 'annotation',
                    type: 'string',
                    calc: 'stringify',
                  },
                ],
                ['A', data['A'], '#4F46E5', null],
                ['B', data['B'], '#4F46E5', null],
                ['C', data['C'], '#4F46E5', null],
                ['D', data['D'], '#DC2626', null],
                ['F', data['F'], '#DC2626', null],
                ['W', data['W'], '#DC2626', null],
              ]}
              options={{
                legend: { position: 'none' },
                chartArea: { width: '80%', height: '80%' },
                title: `${data.CRSSUBJCD} ${data.CRSNBR}, ${data.SEASON} ${data.YEAR}`,
                titleTextStyle: { fontName: 'Inter', fontSize: 16, color: "#4b5563", bold: false },
                tooltip: { textStyle: { fontName: "Inter" }, showColorCode: false },
              }}
            /> : <div className="flex items-center justify-center min-w-full min-h-full"><Wave color="#1e40af" size={72} thickness={8} /></div>}
          </div>

          <div style={{ minWidth: "24rem" }} className="w-1/2 h-96">
            {data ? <Chart
              width={'100%'}
              height={'100%'}
              chartType="PieChart"
              loader={<div className="flex items-center justify-center min-w-full min-h-full">
                <Wave color="#1e40af" size={72} thickness={8} /></div>}
              data={[
                ['Result', 'Grade (in Groups)'],
                ['Pass', data["A"] + data["B"] + data["C"]],
                ['DFW', data["D"] + data["F"] + data["W"]],
              ]}
              options={{
                legend: 'none',
                colors: ['#4F46E5', '#DC2626'],
                pieSliceText: 'label',
                pieSliceTextStyle: { fontName: 'Inter' },
                title: 'DFW Rate',
                titleTextStyle: { fontName: 'Inter', fontSize: 16, color: "#4b5563", bold: false },
                tooltip: { textStyle: { fontName: "Inter" }, showColorCode: true },
                pieStartAngle: 0,
              }}
            /> : <div className="flex items-center justify-center min-w-full min-h-full"><Wave color="#1e40af" size={72} thickness={8} /></div>}
          </div>
        </div>
      </div>

      {/* More metadata */}
      <div className="flex flex-col order-2 sm:order-4 md:mt-8">
        <div className="flex flex-row flex-wrap justify-between mt-2 md:mt-4">
          <div className="flex flex-col">
            <div className="font-medium text-gray-600">Average GPA</div>
            <div className="font-semibold md:text-xl">
              {data ? (data.avg_gpa)?.toFixed(2) : <LoadingPlaceholder placeholder="4.00" length={1} />}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-medium text-gray-600">Credit Hours</div>
            <div className="font-semibold md:text-xl">
              {metaData ? (metaData.CRSHOURS ? metaData.CRSHOURS : "N/A") : <LoadingPlaceholder length={4} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassMetadata;