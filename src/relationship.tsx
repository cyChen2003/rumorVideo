import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const graphData = {
  nodes: [
    { id: '1', name: '政治', category: 0, symbolSize: 60 },
    { id: '2', name: '经济', category: 1, symbolSize: 80 },
    { id: '3', name: '社会', category: 2, symbolSize: 70 },
    { id: '4', name: '文化', category: 3, symbolSize: 50 },
    { id: '5', name: '科技', category: 4, symbolSize: 60 },
    { id: '6', name: '国际', category: 0, symbolSize: 30 },
    { id: '7', name: '健康', category: 2, symbolSize: 30 },
    { id: '8', name: '娱乐', category: 3, symbolSize: 30 },
    { id: '10', name: '教育', category: 2, symbolSize: 30 },
    { id: '11', name: '台湾', category: 0, symbolSize: 30 },
    { id: '12', name: '中国', category: 0, symbolSize: 45 },
    { id: '13', name: '美国', category: 0, symbolSize: 35 },
    { id: '14', name: '俄乌局势', category: 0, symbolSize: 30 },
    { id: '15', name: '普华永道', category: 1, symbolSize: 30 },
    { id: '16', name: '苹果', category: 1, symbolSize: 30 },
    { id: '17', name: '股票', category: 1, symbolSize: 30 },
    { id: '18', name: '六一', category: 2, symbolSize: 30 },
    { id: '19', name: '网红', category: 2, symbolSize: 30 },
    { id: '20', name: 'OpenAI', category: 4, symbolSize: 30 },
    { id: '21', name: '英伟达', category: 4, symbolSize: 30 },
    { id: '22', name: '歌手', category: 3, symbolSize: 30 },
    { id: '23', name: '出海', category: 2, symbolSize: 30 },
  ],
  links: [
    { source: '1', target: '6', value: 30 },
    { source: '2', target: '5', value: 30 },
    { source: '2', target: '3', value: 30 },
    { source: '2', target: '17', value: 30 },
    { source: '3', target: '7', value: 30 },
    { source: '3', target: '4', value: 30 },
    { source: '3', target: '5', value: 30 },
    { source: '3', target: '10', value: 30 },
    { source: '4', target: '12', value: 30 },
    { source: '5', target: '6', value: 30 },
    { source: '8', target: '2', value: 30 },
    { source: '8', target: '3', value: 30 },
    { source: '8', target: '4', value: 30 },
    { source: '11', target: '1', value: 10 },
    { source: '12', target: '1', value: 10 },
    { source: '13', target: '1', value: 10 },
    { source: '14', target: '1', value: 10 },
    { source: '11', target: '3', value: 10 },
    { source: '12', target: '2', value: 10 },
    { source: '12', target: '3', value: 10 },
    { source: '12', target: '4', value: 10 },
    { source: '12', target: '5', value: 10 },
    { source: '12', target: '6', value: 10 },
    { source: '12', target: '11', value: 10 },
    { source: '13', target: '12', value: 10 },
    { source: '13', target: '1', value: 10 },
    { source: '13', target: '2', value: 10 },
    { source: '13', target: '3', value: 10 },
    { source: '13', target: '4', value: 10 },
    { source: '13', target: '5', value: 10 },
    { source: '13', target: '6', value: 10 },
    { source: '14', target: '1', value: 10 },
    { source: '14', target: '3', value: 10 },
    { source: '15', target: '2', value: 10 },
    { source: '15', target: '17', value: 10 },
    { source: '16', target: '2', value: 10 },
    { source: '16', target: '5', value: 10 },
    { source: '16', target: '13', value: 10 },
    { source: '16', target: '17', value: 10 },
    { source: '18', target: '3', value: 10 },
    { source: '18', target: '4', value: 10 },
    { source: '18', target: '8', value: 10 },
    { source: '19', target: '2', value: 10 },
    { source: '19', target: '8', value: 10 },
    { source: '20', target: '5', value: 10 },
    { source: '20', target: '6', value: 10 },
    { source: '20', target: '13', value: 10 },
    { source: '20', target: '17', value: 10 },
    { source: '21', target: '5', value: 10 },
    { source: '21', target: '6', value: 10 },
    { source: '21', target: '13', value: 10 },
    { source: '21', target: '17', value: 10 },
    { source: '22', target: '4', value: 10 },
    { source: '22', target: '12', value: 10 },
    { source: '23', target: '4', value: 10 },
    { source: '23', target: '12', value: 10 },
  ],
  categories: [
    { name: '政治' },
    { name: '经济' },
    { name: '社会' },
    { name: '文化' },
    { name: '科技' },
  ],
};

export const RelationshipGraph: React.FC = () => {
  useEffect(() => {
    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom);

    myChart.showLoading();

    // 模拟异步数据加载
    setTimeout(() => {
      myChart.hideLoading();

      const option = {
        tooltip: {
          formatter: function (params: any) {
            if (params.dataType === 'node') {
              const category = graphData.categories[params.data.category]?.name;
              return `${params.data.name} (${category})`;
            } else {
              return `${params.data.source} → ${params.data.target} <br/> Weight: ${params.data.value}`;
            }
          }
        },
        legend: [
          {
            data: graphData.categories.map((a) => a.name)
          }
        ],
        series: [
          {
            name: '新闻热点',
            type: 'graph',
            layout: 'force',
            data: graphData.nodes,
            links: graphData.links.map(link => ({
              ...link,
              lineStyle: {
                width: link.value / 10 // 根据权重设置线的粗细
              },
              label: {
                show: true,
                formatter: link.value.toString(),
                position: 'middle'
              }
            })),
            categories: graphData.categories,
            roam: true,
            label: {
              show: true,
              position: 'right',
              formatter: '{b}'
            },
            labelLayout: {
              hideOverlap: true
            },
            scaleLimit: {
              min: 0.4,
              max: 2
            },
            force: {
              repulsion: 1000
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            }
          }
        ]
      };

      myChart.setOption(option);
    }, 1000); // 模拟加载延迟

    // 在组件卸载时清理图表
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="main" style={{ width: '100%', height: '600px' }}></div>;
};
