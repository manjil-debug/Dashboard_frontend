import React from 'react'
import { PieChart, Pie, Tooltip} from 'recharts'

const data01 = [
    { name: 'Middle name A', value: 50},
    { name: 'Middle name B', value: 25 },
    { name: 'Middle name C', value: 13 },
    { name: 'Middle name D', value: 16 },
    { name: 'Middle name E', value: 64 },
    { name: 'Middle name F', value: 23 },
  ];
export default function Hompage() {
    return (
        <div>
            <h1>Pie Chart For Users And their Middle Name</h1>
            <PieChart width={1300} height={400}>
            <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
            />
            <Tooltip />
            
            </PieChart>
            
        </div>
    )
}
