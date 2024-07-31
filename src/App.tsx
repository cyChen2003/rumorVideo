import React, { useState } from "react";
import {
  AppstoreOutlined,
  SearchOutlined,
  StepForwardOutlined,
  CommentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Slider, theme } from "antd";
import { Breadcrumb } from "antd";
import { TextSearch } from "./textSearch";
import { DbShow } from "./dbShow";
import { Flex, Layout } from "antd";
import { CrossTransformer } from "./crossTransformer";
import { Deepfake1 } from "./deepfake1";
import { Deepfake2 } from "./deepfake2";
import { CommentsAnalysis } from "./CommentsAnalysis";
import { RelationshipGraph } from "./relationship";


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

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const layoutStyle = {
  minHeight: "100vh",
};

const videos = [
  {
    title: "Video 1",
    description: "This is the first video.",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://via.placeholder.com/240x135",
  },
  {
    title: "Video 2",
    description: "This is the second video.",
    url: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://via.placeholder.com/240x135",
  },
  // Add more videos as needed
];

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key:"0",
    icon:<HomeOutlined/>,
    label:"系统总览",
    children: [
      { key: "01", label: "关系总览" },
      { key: "02", label: "后台数据系统查看" },
    ]

  },
  {
    key: "1",
    icon: <SearchOutlined />,
    label: "数据库检索",
    children: [
      { key: "11", label: "单个文本检索" },
      { key: "12", label: "后台数据系统查看" },
    ],
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "多模态虚假新闻检测",
    children: [
      { key: "21", label: "单个视频检测" },
      { key: "22", label: "后台数据检测结果查看" },
    ],
  },
  {
    key: "3",
    icon: <CommentOutlined />,
    label: "评论语义分析",
    children: [
      { key: "31", label: "单个视频评论语义分析" },
      { key: "32", label: "后台视频评论数据查看" },
    ],
  },
  {
    key: "4",
    icon: <StepForwardOutlined />,
    label: "深度伪造检测",
    children: [
      { key: "41", label: "单个视频检测" },
      { key: "42", label: "后台数据检测结果查看" },
    ],
  },
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}
const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);
const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [stateOpenKeys, setStateOpenKeys] = useState(["0", "01"]);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>("01");
  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    console.log(levelKeys);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <Layout style={layoutStyle}>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["01"]}
            onSelect={({ selectedKeys }) => setSelectedKey(selectedKeys[0])}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            items={items}
          />
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          ></Header>
          <Content style={contentStyle}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                {
                  // @ts-ignore
                  items.find((item) => item.key === stateOpenKeys[0])?.label
                }
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {selectedKey &&
                  items
                    .flatMap(
                      (item) =>
                        //  @ts-ignore
                        item.children || []
                    )
                    .find((child) => child.key === selectedKey)?.label}
              </Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: "95vh",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {selectedKey === "01" && <RelationshipGraph />}
              {selectedKey === "02" && <DbShow />}
              {selectedKey === "11" && <TextSearch />}
              {selectedKey === "12" && <DbShow />}
              {selectedKey === "21" && <CrossTransformer />}
              {selectedKey === "22" && <div>后台数据检测结果查看</div>}
              {selectedKey === "31" && <CommentsAnalysis />}
              {selectedKey === "32" && <div>后台视频评论数据查看</div>}
              {selectedKey === "41" && <Deepfake1 />}
              {selectedKey === "42" && <Deepfake2 />}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
              minHeight: "5vh",
            }}
          >
            2023CTF
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
