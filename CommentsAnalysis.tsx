import React, { useState, useEffect } from "react";

import { Card, Space, List, Badge, Tag, Input, Button, Steps, message, Row, Col, Layout, theme, Typography,Table  } from "antd";
import type { SearchProps } from "antd/es/input/Search";

import { Pie,Column } from "@ant-design/plots";
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';


const { Search } = Input;

const steps = [
  {
    title: "输入需要解析的网址",
  },
  {
    title: "解析...",
  },
  {
    title: "获取检测报告",
  },
];
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const contentStyle: React.CSSProperties = {
  margin: "0 16px",
};
//带参数传输boardStyle
const boardStyle: React.CSSProperties = {
  padding: 24,
  minHeight: 360,
};
const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};
const layoutStyle = {
  minHeight: "100vh",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};


interface ChartData {
  name: string;
  value: number;
}
const chartData = [
  { name: "fear", value: 4 },
  { name: "trust", value: 12 },
  { name: "negative", value: 30 },
  { name: "positive", value: 12 }
];

const DemoPie = () => {
  const config = {
    data:chartData,
    angleField: 'value',
    colorField: 'name',
    legend: false,
    innerRadius: 0.4,
    
    labels: [
      { text: 'name', style: { fontSize: 12, fontWeight: 'bold' } },
      {
        text: (d: ChartData) => d.value, // Display the value directly
        style: {
          fontSize: 12,
          dy: 12,
        },
      },
    ],
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 10,
    },
    scale: {
      color: {
        palette: 'spectral',
        offset: (t: any) => t * 0.8 + 0.1,
      },
    },
  };
  return <Pie {...config} />;
};


const EmotionPieChart = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'bottom',
      left: 'center',
      padding:[0,10],
      textStyle: {
        fontFamily: 'Arial, sans-serif', // 自定义字体
        fontSize: 12, // 字体大小
        fontWeight: 'bold' // 字体粗细
      }
    },
    series: [
      {
        name: '情感',
        type: 'pie',
        radius: ['40%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 15,
          borderColor: '#fff',
          borderWidth: 4
        },
        label: {
          position: 'outside', 
          formatter: '{b}: {d}%',
          fontFamily: 'Arial, sans-serif',
          fontSize: 12,
          fontWeight: 'bold',
          color: '#333'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16, // 加大字体
            fontWeight: 'bold', // 加粗字体
            color: '#000' // 字体颜色
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 13, name: '愤怒', itemStyle: { color: '#D32F2F' } }, // 调整后的红色
          { value: 23, name: '恐惧', itemStyle: { color: '#303F9F' } }, // 调整后的深蓝
          { value: 15, name: '期待', itemStyle: { color: '#FFA726' } }, // 调整后的橙色
          { value: 20, name: '信任', itemStyle: { color: '#29B6F6' } }, // 调整后的浅蓝
          { value: 10, name: '惊讶', itemStyle: { color: '#FFEB3B' } }, // 调整后的亮黄
          { value: 11, name: '悲伤', itemStyle: { color: '#1976D2' } }, // 调整后的忧郁蓝
          { value: 4, name: '快乐', itemStyle: { color: '#EC407A' } }, // 调整后的热粉
          { value: 8, name: '厌恶', itemStyle: { color: '#388E3C' } } // 调整后的墨绿
        ]
      }
    ]
  };

  return <ReactECharts option={option} />;
};


const { Title, Text } = Typography;



const commentsData = [
  { comment: "专家没办法了，高手在民间[感谢][感谢]", likes: 19, emotion: "信任" },
  { comment: "说的太好了，我得给你点个赞", likes: 2, emotion: "快乐" },
  { comment: "我是自己治的。随便吃了点药就好了[捂脸]", likes: 2, emotion: "惊讶" },
  { comment: "不是人家治不了，根本就不想让你好", likes: 10, emotion: "愤怒" },
  { comment: "那你说那些在家呆着没吃药没打针的是谁治好的呢？[捂脸][捂脸][捂脸]", likes: 2, emotion: "怀疑" },
  { comment: "终于找到了有效的方法，太开心了！", likes: 8, emotion: "快乐" },
  { comment: "这种情况真的是太可怕了，希望尽快解决", likes: 25, emotion: "恐惧" },
  { comment: "感谢医生们的努力和付出", likes: 12, emotion: "信任" },
  { comment: "真的是无药可救了，这些人", likes: 13, emotion: "愤怒" },
  { comment: "为什么会这样，真是让人难过", likes: 11, emotion: "悲伤" }
];

const CommentTable = () => {
  const sortedComments = commentsData.sort((a, b) => b.likes - a.likes);

  const columns = [
    {
      title: '评论内容',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: '点赞数',
      dataIndex: 'likes',
      key: 'likes',
      render: (text:any) => <Badge count={text} overflowCount={999} style={{ backgroundColor: '#52c41a' }} />,
    },
    {
      title: '情感分类',
      dataIndex: 'emotion',
      key: 'emotion',
      render: (text:any) => (
        <Tag color={text === '愤怒' ? '#D32F2F' : text === '恐惧' ? '#303F9F' : text === '期待' ? '#FFA726' : text === '信任' ? '#29B6F6' : text === '惊讶' ? '#FFEB3B' : text === '悲伤' ? '#1976D2' : text === '快乐' ? '#EC407A' : '#388E3C'}>
          {text}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      dataSource={sortedComments}
      columns={columns}
      rowKey={(record) => record.comment}
      pagination={false}
    />
  );
};


interface MyChartProps {
  polarityScore: number;
}

const MyChart: React.FC<MyChartProps> = ({ polarityScore }) => {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: -180,
        center: ['50%', '75%'],
        radius: '90%',
        min: -1,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color:[
              [0.5, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#0000FF' }, // 蓝色
                { offset: 1, color: '#FF0000' }  // 红色
              ])]
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 10,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 5,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 8,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 12,
          distance: -40,
          rotate: 'tangential',
          formatter: function (value: number) {
            if (value === -1) {
              return '负性';
            } else if (value === 0) {
              return '中性';
            } else if (value === 1) {
              return '正性';
            }
            return '';
          }
        },
        title: {
          offsetCenter: [0, '0%'],
          fontSize: 12
        },
        detail: {
          fontSize: 10,
          offsetCenter: [0, '-35%'],
          valueAnimation: true,
          formatter: '\n标题极性值：{value}',
          color: 'inherit'
        },
        data: [
          {
            value: polarityScore.toFixed(6), // 将极性值转换为0到1之间
            name: polarityScore >= 0 ? '正性' : '负性'
          }
        ]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 180 }} />;
};

const ResultsAnalysis = () => {
  const newsTitle = "在西安高陵，你发现了吗？专家都治不了的新冠，最终都被，各村的小诊所给治了";
  const polarityScore = -0.05681818181818182; // 介于-1到1之间
  const isFakeNews = true;

  return (
    <Card hoverable title="结果分析" bordered={true}>
    <p><b>新闻标题：</b>{newsTitle}</p>
    {/* <p><b>标题极性值：</b><Text style={{color: polarityScore >= 0 ?'red' : 'blue' }}>{polarityScore}</Text></p> */}
    <MyChart polarityScore={polarityScore} />
    <p><b>是否为谣言：</b><Text style={{color:isFakeNews ?  'blue' : 'red'}}>{isFakeNews ? '是' : '否'}</Text></p>
  </Card>
  );
};

export const CommentsAnalysis = () => {
  const [clickSearch, setClickSearch] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    //变成loading状态
    console.log(info?.source, value);
    setClickSearch(true);
    setTimeout(() => {
      setVisible(true);
      setClickSearch(false);
    }, 2000);
    messageApi.open({
      type: "success",
      content: "搜索成功",
    });
  };
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [isSend, setSendTo] = useState(false);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const sendTo = () => {
    setSendTo(true);
    setTimeout(() => {
      message.success("解析成功，已生成报告！");
      setSendTo(false);
      setCurrent(current + 1);
    }, 2000);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <>
      <Steps current={current} items={items} />
      <div style={{ marginTop: 30 }}>
        {current === 0 && (
          <Row>
            <Col span={12} offset={6}>
              <Layout>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    display: "flex",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Search
                    placeholder="请输入你所需要查询的网址"
                    onSearch={onSearch}
                    enterButton
                    loading={clickSearch}
                  />
                  <Card hoverable>
                    <video
                      width="100%"
                      height="auto"
                      controls
                      hidden={!visible}
                    >
                      <source src="7186582738806328628.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Card>
                  <Button type="primary" onClick={() => next()}>
                    下一步
                  </Button>
                </Space>
              </Layout>
            </Col>
          </Row>
        )}
        {current === 1 && (
          <Button type="primary" onClick={() => sendTo()} loading={isSend}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Row gutter={16}>
          <Col span={13}>
              {/* <Card hoverable title="评论情感分布"><DemoPie /></Card> */}
              <Card hoverable title="评论情感分布">
              <EmotionPieChart />
              </Card>
            </Col>
            <Col span={11}>
            <ResultsAnalysis />
            </Col>


            <Col span={24} >
            <Card hoverable title="点赞数排名前10的评论">
              <CommentTable />
            </Card>
            
              <Button
                type="primary"
                onClick={() => message.success("解析成功，已生成报告！")}
              >
                Done
              </Button>
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                上一步
              </Button>
            </Col>
          </Row>
        )}
        {current > 0 && current < steps.length-1 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </>
  );
};