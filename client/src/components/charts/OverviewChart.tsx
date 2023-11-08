// --- Do not remove this imports!
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
// ---

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface OverviewData {
    name: string;
    INFO: number;
    WARNING: number;
    ERROR: number;
}

export interface Layout {
    dateKey: string;
    stackId: string;
    fill: string;
}

// プロパティの型を定義
export interface OverviewChartProps {
    data: OverviewData[];
    layout: Layout[];
}

// 関数コンポーネントの引数は、propsオブジェクトです。
export function OverviewChart({data, layout}: OverviewChartProps) {
    const reversedData = [...data].reverse();

    return (
        <div style={{ width:"100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={reversedData}
                    margin={{
                        top: 20,
                        right: 60,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        layout="horizontal"
                        wrapperStyle={{
                            paddingTop: '10px',
                            width: '95%',
                            overflow: 'hidden'
                        }}
                    />
                    {layout.map((layoutItem, index) => (
                        <Bar
                            key={index}
                            dataKey={layoutItem.dateKey}
                            stackId={layoutItem.stackId}
                            fill={layoutItem.fill}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
