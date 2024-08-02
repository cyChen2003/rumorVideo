import React, { useState } from 'react';
import { Table, Input, Button, DatePicker, Select, Card, Row, Col } from 'antd';

import {  Space, List, Badge, Tag, Steps, message, Layout, theme, Typography } from "antd";
import dayjs, { Dayjs } from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import isBetween from 'dayjs/plugin/isBetween';
import { SearchProps } from 'antd/es/input';
const { RangePicker } = DatePicker;
const { Option } = Select;

interface Comment {
  id: number;
  content: string;
  date: string;
  article: string;
  emotion: string;
  likes: number;
  rumor:string;
}

const commentsData: Comment[] = [
  // 示例数据，实际应用中需要从服务器获取
  { id: 1, content: '一看太空一类的东西就感觉人活着真没啥意思 就当欣赏美景', date: '2023-01-01', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '悲伤', likes: 41, 'rumor':'是'},
  { id: 2, content: '地球本就是地外文明的附属品，随你怎么扑腾也翻不出太阳系。', date: '2023-01-01', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '厌恶', likes: 40 , 'rumor':'是'},
  { id: 3, content: '斗转星移啊！移开了', date: '2023-01-01', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '期待', likes: 0, 'rumor':'是' },
  { id: 4, content: '有一种天龙星人专吃人类，别把他们吸引来就好了', date: '2023-01-03', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '恐惧', likes: 17, 'rumor':'是' },
  { id: 5, content: '只不过光不是连续的而已，有啥大惊小怪的，更关了灯在开不一样嘛！ 勤于思考，对大脑有好处', date: '2023-01-02', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '信任', likes: 8, 'rumor':'是' },
  { id: 6, content: '霍金没说为什么不可以接触外星文明 遗憾', date: '2023-01-06', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '悲伤', likes: 10, 'rumor':'是' },
  { id: 7, content: '就怕过来收太阳，如果真来怎么办？', date: '2023-01-07', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '恐惧', likes: 7, 'rumor':'是' },
  { id: 8, content: '收保护费了', date: '2023-01-08', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '愤怒', likes: 0, 'rumor':'是' },
  { id: 9, content: '宇宙中必然有一种神秘的力量主宰着宇宙，被人们称为上苍。宇宙中的一切现象均为表象，如芸花一现。就像人一样来无踪去无影，只不过是物质运动的原子成分的聚散。珍爱生命，珍惜人生。', date: '2023-01-09', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '信任', likes: 5, 'rumor':'是' },
  { id: 10, content: '天啊一百多棵恒星消失你品细细品', date: '2023-01-10', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '惊讶', likes: 3, 'rumor':'是' },
  { id: 11, content: '宇宙是虚拟的', date: '2023-01-11', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '惊讶', likes: 4, 'rumor':'是' },
  { id: 12, content: '我早就说过，所谓天空星星，都是外星文明的巨大飞碟，由智慧生命操控，在规则范围内活动，哪天发现不见了，那就是调动工作了。这也解释了为什么这些星体能够长期悬浮在空中的原因。', date: '2023-01-12', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '信任', likes: 3 , 'rumor':'是'},
  { id: 13, content: '旅行者一号就不应该把唱片带上去', date: '2023-01-13', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '厌恶', likes: 3 , 'rumor':'是'},
  { id: 14, content: '人类终将逃不过灭亡，外星人也一样同在宇宙。', date: '2023-01-14', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '悲伤', likes: 3, 'rumor':'是' },
  { id: 15, content: '外星人准备重新洗牌了，', date: '2023-01-15', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '期待', likes: 2, 'rumor':'是' },
  { id: 16, content: '被封印了？', date: '2023-01-16', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '惊讶', likes: 2, 'rumor':'是' },
  { id: 17, content: '操心这么多干嘛呢？有吃有喝，有工作，家人平安比什麽都好，我敢说刷到这个视频的人没有一个能担起拯救地球的这个使命，得过且过吧，快活一天是一天', date: '2023-01-17', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '快乐', likes: 2, 'rumor':'是' },
  { id: 18, content: '我在想，', date: '2023-01-18', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '信任', likes: 0, 'rumor':'是' },
  { id: 19, content: '已经出现噬星者了', date: '2023-01-19', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '恐惧', likes: 1, 'rumor':'是' },
  { id: 20, content: '在过一段时间地球也凭空消失了', date: '2023-01-20', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '恐惧', likes: 0, 'rumor':'是' },
  { id: 21, content: '跟人一样，修房子，我们是挖地球，它们是挖星', date: '2023-01-21', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '愤怒', likes: 0, 'rumor':'是' },
  { id: 22, content: '我们一直都在地球，你们都不知道吗', date: '2023-01-22', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '信任', likes: 1, 'rumor':'是' },
  { id: 23, content: '被黑洞吃了', date: '2023-01-23', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '惊讶', likes: 0, 'rumor':'是' },
  { id: 24, content: '灭霸把他们征服了', date: '2023-01-24', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '厌恶', likes: 0, 'rumor':'是' },
  { id: 25, content: '宇宙尘埃挡住了吧这种事我记得以前也有过好几次', date: '2023-01-25', article: '要不要主动和外星人接触？霍金曾经警告过人类', emotion: '信任', likes: 1, 'rumor':'是' },
  { id: 26, content: '宇宙这么大，我连一间房子都空间都没有', date: '2023-02-01', article: '近半个世纪以来，至少上百颗恒星离奇消失！到底是何原因？', emotion: '悲伤', likes: 1744, 'rumor':'否' }
]
export const CommentDataViewer: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Comment[]>(commentsData);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [sentimentFilter, setSentimentFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const handleSearch = () => {
    let data = commentsData;

    if (searchKeyword) {
      data = data.filter(comment => comment.content.includes(searchKeyword) || comment.article.includes(searchKeyword));
    }

    if (dateRange && dateRange[0] && dateRange[1]) {
      data = data.filter(comment => dayjs(comment.date).isBetween(dateRange[0], dateRange[1], 'day', '[]'));
    }

    if (sentimentFilter) {
      data = data.filter(comment => comment.rumor === (sentimentFilter === '虚假' ? '是' : '否'));
    }
  
    setFilteredData(data);
  };

  const columns: ColumnsType<Comment> = [
    { title: '评论内容', dataIndex: 'content', key: 'content' },
    {
      title: '时间',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      sorter: (a: Comment, b: Comment) => dayjs(a.date).unix() - dayjs(b.date).unix()
    },
    { title: '所属文章', width: 200, dataIndex: 'article', key: 'article' },
    {
      title: '情感分析',
      width: 120,
      dataIndex: 'emotion',
      key: 'emotion',
      render: (text: string) => (
        <Tag color={
          text === '愤怒' ? '#D32F2F' :
          text === '恐惧' ? '#303F9F' :
          text === '期待' ? '#FFA726' :
          text === '信任' ? '#29B6F6' :
          text === '惊讶' ? '#FFEB3B' :
          text === '悲伤' ? '#1976D2' :
          text === '快乐' ? '#EC407A' : '#388E3C'
        }>
          {text}
        </Tag>
      )
    },
  
    { title: '点赞数', width: 100, dataIndex: 'likes', key: 'likes', render: (text:any) => <Badge count={text} showZero overflowCount={999} style={{ backgroundColor: '#52c41a' }} /> },
    { title: '谣言', dataIndex: 'rumor', key: 'rumor' }
  ];
  
  return (
    <Card hoverable title="评论数据查看" bordered={true} style={{ borderRadius: 10, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Input
            placeholder="搜索评论或文章"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <RangePicker
            value={dateRange}
            onChange={dates => setDateRange(dates as [Dayjs | null, Dayjs | null])}
          />
        </Col>
        <Col span={4}>
          <Select
            placeholder="选择情感"
            value={sentimentFilter}
            onChange={value => setSentimentFilter(value)}
            style={{ width: '100%' }}
          >
            <Option value="">全部</Option>
            <Option value="虚假">虚假</Option>
            <Option value="真实">真实</Option>
          </Select>
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={handleSearch}>搜索</Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }
        }}
        style={{ marginTop: 16 }}
      />
    </Card>
  );
};
