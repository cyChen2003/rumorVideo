import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const EChartsCalendarComponent: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            const cellSize = [75, 75];
            const pieRadius = 30;

            const getVirtualData = function() {
                const date = +echarts.time.parse('2024-07-01');
                const end = +echarts.time.parse('2024-08-01');
                const dayTime = 3600 * 24 * 1000;
                const data = [];
                for (let time = date; time < end; time += dayTime) {
                    data.push([
                        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
                        Math.floor(Math.random() * 10000)
                    ]);
                }
                return data;
            }

            const scatterData = getVirtualData();
            const pieSeries = scatterData.map(function (item, index) {
                return {
                    type: 'pie',
                    id: 'pie-' + index,
                    center: item[0],
                    radius: pieRadius,
                    coordinateSystem: 'calendar',
                    label: {
                        formatter: '{c}',
                        position: 'inside'
                    },
                    data: [
                        { name: '已知谣言过滤', value: Math.round(Math.random() * 24) },
                        { name: '多模态谣言检测', value: Math.round(Math.random() * 24) },
                        { name: 'deepfake检测', value: Math.round(Math.random() * 24) },
                        { name: '评论语义分析检测', value: Math.round(Math.random() * 24) },
                    ]
                };
            });

            const option = {
                tooltip: {},
                legend: {
                    data: ['已知谣言过滤', '多模态谣言检测', 'deepfake检测', '评论语义分析检测'],
                    bottom: 20
                },
                calendar: {
                    top: 'middle',
                    left: 'center',
                    orient: 'vertical',
                    cellSize: cellSize,
                    yearLabel: {
                        show: false,
                        fontSize: 30
                    },
                    dayLabel: {
                        margin: 20,
                        firstDay: 1,
                        nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    },
                    monthLabel: {
                        show: false
                    },
                    range: ['2024-07']
                },
                series: [
                    {
                        id: 'label',
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        symbolSize: 0,
                        label: {
                            show: true,
                            formatter: function (params: any) {
                                return echarts.time.format(params.value[0], '{dd}', false);
                            },
                            offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                            fontSize: 14
                        },
                        data: scatterData
                    },
                    ...pieSeries
                ]
            };


            option && myChart.setOption(option as any);

        }
    }, []);

    return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
};

export default EChartsCalendarComponent;