import React, { useState, useEffect } from "react";

import { Card, Space, List, Badge, Tag, Input, Button, Steps, message, Row, Col, Layout, theme, Typography,Table  } from "antd";
import type { SearchProps } from "antd/es/input/Search";

import { Pie,Column } from "@ant-design/plots";
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import axios from "axios";

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



interface EmotionDataItem {
  value: number;
  name: string;
  color: string;
}

interface EmotionPieChartProps {
  emotionData: EmotionDataItem[];
}

const EmotionPieChart: React.FC<EmotionPieChartProps> = ({ emotionData }) => {
  // 根据 emotionData 生成图表数据


  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'bottom',
      left: 'center',
      padding: [0, 10],
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 12,
        fontWeight: 'bold'
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
            fontSize: 16,
            fontWeight: 'bold',
            color: '#000'
          }
        },
        labelLine: {
          show: true
        },
        data: emotionData
      }
    ]
  };

  return <ReactECharts option={option} />;
};



const { Title, Text } = Typography;


interface CommentData {
  comment: string;
  likes: number;
  emotion: string;
}

const CommentTable = ({ data }: { data: CommentData[] }) => {
  const sortedComments = data.sort((a, b) => b.likes - a.likes);

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
      render: (text:any) => <Badge count={text}  showZero overflowCount={999} style={{ backgroundColor: '#52c41a' }} />,
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

interface ResultsAnalysisProps {
  newsTitle: string;
  polarityScore: number;
  isFakeNews: boolean;
}

const ResultsAnalysis: React.FC<ResultsAnalysisProps> = ({ newsTitle, polarityScore, isFakeNews }) => {
  return (
    <Card hoverable title="结果分析" bordered={true}>
      <p><b>新闻标题：</b>{newsTitle}</p>
      <MyChart polarityScore={polarityScore} />
      <p><b>是否为谣言：</b><Text style={{ color: isFakeNews ? 'blue' : 'red' }}>{isFakeNews ? '是' : '否'}</Text></p>
    </Card>
  );
};

export const CommentsAnalysis = () => {
  const [clickSearch, setClickSearch] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);

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
  const [commentsData, setCommentsData] = useState<CommentData[]>([]);
  const [emotionData, setEmotionData] = useState([]);
  const [newsTitle, setNewsTitle] = useState("");
  const [polarityScore, setPolarityScore] = useState(0);
  const [isFakeNews, setIsFakeNews] = useState(false);
  const [videoid, setVideoId] = useState('');
  
  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    setClickSearch(true);
    try {
      const response = await axios.post('http://1.92.98.204:5000/comments', { url: value });
      const data = response.data;
      if (Array.isArray(data.comments)) {
        setCommentsData(data.comments);  // 这里是一个数组
        setVisible(true);
        messageApi.open({
          type: "success",
          content: "搜索成功",
        });
      } else {
        throw new Error("返回的数据格式不正确");
      }
      // 检查并处理情感数据
      if (Array.isArray(data.emotionData)) {
        setEmotionData(data.emotionData);  // 这里是情感数据的数组
      } else {
        throw new Error("返回的情感数据格式不正确");
      }
      // 处理新闻标题、情感分数和假新闻标识
      setNewsTitle(data.newsTitle);
      setPolarityScore(data.polarityScore);
      setIsFakeNews(data.isFakeNews);
      setVideoId(data.videoid);
        // 处理视频ID和更新视频源

    } catch (error) {
      console.error("Failed to fetch comments data", error);
      messageApi.open({
        type: "error",
        content: "搜索失败，请稍后再试",
      });
    }
    setClickSearch(false);
  };
  
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
                    <video
                      width="100%"
                      height="auto"
                      controls
                      hidden={!visible}
                    >
                      <source src={`http://1.92.98.204:5000/download/${videoid}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

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
              <EmotionPieChart  emotionData={emotionData} />
              </Card>
            </Col>
            <Col span={11}>
            <ResultsAnalysis  
            newsTitle={newsTitle}
            polarityScore={polarityScore}
            isFakeNews={isFakeNews}/>
            </Col>


            <Col span={24} >
            <Card hoverable title="点赞数排名前10的评论">
            <CommentTable data={commentsData} />
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
