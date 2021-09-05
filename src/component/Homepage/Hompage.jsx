import React from 'react'
import { PieChart, Pie, Tooltip} from 'recharts'
import Sidebar from '../Sidebar/Sidebar';

const data01 = [
    { name: 'Middle name A', value: 150},
    { name: 'Middle name B', value: 80 },
    { name: 'Middle name C', value: 103 },
    { name: 'Middle name D', value: 49},
    { name: 'Middle name E', value: 64},
    { name: 'Middle name F', value: 52},
  ];
export default function Hompage() {
    return (
        <div>  
            <h1>Pie Chart For Users And their Middle Name</h1>
            <PieChart width={500} height={400}>
            <Pie
            dataKey="value"
            isAnimationActive={false}
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
