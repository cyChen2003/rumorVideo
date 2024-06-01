import React, { useState, useEffect } from "react";

import { Card, Space, List, Badge, Tag, Input, Button, Steps, message, Row, Col, Layout, theme, Typography  } from "antd";
import type { SearchProps } from "antd/es/input/Search";

import { Pie,Column } from "@ant-design/plots";

const { Search } = Input;

const steps = [
  {
    title: "输入需要解析的网址",
  },
  {
    title: "上传解析内容",
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

const commentsData = [
  { comment: "专家没办法了，高手在民间[感谢][感谢]", likes: 12, emotion: "trust" },
  { comment: "说的太好了，我得给你点个赞", likes: 10, emotion: "positive" },
  { comment: "我是自己治的。随便吃了点药就好了[捂脸]", likes: 2, emotion: "positive" },
  { comment: "不是人家治不了，根本就不想让你好", likes: 22, emotion: "negative" },
  { comment: "那你说那些在家呆着没吃药没打针的是谁治好的呢？[捂脸][捂脸][捂脸]", likes: 2, emotion: "negative" }
  // Add more comments as needed
];
const { Title, Text } = Typography;
const CommentList = () => {
  const sortedComments = commentsData.sort((a, b) => b.likes - a.likes);

  return (
    <div>
    
    <List
      itemLayout="horizontal"
      dataSource={sortedComments}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            description={item.comment}
          />
          <Badge count={item.likes} overflowCount={999} style={{ backgroundColor: '#52c41a' }} />
          <Tag color={item.emotion === 'positive' ? 'red' : item.emotion === 'negative' ? 'green' : 'blue'}>
            {item.emotion}
          </Tag>
        </List.Item>
      )}
    />
    </div>
  );
};


const ResultsAnalysis = () => {
  const newsTitle = "在西安高陵，你发现了吗？专家都治不了的新冠，最终都被，各村的小诊所给治了#西安#西安美食#西安买房#西安楼市#西安高陵窗帘张姐";
  const polarityScore = -0.05681818181818182; // 介于-1到1之间
  const isFakeNews = true;

  return (
    <Card hoverable title="结果分析" bordered={true}>
    <p><b>新闻标题：</b>{newsTitle}</p>
    <p><b>标题极性值：</b><Text type={polarityScore >= 0 ? 'success' : 'danger'}>{polarityScore}</Text></p>
    <p><b>是否为虚假新闻：</b><Text type={isFakeNews ? 'danger' : 'success'}>{isFakeNews ? '是' : '否'}</Text></p>
  </Card>
    // <div style={{ padding: '10px' }}>
    //     <Title level={4}>新闻标题</Title>
    //     <Text>{newsTitle}</Text>
    //     <div style={{ marginTop: '10px' }}>
    //       <Text strong>标题情感极性值: </Text>
    //       <Text type={polarityScore >= 0 ? 'success' : 'danger'}>{polarityScore}</Text>
    //     </div>
    //     <div style={{ marginTop: '10px' }}>
    //       <Text strong>是否为虚假新闻: </Text>
    //       <Text type={isFakeNews ? 'danger' : 'success'}>{isFakeNews ? '是' : '否'}</Text>
    //     </div>
    // </div>
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
                      <source src="your-video-file.mp4" type="video/mp4" />
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
          <Col span={12}>
              <Card hoverable title="评论情感分布"><DemoPie /></Card>
            </Col>
            <Col span={12}>
            <ResultsAnalysis />
            <Card hoverable title="点赞数排名前5的评论">
              <CommentList />
            </Card>
            </Col>

            <Col span={24} >
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
