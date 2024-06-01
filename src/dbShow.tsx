import React, { useState } from "react";
import { Card, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { Input,Modal,Form,Checkbox } from "antd";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
import { Flex, Layout } from "antd";
import { Button, message, Steps, theme } from "antd";
import { Col, Row } from "antd";
import { Divider, List, Typography } from 'antd';
import { Table } from 'antd';
import { Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

const description = "This is a description.";
const { Search } = Input;

const { Header, Content, Footer, Sider } = Layout;

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
export const DbShow = () => {
  const [clickSearch, setClickSearch] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('已知谣言');

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

  const data = [
    {
      key: '1',
      weiboId: '7370929647812463883',
      content: '三岁女孩被拐！现场监控曝光！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463883',
      postTime: '2024-05-01 10:00',
      retweetCount: 58,
      commentCount: 24,
      likeCount: 112,
      reportReason: '已知谣言',
    },
    {
      key: '2',
      weiboId: '7370929647812463884',
      content: '上海城管暴力执法，舅妈被打致死！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463884',
      postTime: '2024-05-02 11:00',
      retweetCount: 150,
      commentCount: 75,
      likeCount: 230,
      reportReason: '深度伪造',
    },
    {
      key: '3',
      weiboId: '7370929647812463885',
      content: '紧急寻人！两女孩分别在锦绣花园和世纪家园失踪！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463885',
      postTime: '2024-05-03 12:00',
      retweetCount: 210,
      commentCount: 130,
      likeCount: 340,
      reportReason: '评论语义',
    },
    {
      key: '4',
      weiboId: '7370929647812463886',
      content: '上海闵行区城管执法致死事件，引发社会关注！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463886',
      postTime: '2024-05-04 13:00',
      retweetCount: 95,
      commentCount: 50,
      likeCount: 145,
      reportReason: '多模态检测',
    },
    {
      key: '5',
      weiboId: '7370929647812463887',
      content: '学弟亲舅妈被上海城管打死，求公道！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463887',
      postTime: '2024-05-05 14:00',
      retweetCount: 320,
      commentCount: 210,
      likeCount: 430,
      reportReason: '已知谣言',
    },
    {
      key: '6',
      weiboId: '7370929647812463888',
      content: '三岁女孩被四十岁男人抱走！紧急寻人！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463888',
      postTime: '2024-05-06 15:00',
      retweetCount: 78,
      commentCount: 39,
      likeCount: 150,
      reportReason: '深度伪造',
    },
    {
      key: '7',
      weiboId: '7370929647812463889',
      content: '锦绣花园小区三岁女孩失踪，监控还原全过程！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463889',
      postTime: '2024-05-07 16:00',
      retweetCount: 90,
      commentCount: 45,
      likeCount: 160,
      reportReason: '评论语义',
    },
    {
      key: '8',
      weiboId: '7370929647812463890',
      content: '惊！城管暴力执法致死，亲友求公道！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463890',
      postTime: '2024-05-08 17:00',
      retweetCount: 130,
      commentCount: 65,
      likeCount: 200,
      reportReason: '多模态检测',
    },
    {
      key: '9',
      weiboId: '7370929647812463891',
      content: '三岁女孩被拐，家长急寻！请大家帮忙转发！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463891',
      postTime: '2024-05-09 18:00',
      retweetCount: 150,
      commentCount: 75,
      likeCount: 220,
      reportReason: '已知谣言',
    },
    {
      key: '10',
      weiboId: '7370929647812463892',
      content: '锦绣花园小区女孩被拐，监控拍下全过程！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463892',
      postTime: '2024-05-10 19:00',
      retweetCount: 80,
      commentCount: 40,
      likeCount: 140,
      reportReason: '深度伪造',
    },
    {
      key: '11',
      weiboId: '7370929647812463893',
      content: '上海城管暴力执法致死，家属求助！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463893',
      postTime: '2024-05-11 20:00',
      retweetCount: 95,
      commentCount: 50,
      likeCount: 150,
      reportReason: '评论语义',
    },
    {
      key: '12',
      weiboId: '7370929647812463894',
      content: '上海闵行区城管暴力执法事件引发热议！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463894',
      postTime: '2024-05-12 21:00',
      retweetCount: 200,
      commentCount: 100,
      likeCount: 300,
      reportReason: '多模态检测',
    },
    {
      key: '13',
      weiboId: '7370929647812463895',
      content: '三岁女孩被拐事件，监控视频曝光！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463895',
      postTime: '2024-05-13 22:00',
      retweetCount: 75,
      commentCount: 35,
      likeCount: 120,
      reportReason: '已知谣言',
    },
    {
      key: '14',
      weiboId: '7370929647812463896',
      content: '上海城管打死商家事件，社会呼吁公道！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463896',
      postTime: '2024-05-14 08:00',
      retweetCount: 220,
      commentCount: 110,
      likeCount: 350,
      reportReason: '深度伪造',
    },
    {
      key: '15',
      weiboId: '7370929647812463897',
      content: '紧急！锦绣花园小区三岁女孩失踪，家长急寻！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463897',
      postTime: '2024-05-15 09:00',
      retweetCount: 140,
      commentCount: 60,
      likeCount: 210,
      reportReason: '评论语义',
    },
    {
      key: '16',
      weiboId: '7370929647812463898',
      content: '上海城管暴力执法致人死亡，视频曝光！',
      imageUrl: 'https://www.douyin.com/discover?modal_id=7370929647812463898',
      postTime: '2024-05-16 10:00',
      retweetCount: 160,
      commentCount: 70,
      likeCount: 250,
      reportReason: '多模态检测',
    },
  ];


  interface DataType {
    key: React.Key;
    weiboId: string;
    content: string;
    imageUrl: string;
    postTime: string;
    retweetCount: number;
    commentCount: number;
    likeCount: number;
    reportReason: string;
  }
  const columns: TableColumnsType<DataType> = [
  {
    title: '发布者ID',
    dataIndex: 'weiboId',
    key: 'weiboId',
    width: '13%'
  },
  {
    title: '短视频标题',
    dataIndex: 'content',
    key: 'content',
    width: '20%'
  },
  {
    title: '短视频url',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width: '21%'
  },
  {
    title: '审核时间',
    dataIndex: 'postTime',
    key: 'postTime',
    width: '11%',
    sorter: (a, b) => a.postTime.localeCompare(b.postTime),
  },
  {
    title: '转发数',
    dataIndex: 'retweetCount',
    key: 'retweetCount',
    width: '8%'
  },
  {
    title: '评论数',
    dataIndex: 'commentCount',
    key: 'commentCount',
    width: '8%'
  },
  {
    title: '点赞数',
    dataIndex: 'likeCount',
    key: 'likeCount',
    width: '8%'
  },
  {
    title: '举报原因',
    dataIndex: 'reportReason',
    key: 'reportReason',
    width: '10%',
    sorter: (a, b) => a.reportReason.localeCompare(b.reportReason),
    sortDirections: ['ascend', 'descend', 'ascend'],
    render: (reason:string) => {
      let color = 'red';
      if (reason === '评论语义') {
        color = 'volcano';
      } else if (reason === '多模态检测') {
        color = 'green';
      } else if (reason === '深度伪造') {
        color = 'gold';
      } else if (reason === '已知谣言'){
        color = 'geekblue'
      }
      return (
        <Tag color={color} key={reason}>
          {reason}
        </Tag>
      );
    },
  },
  {
    title: '操作',
    key: 'operation',
    align: 'center' as const,
    width: '5%',
    render: (_: any, record: any) => (
      <Space size="middle">
        <Button type="link" onClick={() => showModal(record)}>修改</Button>
      </Space>
    ),
  },
];
  const showModal = (record: any) => {
    setSelectedRow(record);
    setModalVisible(true);
    setValue(record.reportReason);
  };
  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleDelete = () => {
    // 这里处理删除逻辑
    setModalVisible(false);
  };
  const isAnyCheckboxChecked = (): boolean => {
    // 这里检查复选框状态
    return false;
  };
  const handleChange = (checkedValues: string[]) => {
    console.log('checkedValues:', checkedValues);
  };
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
        {current === 0 && (
          <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
              />
              <Modal
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  // <Button key="back" onClick={handleCancel}>
                  //   返回
                  // </Button>,
                  <Button key="submit" type="primary" onClick={handleOk}>
                    提交修改
                  </Button>,
                  <Button
                    key="link" type="primary" danger onClick={handleDelete}
                  >
                    删除该项
                  </Button>,
                ]}
              >
                
                  <Flex gap="middle" vertical>
                    <Card title="视频信息">
                      <p><strong>短视频标题:</strong> {selectedRow?.content}</p>
                      <p><strong>审核时间:</strong> {selectedRow?.postTime}</p>
                      <p><strong>举报原因:</strong> {selectedRow?.reportReason}</p>
                    </Card>
                  
                    <Card title="修改举报原因">
                    
                    <Radio.Group onChange={onChange} value={value}>
                      <Radio value={'已知谣言'} disabled = {selectedRow?.reportReason === '已知谣言'}>已知谣言</Radio>
                      <Radio value={'多模态检测'} disabled = {selectedRow?.reportReason === '多模态检测'}>多模态检测</Radio>
                      <Radio value={'深度伪造'} disabled = {selectedRow?.reportReason === '深度伪造'}>深度伪造</Radio>
                      <Radio value={'评论语义'} disabled = {selectedRow?.reportReason === '评论语义'}>评论语义</Radio>
                    </Radio.Group>
                    </Card>
                    </Flex>
              </Modal>
            </Col>
          </Row>
        )}
    </>
  );
};
