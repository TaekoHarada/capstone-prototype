import React from "react";

const DataTable = ({ data }) => {
  // Extract unique categories and dates
  const uniqueCategories = [...new Set(data.map((row) => row.Category))];
  const uniqueDates = [
    ...new Set(data.map((row) => `${row.Month}/${row.Day}`)),
  ];

  return (
    <table className="min-w-full border-collapse rounded-lg overflow-hidden">
      <thead>
        <tr>
          <th className="border text-white bg-cyan-900 px-2 py-1 text-left">
            Date
          </th>
          {uniqueCategories.map((category) => (
            <th
              key={category}
              className="border border-gray-300 px-2 py-1 text-left text-white bg-cyan-900"
            >
              {category}
            </th>
          ))}
          <th className="border border-gray-300 px-2 md:px-1 py-1 text-right text-white bg-cyan-900">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {uniqueDates.map((date) => {
          const [month, day] = date.split("/").map(Number);

          // Filter rows for the current date
          const rowsForDate = data.filter(
            (row) => row.Month === month && row.Day === day
          );

          // Check if the day is a holiday
          const isHoliday = rowsForDate.some((row) => row.IsHoliday === 1);

          // Calculate the total predicted order quantity
          const totalOrderQuantity = rowsForDate.reduce(
            (total, row) => total + row.PredictedOrderQuantity,
            0
          );

          return (
            <tr key={date} className={isHoliday ? "bg-red-100" : ""}>
              <td className="border border-gray-300 px-2 md:px-1 py-1 text-left">{`${month}/${day}`}</td>
              {uniqueCategories.map((category) => {
                const dataRow = rowsForDate.find(
                  (row) => row.Category === category
                );
                return (
                  <td
                    key={`${date}-${category}`}
                    className="border border-gray-300 px-2 md:px-1 py-1 text-right"
                  >
                    {dataRow
                      ? dataRow.PredictedOrderQuantity.toFixed(2)
                      : "N/A"}
                  </td>
                );
              })}
              <td className="border border-gray-300 px-2 md:px-1 py-1 text-right font-bold">
                {totalOrderQuantity.toFixed(2)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
