"use client";

import { useEffect, useState } from "react";
import LineChartTotal from "../../components/prediction/LineChartTotal";
import LineChartCategory from "../../components/prediction/LineChartCategory";
import DataTable from "../../components/prediction/DataTable";

const BASEURL = "https://data-prediction-f858d2eb8826.herokuapp.com";

export default function Page() {
  const [predictedData, setPredictedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyTotalOrderData, setMonthlyTotalOrderData] = useState(null);
  const [monthlyCategoryOrderData, setMonthlyCategoryOrderData] =
    useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}/predict`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setPredictedData(jsonData);

        const monthlyTotals = {};
        const categoryMonthlyTotals = {};

        jsonData.forEach((dataRow) => {
          const monthKey = `${dataRow.Year}-${dataRow.Month}`;

          if (!monthlyTotals[monthKey]) {
            monthlyTotals[monthKey] = 0;
          }
          monthlyTotals[monthKey] += dataRow.PredictedOrderQuantity;

          if (!categoryMonthlyTotals[monthKey]) {
            categoryMonthlyTotals[monthKey] = {};
          }
          if (!categoryMonthlyTotals[monthKey][dataRow.Category]) {
            categoryMonthlyTotals[monthKey][dataRow.Category] = 0;
          }
          categoryMonthlyTotals[monthKey][dataRow.Category] +=
            dataRow.PredictedOrderQuantity;
        });

        const totalDataPoints = Object.keys(monthlyTotals).map((key) => ({
          month: key,
          quantity: monthlyTotals[key],
        }));

        const categoryDataPoints = [];
        for (const monthKey in categoryMonthlyTotals) {
          for (const category in categoryMonthlyTotals[monthKey]) {
            categoryDataPoints.push({
              month: monthKey,
              category,
              totalQuantity: categoryMonthlyTotals[monthKey][category],
            });
          }
        }

        setMonthlyTotalOrderData(totalDataPoints);
        setMonthlyCategoryOrderData(categoryDataPoints);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-5 md:pt-20 bg-white">
      <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0 md:mx-10">
        <div className="flex-1">
          <h1 className="text-2xl  text-cyan-700 mb-4">
            Order Prediction - Total
          </h1>
          {monthlyTotalOrderData ? (
            <LineChartTotal data={monthlyTotalOrderData} />
          ) : (
            <p>Loading data...</p>
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl text-cyan-700 mb-4">
            Order Prediction - Category
          </h1>
          {monthlyCategoryOrderData ? (
            <LineChartCategory data={monthlyCategoryOrderData} />
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
      <div className="mt-6 md:mt-20 md:mx-20">
        <h1 className="text-2xl text-cyan-700 mb-4">Order Prediction</h1>
        {predictedData && predictedData.length > 0 ? (
          <p>Predicted Data: {predictedData.length}</p>
        ) : null}
        <DataTable data={predictedData} />
      </div>
    </div>
  );
}
