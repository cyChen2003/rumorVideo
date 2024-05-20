import React, { useState } from "react";
import { Card, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { Input } from "antd";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
import { Flex, Layout } from "antd";
import { Button, message, Steps, theme } from "antd";
import { Col, Row } from "antd";

const description = "This is a description.";
const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;
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
const TestPie = () => {
  const config = {
    data: [
      { type: "真", value: 0.87 },
      { type: "假", value: 0.13 },
    ],
    angleField: "value",
    colorField: "type",
    paddingRight: 80,
    label: {
      text: "value",
      position: "outside",
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};
//编写CrossTransformer组件
export const CrossTransformer = () => {
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
          <Row>
            <Col span={12} offset={6}>
              <TestPie />
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
