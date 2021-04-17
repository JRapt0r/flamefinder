import { React, useState } from "react";
import InstructorSelect from "../Components/InstructorSelect";

import { Chart } from "react-google-charts";
import { Wave } from "react-css-spinners";

function Compare() {
  const [first_data, setFD] = useState(null);
  const [second_data, setSD] = useState(null);

  const construct_title = ({PrimaryInstructor: first}, {PrimaryInstructor: second}) => {
    return `${first?.split(", ").reverse().join(" ")} vs ${second?.split(", ").reverse().join(" ")} (normalized)`;
  }

  return (
    <div className="flex flex-col px-8 pt-6 pb-10 m-4 bg-white border border-gray-300 rounded-md shadow-xl">
      <div className="mb-3 text-4xl font-semibold">Compare instructors</div>

      {/* Inputs */}
      <div className="flex flex-col justify-between md:space-x-4 md:flex-row">
        <div className="w-full mb-3 md:m-0 md:w-1/2">
          <InstructorSelect onSelect={setFD}/>
        </div>

        <div className="w-full mt-3 md:m-0 md:w-1/2">
          <InstructorSelect onSelect={setSD}/>
        </div>
      </div>

      {/* Chart */}
      <div style={{ minHeight: "50vh" }} className="w-full mt-8">
        {(first_data && second_data) && <Chart
          width={'100%'}
          height={'60vh'}
          chartType="ColumnChart"
          loader={<div className="flex items-center justify-center min-w-full min-h-full">
                  <Wave color="#1e40af" size={72} thickness={8} /></div>}
          data={[
            ['Letter Grade', first_data.PrimaryInstructor, second_data.PrimaryInstructor],
            ['A', first_data?.A, second_data?.A],
            ['B', first_data?.B, second_data?.B],
            ['C', first_data?.C, second_data?.C],
            ['D', first_data?.D, second_data?.D],
            ['F', first_data?.F, second_data?.F],
            ['W', first_data?.W, second_data?.W],
          ]}
          options={{
            legend: { position: 'bottom' },
            chartArea: { width: '90%', height: '80%' },
            colors: ['#00B5E2', '#001E62'],
            title: construct_title(first_data, second_data),
            titleTextStyle: { fontName: 'Inter', fontSize: 16, color: "#4b5563", bold: false },
            tooltip: { textStyle: { fontName: "Inter" }, showColorCode: false },
          }}
        />}
      </div>
    </div>
  );
}

export default Compare;