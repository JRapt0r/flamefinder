import { React, useState } from "react";

import { Chart } from "react-google-charts";
import { Wave } from "react-css-spinners";
import MultiSelect from "../Components/MultiSelect";

function Compare() {
  const [instData, setInstData] = useState([]);

  const normalize = (input) => {
    const total = (input?.A + input?.B + input?.C + input?.D + input?.F + input?.W);
    const to_return = {
      ...input,
      A: Math.round((input?.A / total) * 100),
      B: Math.round((input?.B / total) * 100),
      C: Math.round((input?.C / total) * 100),
      D: Math.round((input?.D / total) * 100),
      F: Math.round((input?.F / total) * 100),
      W: Math.round((input?.W / total) * 100),
    };
    return to_return;
  }

  const createData = (instructors) => {
    const normalized = instructors.map(inst => normalize(inst));

    const data = [
      ['Letter Grade', ...normalized.map(data => data?.PrimaryInstructor)],
      ['A', ...normalized.map(data => data?.A)],
      ['B', ...normalized.map(data => data?.B)],
      ['C', ...normalized.map(data => data?.C)],
      ['D', ...normalized.map(data => data?.D)],
      ['F', ...normalized.map(data => data?.F)],
      ['W', ...normalized.map(data => data?.W)]
    ];
    setInstData(data);
  }

  return (
    <div className="flex flex-col p-4 bg-white border-gray-300 rounded-md shadow sm:border sm:m-2 md:px-8 md:pt-6 md:pb-10 md:m-6">
      <div className="mb-3 text-4xl font-semibold">Compare instructors</div>

      <MultiSelect callback={createData} />

      <div className="w-full mt-3">
        {instData[0]?.length > 1 ?
        <Chart
          width={'100%'}
          height={'60vh'}
          chartType="ColumnChart"
          loader={<div className="flex items-center justify-center min-w-full min-h-full">
            <Wave color="#1e40af" size={72} thickness={8} /></div>}
          data={instData}
          options={{
            legend: { position: 'bottom' },
            chartArea: { width: '90%', height: '80%' },
            title: "Grade distribution (normalized)",
            titleTextStyle: { fontName: 'Inter', fontSize: 16, color: "#4b5563", bold: false },
            tooltip: { textStyle: { fontName: "Inter" }, showColorCode: false },
          }}
        /> : null}
      </div>
    </div>
  );
}

export default Compare;