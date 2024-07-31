import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface TrafficChartProps {}

export const TrafficChart: React.FC<TrafficChartProps> = () => {
  useEffect(() => {
    const base = +new Date(2024, 2, 3); // 2024年3月3日
    const oneHour = 3600 * 1000;
    const date = [];
    const data = [];
    const today = new Date();
    const hours = Math.ceil((today.getTime() - base) / oneHour);
    let initialValue = Math.round(Math.random() * 500);
    data.push(initialValue);

    for (let i = 1; i <= hours; i++) {
      const now = new Date(base + i * oneHour);
      date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/') + ' ' + now.getHours() + ':00');

      let previousValue: number = data[i - 1];
      let newValue:number = previousValue + Math.round((Math.random() - 0.5) * 20);
      newValue = Math.max(0, Math.min(500, newValue));
      data.push(newValue);
    }

    const chart = echarts.init(document.getElementById('traffic-chart')!);

    const option = {
      tooltip: {
        trigger: 'axis',
        position: function (pt: any) {
          return [pt[0], '10%'];
        }
      },
      title: {
        left: 'center',
        text: '近期短视频扫描量'
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10
        },
        {
          start: 0,
          end: 10
        }
      ],
      series: [
        {
          name: 'Fake Data',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)'
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }
            ])
          },
          data: data
        }
      ]
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, []);

  return <div id="traffic-chart" style={{ width: '100%', height: '400px' }} />;
};

export default TrafficChart;
