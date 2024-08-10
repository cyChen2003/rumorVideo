import React, { useState } from "react";
import { Card, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { Input } from "antd";
import ReactDOM from "react-dom";
import { Layout, Button, message, Steps, theme } from "antd";
import { Col, Row } from "antd";
import axios from "axios";

const { Search } = Input;
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
  const [url, setUrl] = useState("");
  const [apiData, setApiData] = useState(apiDataDescription);

  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    //变成loading状态
    console.log(info?.source, value);
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
      setApiData(data);
    } catch (error) {
      messageApi.error(`请求失败：${error}`);
    }
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

    const sendMessage = async () => {
      try {
        const response = await axios.get("http://1.92.98.204:5000//sendToDB/" + apiData["info_data"]["aweme_id"] + "/3");
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        else {
          message.success("发送成功！");
        }
      }
      catch (error) {
        messageApi.error(`请求失败：${error}`);
      }

    };
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
        {current === steps.length - 1 && (
          <Row gutter={16} justify="center" align="middle">
            <Col span={11}>
              <TestVideo src={"http://1.92.98.204:5000/download/" + apiData["info_data"]["aweme_id"]}  />
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              <img src="images/arrow1.png" alt="Arrow Image" style={{ maxWidth: "130%", height: "auto" }} />
            </Col>
            <Col span={11}>
              <TestVideo src={"http://1.92.98.204:5000/DefaultVideo/" + apiData["info_data"]["aweme_id"]} />
            </Col>
            <Col span={24} style={{ textAlign: "center", marginTop: 16 }}>
              <Button
                type="primary"
                onClick={() => sendMessage()}
              >
                提交
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
