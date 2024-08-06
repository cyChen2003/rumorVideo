import React, { useState } from "react";
import { Card, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { Input } from "antd";
import ReactDOM from "react-dom";
// import fetch from "isomorphic-fetch";
import axios from "axios";
import { Pie } from "@ant-design/plots";
import { Flex, Layout } from "antd";
import { Button, message, Steps, theme } from "antd";
import { Col, Row } from "antd";
import { Table, Tag } from 'antd';

import type { TableColumnsType, TableProps } from 'antd';
const description = "This is a description.";
const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;
const apiDataDescription =
    {
      'info_data': {"aweme_id": "7399401189047012635", "video_desc": "冠军站着，我们坐下。游泳健儿用实力赢得尊重。#巴黎奥运会", "ocr_content": "颁奖合影时有意思的一幕 MING /IMMING 示意“冠军要站在上面” 美国队和法国队坐了下来 美国队和法国队坐了下来 爱你 Wi C@ USA PARIS2024 赛后队员们一一握手拥抱 用实力赢得尊重 新闻 央视", "keywords": "冠军站着，我们坐下。游泳健儿用实力赢得尊重。#巴黎奥运会", "author_info": {"author_name": "央视新闻", "signature": "我用心，你放心。", "total_favorited": 9026746494}, "comments": [["潘展乐，你是我爹！", 80933], ["跳水有全红婵，游泳有潘展乐，网球有郑钦文，看着不断涌现的新鲜血液接过前辈衣钵的时候，内心就感慨万千，这就叫传承。", 12927], ["潘展乐是那个小时候说要超越孙杨的孩子么？", 43726], ["陈若琳一笑倾城 全红婵一跳封\n神!我一跳全村吃席", 23263], ["让我们记住他们的名字!第一棒仰泳:徐嘉余 第二棒蛙泳:覃海洋 第三棒蝶泳:孙佳俊 第四棒自由泳:潘展乐!你们会被载入中国泳坛的历史，世界泳坛的历史!感动!自豪!", 22937], ["何润东长得像潘展乐[捂脸]", 3128], ["他们四个肩膀都好宽好看", 817], ["潘展乐泉州人，自幼随父母移居温州生活，是我们泉州的骄傲！[赞][赞]", 4632], ["这才是尊重，不要饭圈文化！要的是尊重每一位为国争光的人！！！", 2329], ["潘展乐就是水中的博尔特！小伙子接下来就是中国游泳队的定海神针[比心][比心][比心]", 3585], ["实力征服对手", 836], ["那些说潘展乐像何润东的是不是说反了[呲牙][呲牙]", 711], ["徐嘉余、覃海洋、孙佳俊、潘展乐！🥇\n打破美国40年的垄断，今天过生日潘展乐真神！中国队🇨🇳牛！[比心][比心][比心]", 2277], ["潘展乐个人资料：湖北红安人，家住红安新天地中国第一滩上，自幼就能潜水徒手抓20斤的大鱼，湖上渔民望而生畏，人称“浪里白条”，我们湖北人的骄傲[赞][赞][赞][赞]", 2405], ["他们怕潘展乐 diss 他们[捂脸]，不过还是实力强劲", 333], ["我以为眼花[捂脸][捂脸][捂脸]8.5号，最后一看，熬夜剪辑出来的属于我们国家高光瞬间[赞][赞][赞]中国万岁", 9], ["有一种强烈的民族自豪感谁懂啊[泣不成声]", 911], ["他们四个都是神，徐嘉余和覃海洋稍微领先，孙佳俊也是拼了，潘队爆发兜底，中国游泳队牛比！[比心][比心][比心][鼓掌][鼓掌][鼓掌]", 1076], ["潘展乐生日快乐！你们是好样的！[鼓掌][鼓掌][鼓掌][鼓掌][赞][赞][赞][赞]", 344], ["这场比赛看的我心情澎湃，我要立马画一张逆转的潘展乐！大家等等我[赞][赞][赞]", 618]]},
      'status': 200,
    }
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

interface DataType {
  key: string;
  name: string;
  content: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '特征',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: '标题',
    content: "三岁女孩被拐!现场监控曝光",
  },
  {
    key: '2',
    name: '作者信息',
    content: '作者：正能量的瞬间 简介：传递正能量的瞬间 分享平凡中的感动点滴 治愈所有的不开心',
  },
  {
    key: '3',
    name: '作者粉丝数',
    content: '5398',
  },
  {
    key: '4',
    name: '发布时间',
    content: '2021-08-12',
  },
  {
    key: '5',
    name: '评论数',
    content: '1303',
  },


];
interface PieDataType {
  type: string;
  value: number;
}

const TestPie = ({ pieData }: { pieData: PieDataType[] }) => {
  const config = {
    data: pieData,
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
  const [pieData, setPieData] = useState([
    { type: "真", value: 0.875 },
    { type: "假", value: 0.125 },
  ]);
  const [clickSearch, setClickSearch] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);
  const [apiData, setApiData] = useState(apiDataDescription);
  const [apiVideoInfo, setApiVideoInfo] = useState(data);
  const [urlData,setUrl] = useState("");
  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    //变成loading状态
    setUrl(value);
    console.log(info?.source, value);
    setClickSearch(true);
    try {
        const response = await axios.post(
            'http://1.92.98.204:5000/crawler',
            { url: value }, // 正确的请求体
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.data;
      const tempdata = [
        {
          key: '1',
          name: '标题',
          content: data["info_data"]["video_desc"],
        },
        {
          key: '2',
          name: '作者信息',
          content: "作者:"+data["info_data"]["author_info"]["author_name"]+" 简介:"+data["info_data"]["author_info"]["signature"],
      },
      {
        key: '3',
            name: '作者粉丝数',
          content: data["info_data"]["author_info"]["total_favorited"],
      },
      {
        key: '4',
            name: '视频ID',
          content: data["info_data"]["aweme_id"],
      },
      {
        key: '5',
            name: '最火评论',
          content: data["info_data"]["comments"][0][0],
      },
    ];
      setApiData(data);
      setApiVideoInfo(tempdata);
      console.log(data);
    } catch (error) {
      messageApi.error(`请求失败：${error}`);
    }
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
  const [multiData, setMultiData] = useState(null);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const sendTo = async () => {
    setSendTo(true);
    try {
      const response = await axios.post("http://1.92.98.204:5000/Multimodal_rumor_detection", {
        url: urlData,
      });
      console.log(response);
      const data = await response.data;
      setMultiData(data);
      const pieData = [
          { type: "真", value: data["real_probability"] },
          { type: "假", value: data["fake_probability"] },
      ];
      setPieData(pieData);
      console.log(data);
    } catch (error) {
      messageApi.error(`请求失败：${error}`);
    }


    message.success("解析成功，已生成报告！");
    setSendTo(false);
    setCurrent(current + 1);

  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  // @ts-ignore
  // @ts-ignore
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
                  <Card hoverable hidden={!visible}>
                    <video
                        width="100%"
                        height="auto"
                        controls
                        style={{ display: visible ? 'block' : 'none' }} // 根据visible的值决定视频的显示
                    >
                      {visible && (
                          <source
                              src={"http://1.92.98.204:5000/download/" + apiData["info_data"]["aweme_id"]}
                              type="video/mp4"
                          />
                      )}
                    </video>
                    {apiData && apiData["info_data"]["video_desc"] ? apiData["info_data"]["video_desc"] : "三岁女孩被拐!现场监控曝光!"}
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
            <Row>
              <Col span={12} offset={6}>
            <Table columns={columns} dataSource={apiVideoInfo} pagination={false}/>
                <div style={{ marginBottom: 20 }}></div>
          <Button type="primary" onClick={() => sendTo()} loading={isSend}>
            下一步
          </Button>
                <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                  上一步
                </Button>
              </Col>
            </Row>
        )}
        {current === steps.length - 1 && (
          <Row>
            <Col span={12} offset={6}>
              <TestPie pieData={pieData}/>
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
      </div>
    </>
  );
};
