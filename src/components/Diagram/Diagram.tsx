import React from "react";
import { theme } from "theme/theme";
import { Pie, Cell, Legend, PieChart } from "recharts";
import { useMediaQuery } from "react-responsive";
import { breakpoints } from "theme/theme";

interface DataItem {
  category: string;
  amount: number;
}

interface DiagramProps {
  data: DataItem[];
  title?: string;
}

const Diagram: React.FC<DiagramProps> = ({ data, title }) => {
  const isSmallScreen = useMediaQuery({
    query: `(max-width: ${breakpoints.tablet}px)`,
  });

  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  const totalAmount = data.reduce((sum, entry) => sum + entry.amount, 0);
  return (
    <>
      <PieChart
        width={300}
        height={isSmallScreen ? 250 : 300}
        margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
      >
        <Pie
          dataKey="amount"
          isAnimationActive={true}
          data={data}
          cx={150}
          cy={100}
          outerRadius={isSmallScreen ? 60 : 90}
          innerRadius={isSmallScreen ? 30 : 45}
          fill="#8884d8"
          label={(entry) =>
            `${((entry.value * 100) / totalAmount).toFixed(2)}%`
          }
          fontSize={12}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={theme.diagramColors[index % theme.diagramColors.length]}
            />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          iconSize={10}
          align="center"
          iconType="circle"
          wrapperStyle={{
            position: "absolute",
            top: "102%",
            left: "50px",
            borderBottom: `12px solid ${theme.colors.accent}`,
            borderRadius: `${theme.radii.small}`,
          }}
          payload={sortedData.map((elem) => ({
            value: `${elem.category} ${elem.amount} грн`,
            type: "circle",
            color:
              theme.diagramColors[
                data.indexOf(elem) % theme.diagramColors.length
              ],
          }))}
        />
      </PieChart>
    </>
  );
};

export default Diagram;
