import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataItem {
  category: string;
  amount: any;
}

interface RechartsComponentProps {
  data: DataItem[];
}

const Diagram: React.FC<RechartsComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#3027d6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Diagram;
