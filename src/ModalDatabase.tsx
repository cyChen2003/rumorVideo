import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import './App.css';
const data = Array.from({ length: 23 }).map((_, i) => ({
    // href: 'https://ant.design',
    title: `外交部：中方延长12国短期来华免签政策（来源：CCTV4）`,
    avatar: '/images/icon_true.png',
    description:
        '作者：央视网；个人介绍：有故事，有温度，有梦想。',
    content: (
    <div className="content-cls">
        视频ID：7366183498211659062<br/>
        视频简介：外交部：中方延长12国短期来华免签政策（来源：CCTV4）
    </div>
    ),
    extra:
        '/images/736618.png',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export const ModalDatabase: React.FC = () => (
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 3,
        }}
        dataSource={data}

        renderItem={(item) => (
            <List.Item
                key={item.title}
                // actions={[
                //     <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                //     <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                //     <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                // ]}
                extra={
                    <img
                        // width={272}
                        height={200}
                        alt="logo"
                        src={item.extra}
                    />
                }
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    // title={<a href={item.href}>{item.title}</a>}
                    title={item.title}
                    description={
                        <div className="description-cls">
                            {item.description}
                        </div>
                    }
                />
                {item.content}
            </List.Item>
        )}
    />
);

export default ModalDatabase;