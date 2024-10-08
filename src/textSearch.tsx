import React, { useState } from "react";
import { Card, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { Input } from "antd";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
import { Flex, Layout } from "antd";
import { Button, message, Steps, theme } from "antd";
import { Col, Row } from "antd";
import { Divider, List, Typography } from "antd";
import { TrafficChart } from "./trafficchart";
import { Form, Radio } from "antd";
import axios from "axios";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const description = "This is a description.";
const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;
const steps = [
  {
    title: "输入检索内容",
  },
  {
    title: "获取检索报告",
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
//编写TextSearch组件
export const TextSearch = () => {
  const [clickSearch, setClickSearch] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [inputType, setInputType] = useState<"URL" | "TEXT">("URL");
  const [currentID, setCurrentid] = useState("");

  const handleInputTypeChange = (e: any) => {
    setInputType(e.target.value);
  };

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
  const [isuploading,setuploading] = useState(false);
  const [data, setData] = useState([
    "天津塘沽发生大爆炸事故，引发伤亡人员报道，希望伤亡人数不再增加，消防战士平安归来，追责事故真相。向消防英雄致敬。",
    "天津塘沽发生大爆炸事件，官方报道死亡人数为50+,网友质疑公关处理和对消防战士亡魂的尊重。",
    "天津塘沽发生大爆炸，普通群众死亡482人，重症监护室52人没有脱离生命危险，消防大队死亡11个中队400多人，官方初报死亡人数为12名消防官兵，但网传总计死亡人数1300多人，爆炸面积方圆一公里，最近的一个居民小区全部被灭。",
    "截止目前为止，天津塘沽发生大爆炸，普通群众死亡482人，重症监护室52人没有脱离生命危险，消防大队死亡11个中队400多人，两次爆炸全部阵亡，总计死亡人数1300多人。",
    "天津塘沽发生大爆炸，死伤人数不准确，建议查看朋友圈信息。",
  ]);
  const [analysis, setAnalysis] = useState(
    "分析：\n查询内容中的关键信息是“天津塘沽大爆炸”、“消防官兵牺牲”以及对真相的需求。表达了对事件真实情况的关注，特别是对消防官兵牺牲情况的不满和对信息公开的呼吁。\n\n待选内容中：\n1. 提到了天津塘沽大爆炸、伤亡人员、向消防英雄致敬，与查询内容中事件及对消防官兵的关切相符。\n2. 涉及天津塘沽爆炸事件、官方报道与网友质疑，提到了对消防战士的尊重，与查询内容中对真相追求的意图相呼应。\n3. 给出了详细的伤亡数据，包括消防大队的损失，直接关联到查询内容中对消防官兵牺牲的提及。\n4. 同样提供了具体的伤亡数字，强调了消防官兵的重大损失，与查询内容中对牺牲情况的关注一致。\n5. 虽然提到天津塘沽大爆炸和死伤人数不准确，但更多是建议查看朋友圈信息，与查询内容中对公开真相的诉求有部分关联，但不如其他选项直接。\n\n结论：\n查询内容与所有待选内容都紧密相关，因为它们共同关注了天津塘沽大爆炸这一事件，特别是对消防官兵牺牲的关注和对真相的寻求。如果必须选择一个最相关的，可能是第3项，因为它提供了详细的伤亡数据，直接回应了查询内容中对消防官兵明确牺牲情况的关注。因此，结论为3。"
  );
  const [overallAnalysis, setOverallAnalysis] = useState("害害害");
  const [desItem, setDesItem] = useState([
    {
      key: "1",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            color: "#333",
            fontSize: "15px",
          }}
        >
          <b>搜索内容</b>
        </div>
      ),
      children: "天津塘沽大爆炸消防官兵牺牲！",
    },
    {
      key: "2",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            color: "#333",
            fontSize: "15px",
          }}
        >
          <b>已知谣言相似度得分</b>
        </div>
      ),
      children: "0.94",
    },
    {
      key: "3",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            color: "#333",
            fontSize: "15px",
          }}
        >
          <b>结论</b>
        </div>
      ),
      children: "谣言",
    },
  ]);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const constructURL = (id:string) => {
    // 使用模板字面量拼接字符串
    return `http://1.92.98.204:5000/sendToDB/${id}/3`;
  };
  const sendToDB = async () => {
    setuploading(true);
    if (!currentID) {
      message.error("非url检索！");
      setuploading(false);
      return;
    }
    const url = constructURL(currentID)
    try {
      const response = await axios.get(
        url,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.data;
      if (!data){
        message.error("提交报告失败！")
        setuploading(false);
        return;
      }
      else{
        message.success("提交报告成功！");
        setuploading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const extractModelValue = (url: string) => {
    const regex = /modal_id=(\d+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return "";
  };

  const sendTo = async () => {
    setSendTo(true);
    const inputContent = form.getFieldValue("inputContent");
    if (!inputContent) {
      message.error("请输入内容！");
      setSendTo(false);
      return;
    }
    if (inputType === "URL") {
      const idvalue = extractModelValue(inputContent);
      setCurrentid(idvalue);
    }
    const payload =
      inputType === "URL"
        ? { content: inputContent, type: "url" }
        : { content: inputContent, type: "text" };
    console.log(payload);
    try {
      const response = await axios.post(
        "http://1.92.98.204:5000/KnownRumorDetection",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.data;
      const updatedDesItem = [
        {
          key: "1",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                color: "#333",
                fontSize: "15px",
              }}
            >
              <b>搜索内容</b>
            </div>
          ),
          children: data["targettext"],
        },
        {
          key: "2",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                color: "#333",
                fontSize: "15px",
              }}
            >
              <b>已知谣言相似度得分</b>
            </div>
          ),
          children: data["max_score"],
        },
        {
          key: "3",
          label: (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                color: "#333",
                fontSize: "15px",
              }}
            >
              <b>结论</b>
            </div>
          ),
          children: data["conclusion"] === 0 ? "非谣言" : "谣言",
        },
      ];
      setDesItem(updatedDesItem);
      setAnalysis(data["analysis"]);
      setData(data["optionList"]);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      message.success("解析成功，已生成报告！");
      setSendTo(false);
      setCurrent(current + 1);
    }, 200);
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
                  <Form form={form} style={{ maxWidth: 600 }}>
                    <Form.Item label="输入类型">
                      <Radio.Group
                        value={inputType}
                        onChange={handleInputTypeChange}
                      >
                        <Radio.Button value="URL">URL</Radio.Button>
                        <Radio.Button value="TEXT">文本</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      name="inputContent"
                      label={inputType === "URL" ? "URL输入" : "文本输入"}
                    >
                      <Input
                        placeholder={
                          inputType === "URL" ? "请输入URL" : "请输入文本"
                        }
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={() => sendTo()}
                        loading={isSend}
                      >
                        搜索
                      </Button>
                    </Form.Item>
                  </Form>
                  {/* <TrafficChart/> */}
                </Space>
              </Layout>
            </Col>
          </Row>
        )}
        {current === steps.length - 1 && (
          <>
            <Row style={{ marginBottom: 20 }}>
              <Col span={24}>
                <Card hoverable title="综合分析">
                  <Descriptions layout="vertical" items={desItem} />
                </Card>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={11}>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    display: "flex",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Card hoverable title="检索结果">
                    <List
                      dataSource={data}
                      renderItem={(item, index) => (
                        <List.Item>
                          {index + 1}. {item}
                        </List.Item>
                      )}
                    />
                  </Card>
                </Space>
                {/* <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                上一步
              </Button> */}
              </Col>
              <Col span={13}>
                <Space
                  direction="vertical"
                  size="middle"
                  style={{
                    display: "flex",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Card hoverable title="分析：">
                    <div style={{ whiteSpace: "pre-wrap" }}>{analysis}</div>
                  </Card>
                </Space>
              </Col>
            </Row>
          </>
        )}
        {current === steps.length - 1 && (
          <Space direction="horizontal" size="small">
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              上一步
            </Button>
            <Button type="primary" onClick={() => sendToDB()} loading={isuploading}>
              提交报告
            </Button>
          </Space>
        )}
      </div>
    </>
  );
};
