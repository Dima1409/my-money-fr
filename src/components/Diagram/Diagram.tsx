import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

interface DataItem {
  category: string;
  amount: number;
}

interface DiagramProps {
  data: DataItem[];
  title?: string;
}

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#99720d",
  "#8BC34A",
  "#8139c9",
  "#39d8a5",
  "#869377",
  "#6c6a13",
  "#534a4c",
  "#0a2c43",
  "#795f18",
  "#5b1e0b",
  "#42186c",
  "#22493d",
  "#52564e",
  "#6c6a13",
  "#696969",
  "#0e075e",
  "#261e0b",
  "#a04e1c",
  "#a1603b",
  "#2049a0",
  "#416f0d",
  "#0c4f57",
];

const Diagram: React.FC<DiagramProps> = ({ data, title }) => {
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  const totalAmount = data.reduce((sum, entry) => sum + entry.amount, 0);
  console.log("totalAmount", totalAmount);
  return (
    <PieChart width={320} height={400}>
      <Pie
        dataKey="amount"
        isAnimationActive={true}
        data={data}
        cx={0}
        cy={100}
        outerRadius={70}
        fill="#8884d8"
        label={(entry) => `${((entry.value * 100) / totalAmount).toFixed(2)}%`}
        fontSize={14}
        textDecoration={"underline"}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        layout="vertical"
        iconSize={14}
        align="left"
        iconType="circle"
        payload={sortedData.map((elem) => ({
          value: `${elem.category} ${elem.amount} грн`,
          type: "circle",
          color: COLORS[data.indexOf(elem) % COLORS.length],
        }))}
      />
    </PieChart>
  );
};

export default Diagram;
