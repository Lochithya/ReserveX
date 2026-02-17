import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export default function StallsPieChart({ available, reserved }) {
  const data = [
    { name: "Available", value: available },
    { name: "Reserved", value: reserved }
  ];

  const COLORS = ["#4CAF50", "#FF6B6B"];

  return (
    <div className="pie-chart-inner">
      <div className="pie-chart-wrapper">
      <ResponsiveContainer width="100%" height={420}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value, percent }) =>
              `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
            }
            outerRadius={160}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => value} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
