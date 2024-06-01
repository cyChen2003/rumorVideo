import React, { useState } from "react";
import { Card, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { Input } from "antd";
import ReactDOM from "react-dom";
import { Layout, Button, message, Steps, theme } from "antd";
import { Col, Row } from "antd";

const { Search } = Input;

const steps = [
  {
    title: "输入需要解析的网址",
  },
  {
    title: "获取检测报告",
  },
];

interface TestVideoProps {
  src: string;
}

const TestVideo: React.FC<TestVideoProps> = ({ src }) => (
  <div style={{ 
    position: "relative", 
    width: "90%", 
    paddingBottom: "calc(90% / 3 * 4)", // 3:4 aspect ratio
    height: 0, 
    backgroundColor: "#ffffff", // background color for white borders
    overflow: "hidden" 
  }}>
    <video style={{ 
      position: "absolute", 
      top: "50%", 
      left: "50%", 
      width: "100%", 
      height: "100%", 
      transform: "translate(-50%, -50%)", 
      objectFit: "contain", 
      backgroundColor: "#ffffff" // background color for white borders
    }} controls>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
);

//编写Deepfake1组件
export const Deepfake1 = () => {
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
    setTimeout(() => {
      setCurrent(current + 1);
    }, 2000);
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
      {contextHolder}
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
                      <source src="pristine3.mp4" type="video/mp4" />
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
        {current === steps.length - 1 && (
          <Row gutter={16} justify="center" align="middle">
            <Col span={11}>
              <TestVideo src="pristine3.mp4" />
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <img src="images/arrow2.png" alt="Arrow Image" style={{ maxWidth: "130%", height: "auto" }} />
            </Col>
            <Col span={11}>
              <TestVideo src="pristine4.mp4" />
            </Col>
            <Col span={24} style={{ textAlign: "center", marginTop: 16 }}>
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
        {current > 0 && current < steps.length - 1 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </>
  );
};
