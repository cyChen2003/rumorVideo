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
  {
    "id": 1,
    "content": "第八种就是不对，害人",
    "date": "2024-07-28",
    "article": "2022年新国标红绿灯#交通安全知识点 #红绿灯规则",
    "emotion": "愤怒",
    "likes": 3,
    "rumor": "否"
},
{
    "id": 2,
    "content": "相当不应该制造这种灯，",
    "date": "2024-08-01",
    "article": "2022年新国标红绿灯#交通安全知识点 #红绿灯规则",
    "emotion": "厌恶",
    "likes": 1,
    "rumor": "否"
},
{
    "id": 3,
    "content": "谁知道这是坏了还是怎么回事",
    "date": "2024-07-15",
    "article": "2022年新国标红绿灯#交通安全知识点 #红绿灯规则",
    "emotion": "惊讶",
    "likes": 1,
    "rumor": "否"
},
{
    "id": 4,
    "content": "这样只能减少通过量。",
    "date": "2024-08-03",
    "article": "2022年新国标红绿灯#交通安全知识点 #红绿灯规则",
    "emotion": "厌恶",
    "likes": 5,
    "rumor": "否"
},
{
    "id": 5,
    "content": "没有黄灯，还没有秒表，压线变灯怎么办",
    "date": "2024-07-20",
    "article": "2022年新国标红绿灯#交通安全知识点 #红绿灯规则",
    "emotion": "恐惧",
    "likes": 0,
    "rumor": "否"
},
{
    "id": 6,
    "content": "在网上买的青香蕉，到家后放个把星期才熟的那种，应该是没有激素的吧？现在吃的东西只有你想不到的，没有做不到的，国人对待自己就是太聪明了",
    "date": "2024-08-05",
    "article": "很多人都喜欢吃香蕉 但是并不清楚如何选到好香蕉 有可能买了那种打了激素的香蕉回家...",
    "emotion": "恐惧",
    "likes": 1,
    "rumor": "否"
},
{
    "id": 7,
    "content": "完了去年30岁刚毕业，今年知识就从脑子里流出来了，感觉自己连保安笔试题都写不完[白眼]",
    "date": "2024-07-18",
    "article": "#小镇做题家 快看！快看浙江大学普通保安招聘试题，满分100，60分及格，你能得多少分？估计得90分以上的人几乎没有！",
    "emotion": "悲伤",
    "likes": 2,
    "rumor": "否"
},
{
    "id": 8,
    "content": "很荒谬",
    "date": "2024-07-30",
    "article": "#小镇做题家 快看！快看浙江大学普通保安招聘试题，满分100，60分及格，你能得多少分？估计得90分以上的人几乎没有！",
    "emotion": "愤怒",
    "likes": 0,
    "rumor": "否"
},
{
    "id": 9,
    "content": "金华何德何能[泣不成声][泣不成声]",
    "date": "2024-08-04",
    "article": "#小镇做题家 快看！快看浙江大学普通保安招聘试题，满分100，60分及格，你能得多少分？估计得90分以上的人几乎没有！",
    "emotion": "悲伤",
    "likes": 2,
    "rumor": "否"
},
{
    "id": 10,
    "content": "最后两题五十分，上面回答首都和国歌刚好六十",
    "date": "2024-07-22",
    "article": "#小镇做题家 快看！快看浙江大学普通保安招聘试题，满分100，60分及格，你能得多少分？估计得90分以上的人几乎没有！",
    "emotion": "信任",
    "likes": 112,
    "rumor": "否"
},
{
    "id": 11,
    "content": "我是浙大的，我觉得我考不上浙大保安[流泪]",
    "date": "2024-07-25",
    "article": "#小镇做题家 快看！快看浙江大学普通保安招聘试题，满分100，60分及格，你能得多少分？估计得90分以上的人几乎没有！",
    "emotion": "悲伤",
    "likes": 33,
    "rumor": "否"
},
{
    "id": 12,
    "content": "老家玉米地里种药材黄精",
    "date": "2024-07-17",
    "article": "重庆到处都在火灾，这是重庆潼南当官的还在给包谷洒水。请问现在包谷还没掰吗？奇怪吧，奇迹再现。",
    "emotion": "惊讶",
    "likes": 1,
    "rumor": "否"
},
{
    "id": 13,
    "content": "[赞][赞][赞]",
    "date": "2024-08-01",
    "article": "重庆到处都在火灾，这是重庆潼南当官的还在给包谷洒水。请问现在包谷还没掰吗？奇怪吧，奇迹再现。",
    "emotion": "快乐",
    "likes": 0,
    "rumor": "否"
},
{
    "id": 14,
    "content": "是在给低种的黄精浇水，你的标题内容不实",
    "date": "2024-07-29",
    "article": "重庆到处都在火灾，这是重庆潼南当官的还在给包谷洒水。请问现在包谷还没掰吗？奇怪吧，奇迹再现。",
    "emotion": "信任",
    "likes": 2,
    "rumor": "否"
},
{
    "id": 15,
    "content": "人家是给黄精浇水而已！不要小题大做！",
    "date": "2024-08-05",
    "article": "重庆到处都在火灾，这是重庆潼南当官的还在给包谷洒水。请问现在包谷还没掰吗？奇怪吧，奇迹再现。",
    "emotion": "信任",
    "likes": 0,
    "rumor": "否"
},
{
  "id": 6,
  "content": "[赞][赞][赞]",
  "date": "2024-05-08",
  "article": "茶叶与免疫力：新冠疫情期间的有效预防措施",
  "emotion": "信任",
  "likes": 1,
  "rumor": "否"
},
{
  "id": 7,
  "content": "[赞][赞][赞]",
  "date": "2024-06-12",
  "article": "茶叶与免疫力：新冠疫情期间的有效预防措施",
  "emotion": "信任",
  "likes": 1,
  "rumor": "否"
},
{
  "id": 8,
  "content": "[鼓掌][鼓掌][鼓掌]",
  "date": "2024-07-20",
  "article": "茶叶与免疫力：新冠疫情期间的有效预防措施",
  "emotion": "快乐",
  "likes": 1,
  "rumor": "否"
},
{
  "id": 9,
  "content": "我喝了二十年茶了，白开水喝不习惯了[捂脸][捂脸][捂脸]",
  "date": "2024-08-01",
  "article": "茶叶与免疫力：新冠疫情期间的有效预防措施",
  "emotion": "快乐",
  "likes": 1,
  "rumor": "否"
},
{
  "id": 10,
  "content": "[比心][比心][比心]",
  "date": "2024-08-15",
  "article": "茶叶与免疫力：新冠疫情期间的有效预防措施",
  "emotion": "快乐",
  "likes": 1,
  "rumor": "否"
},
{
  "id": 11,
  "content": "茶叶又火了[捂脸]",
  "date": "2024-09-05",
  "article": "茶叶与免疫力：新冠疫情期间的有效预防措施",
  "emotion": "惊讶",
  "likes": 0,
  "rumor": "否"
},
{
  "id": 2,
  "content": "说的太好了，我得给你点个赞",
  "date": "2024-01-15",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "快乐",
  "likes": 10,
  "rumor": "是"
},
{
  "id": 3,
  "content": "说的太对了，我村子的人都是在小诊所治好的[比心][比心][比心][鼓掌][鼓掌][鼓掌]",
  "date": "2024-02-01",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "信任",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 4,
  "content": "专家没办法了，高手在民间[感谢][感谢]",
  "date": "2024-02-10",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "信任",
  "likes": 12,
  "rumor": "是"
},
{
  "id": 5,
  "content": "还真的是这样[捂脸]确实是被各村的小诊所挂几天针就好了[赞]",
  "date": "2024-02-20",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "惊讶",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 6,
  "content": "那你说那些在家呆着没吃药没打针的是谁治好的呢？[捂脸][捂脸][捂脸]",
  "date": "2024-03-01",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "悲伤",
  "likes": 2,
  "rumor": "是"
},
{
  "id": 7,
  "content": "我是自己治的。随便吃了点药就好了[捂脸]",
  "date": "2024-03-15",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "信任",
  "likes": 1,
  "rumor": "是"
},
{
  "id": 8,
  "content": "[赞][赞][赞][赞][赞][赞][赞][赞][赞]",
  "date": "2024-04-05",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "快乐",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 9,
  "content": "厉害",
  "date": "2024-04-15",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "惊讶",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 10,
  "content": "说的也是啊！",
  "date": "2024-05-01",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "信任",
  "likes": 1,
  "rumor": "是"
},
{
  "id": 11,
  "content": "高手在民间[赞]",
  "date": "2024-05-15",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "信任",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 13,
  "content": "哪家诊所，我也去看看，现在还咳嗽呢",
  "date": "2024-06-15",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "期待",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 14,
  "content": "笑掉大牙[呲牙][呲牙][呲牙][呲牙][呲牙][呲牙][呲牙]",
  "date": "2024-07-01",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "快乐",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 15,
  "content": "不用住院村卫生室就能解决",
  "date": "2024-07-15",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "信任",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 16,
  "content": "不是人家治不了，根本就不想让你好",
  "date": "2024-08-01",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "愤怒",
  "likes": 22,
  "rumor": "是"
},
{
  "id": 17,
  "content": "🏥打的啥针不知道啊",
  "date": "2024-08-15",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "悲伤",
  "likes": 1,
  "rumor": "是"
},
{
  "id": 18,
  "content": "高手在民间？",
  "date": "2024-09-05",
  "article": "西安小诊所治愈新冠的真实案例",
  "emotion": "惊讶",
  "likes": 2,
  "rumor": "是"
},
{
  "id": 1,
  "content": "茶水是凉的还是 开的？",
  "date": "2023-03-05",
  "article": "多喝绿茶能防新冠",
  "emotion": "期待",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 2,
  "content": "茶商是真牛啊[捂脸][捂脸][捂脸]",
  "date": "2023-03-06",
  "article": "多喝绿茶能防新冠",
  "emotion": "惊讶",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 3,
  "content": "春芬：真的假的哟？",
  "date": "2023-03-07",
  "article": "多喝绿茶能防新冠",
  "emotion": "期待",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 4,
  "content": "真的假的哟？",
  "date": "2023-03-08",
  "article": "多喝绿茶能防新冠",
  "emotion": "期待",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 5,
  "content": "茶叶又要疯抢了",
  "date": "2023-03-09",
  "article": "多喝绿茶能防新冠",
  "emotion": "快乐",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 7,
  "content": "[赞][赞][赞][赞]",
  "date": "2023-03-11",
  "article": "多喝绿茶能防新冠",
  "emotion": "快乐",
  "likes": 0,
  "rumor": "是"
},
{
  "id": 2,
  "content": "是不是所有旅美的猫猫过的都不好？[可怜][可怜]",
  "date": "2024-05-02",
  "article": "旅美大熊猫洋洋口吐白沫，腹泻，27岁的他还能坚持到回国吗？#大熊猫 #旅美大熊猫洋洋伦伦一家 #抖音热门 #抖音小助手dou上热门 #大熊猫丫丫 @抖音Dou+上热门 @抖音小助手",
  "emotion": "悲伤",
  "likes": 37,
  "rumor": "否"
},
{
  "id": 3,
  "content": "今天2024年5.2日旅美大熊猫洋洋又拉稀了[流泪]恳请国家救救我们的国宝大熊猫吧",
  "date": "2024-05-02",
  "article": "旅美大熊猫洋洋口吐白沫，腹泻，27岁的他还能坚持到回国吗？#大熊猫 #旅美大熊猫洋洋伦伦一家 #抖音热门 #抖音小助手dou上热门 #大熊猫丫丫 @抖音Dou+上热门 @抖音小助手",
  "emotion": "悲伤",
  "likes": 0,
  "rumor": "否"
},
{
  "id": 4,
  "content": "接回我们的洋洋吧！他们已经打工一辈子了[流泪][流泪][流泪]",
  "date": "2024-05-04",
  "article": "旅美大熊猫洋洋口吐白沫，腹泻，27岁的他还能坚持到回国吗？#大熊猫 #旅美大熊猫洋洋伦伦一家 #抖音热门 #抖音小助手dou上热门 #大熊猫丫丫 @抖音Dou+上热门 @抖音小助手",
  "emotion": "悲伤",
  "likes": 0,
  "rumor": "否"
},
{
  "id": 5,
  "content": "快把洋洋一家接回家吧，看了好心疼[流泪][流泪][流泪][感谢][感谢][感谢]",
  "date": "2024-05-03",
  "article": "旅美大熊猫洋洋口吐白沫，腹泻，27岁的他还能坚持到回国吗？#大熊猫 #旅美大熊猫洋洋伦伦一家 #抖音热门 #抖音小助手dou上热门 #大熊猫丫丫 @抖音Dou+上热门 @抖音小助手",
  "emotion": "悲伤",
  "likes": 0,
  "rumor": "否"
},
{
  "id": 6,
  "content": "看到我们国宝在他国过成这样，真心寒 心酸[流泪]他们有什么错为何要承担这样痛苦[流泪]",
  "date": "2024-05-06",
  "article": "旅美大熊猫洋洋口吐白沫，腹泻，27岁的他还能坚持到回国吗？#大熊猫 #旅美大熊猫洋洋伦伦一家 #抖音热门 #抖音小助手dou上热门 #大熊猫丫丫 @抖音Dou+上热门 @抖音小助手",
  "emotion": "悲伤",
  "likes": 0,
  "rumor": "否"
},
{
  "id": 7,
  "content": "把我们的国宝还给我们，恳请祖国妈妈接我们宝贝回家养老，它们已经做的够多了，应该回家养老了[感谢][感谢][感谢][感谢][感谢][感谢][感谢]",
  "date": "2024-05-07",
  "article": "旅美大熊猫洋洋口吐白沫，腹泻，27岁的他还能坚持到回国吗？#大熊猫 #旅美大熊猫洋洋伦伦一家 #抖音热门 #抖音小助手dou上热门 #大熊猫丫丫 @抖音Dou+上热门 @抖音小助手",
  "emotion": "信任",
  "likes": 0,
  "rumor": "否"
},
{
  "id": 8,
  "content": "什么情况，没人管吗，这是我国的国宝，不爱请不要这样伤害好吧",
  "date": "2024-05-08",
  "article": "旅美大熊猫洋洋口吐白沫，腹泻，27岁的他还能坚持到回国吗？#大熊猫 #旅美大熊猫洋洋伦伦一家 #抖音热门 #抖音小助手dou上热门 #大熊猫丫丫 @抖音Dou+上热门 @抖音小助手",
  "emotion": "愤怒",
  "likes": 0,
  "rumor": "否"
},
{
  "id": 9,
  "content": "[感谢][感谢][流泪][流泪]洋洋的合同什么时间到期27岁已经是老猫了，怎么不接回来，呼吁祖国尽快接回洋洋一家到期的熊猫",
  "date": "2024-05-05",
  "article": "旅美大熊猫洋洋口吐白沫，腹泻，27岁的他还能坚持到回国吗？#大熊猫 #旅美大熊猫洋洋伦伦一家 #抖音热门 #抖音小助手dou上热门 #大熊猫丫丫 @抖音Dou+上热门 @抖音小助手",
  "emotion": "信任",
  "likes": 18,
  "rumor": "否"
},
{
  "id": 10,
  "content": "快点接它回国吧！救救洋洋[感谢][感谢][感谢]",
  "date": "2024-05-10",
  "article": "旅美大熊猫洋洋口吐白沫，腹泻，27岁的他还能坚持到回国吗？#大熊猫 #旅美大熊猫洋洋伦伦一家 #抖音热门 #抖音小助手dou上热门 #大熊猫丫丫 @抖音Dou+上热门 @抖音小助手",
  "emotion": "期待",
  "likes": 0,
  "rumor": "否"
},
{
  "id": 11,
  "content": "恳请祖国救救洋洋一家吧！快点接它们回国，我们的国宝我们爱，老美太坏了，不配养我们的国宝。[感谢][感谢][感谢][感谢][感谢][感谢]",
  "date": "2024-05-10",
  "article": "旅美大熊猫洋洋口吐白沫，腹泻，27岁的他还能坚持到回国吗？#大熊猫 #旅美大熊猫洋洋伦伦一家 #抖音热门 #抖音小助手dou上热门 #大熊猫丫丫 @抖音Dou+上热门 @抖音小助手",
  "emotion": "愤怒",
  "likes": 9,
  "rumor": "否"
},
{ "id": 1, "content": "一看太空一类的东西就感觉人活着真没啥意思 就当欣赏美景", "date": "2023-01-04", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "悲伤", "likes": 41, "rumor": "是" },
{ "id": 2, "content": "地球本就是地外文明的附属品，随你怎么扑腾也翻不出太阳系。", "date": "2023-01-06", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "厌恶", "likes": 40, "rumor": "是" },
{ "id": 3, "content": "斗转星移啊！移开了", "date": "2023-01-08", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "期待", "likes": 0, "rumor": "是" },
{ "id": 4, "content": "有一种天龙星人专吃人类，别把他们吸引来就好了", "date": "2023-01-11", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "恐惧", "likes": 17, "rumor": "是" },
{ "id": 5, "content": "只不过光不是连续的而已，有啥大惊小怪的，更关了灯在开不一样嘛！ 勤于思考，对大脑有好处", "date": "2023-01-15", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "信任", "likes": 8, "rumor": "是" },
{ "id": 6, "content": "霍金没说为什么不可以接触外星文明 遗憾", "date": "2023-01-17", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "悲伤", "likes": 10, "rumor": "是" },
{ "id": 7, "content": "就怕过来收太阳，如果真来怎么办？", "date": "2023-01-19", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "恐惧", "likes": 7, "rumor": "是" },
{ "id": 8, "content": "收保护费了", "date": "2023-01-22", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "愤怒", "likes": 0, "rumor": "是" },
{ "id": 9, "content": "宇宙中必然有一种神秘的力量主宰着宇宙，被人们称为上苍。宇宙中的一切现象均为表象，如芸花一现。就像人一样来无踪去无影，只不过是物质运动的原子成分的聚散。珍爱生命，珍惜人生。", "date": "2023-01-24", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "信任", "likes": 5, "rumor": "是" },
{ "id": 10, "content": "天啊一百多棵恒星消失你品细细品", "date": "2023-01-28", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "惊讶", "likes": 3, "rumor": "是" },
{ "id": 11, "content": "宇宙是虚拟的", "date": "2023-02-01", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "惊讶", "likes": 4, "rumor": "是" },
{ "id": 12, "content": "我早就说过，所谓天空星星，都是外星文明的巨大飞碟，由智慧生命操控，在规则范围内活动，哪天发现不见了，那就是调动工作了。这也解释了为什么这些星体能够长期悬浮在空中的原因。", "date": "2023-02-05", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "信任", "likes": 3, "rumor": "是" },
{ "id": 13, "content": "旅行者一号就不应该把唱片带上去", "date": "2023-02-09", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "厌恶", "likes": 3, "rumor": "是" },
{ "id": 14, "content": "人类终将逃不过灭亡，外星人也一样同在宇宙。", "date": "2023-02-14", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "悲伤", "likes": 3, "rumor": "是" },
{ "id": 15, "content": "外星人准备重新洗牌了，", "date": "2023-02-18", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "期待", "likes": 2, "rumor": "是" },
{ "id": 16, "content": "被封印了？", "date": "2023-02-21", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "惊讶", "likes": 2, "rumor": "是" },
{ "id": 17, "content": "操心这么多干嘛呢？有吃有喝，有工作，家人平安比什麽都好，我敢说刷到这个视频的人没有一个能担起拯救地球的这个使命，得过且过吧，快活一天是一天", "date": "2023-02-26", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "快乐", "likes": 2, "rumor": "是" },
{ "id": 18, "content": "我在想，", "date": "2023-03-01", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "信任", "likes": 0, "rumor": "是" },
{ "id": 19, "content": "已经出现噬星者了", "date": "2023-03-05", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "恐惧", "likes": 1, "rumor": "是" },
{ "id": 20, "content": "在过一段时间地球也凭空消失了", "date": "2023-03-10", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "恐惧", "likes": 0, "rumor": "是" },
{ "id": 21, "content": "跟人一样，修房子，我们是挖地球，它们是挖星", "date": "2023-03-15", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "愤怒", "likes": 0, "rumor": "是" },
{ "id": 22, "content": "我们一直都在地球，你们都不知道吗", "date": "2023-03-18", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "信任", "likes": 1, "rumor": "是" },
{ "id": 23, "content": "被黑洞吃了", "date": "2023-03-21", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "惊讶", "likes": 0, "rumor": "是" },
{ "id": 24, "content": "灭霸把他们征服了", "date": "2023-03-26", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "厌恶", "likes": 0, "rumor": "是" },
{ "id": 25, "content": "宇宙尘埃挡住了吧这种事我记得以前也有过好几次", "date": "2023-03-30", "article": "要不要主动和外星人接触？霍金曾经警告过人类", "emotion": "信任", "likes": 1, "rumor": "是" },
{ "id": 26, "content": "宇宙这么大，我连一间房子都空间都没有", "date": "2023-04-02", "article": "近半个世纪以来，至少上百颗恒星离奇消失！到底是何原因？", "emotion": "悲伤", "likes": 1744, "rumor": "否" }
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
    { title: '所属文章', width: 240, dataIndex: 'article', key: 'article' },
    { title: '评论内容', dataIndex: 'content', key: 'content' },
    {
      title: '时间',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      sorter: (a: Comment, b: Comment) => dayjs(a.date).unix() - dayjs(b.date).unix()
    },
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
