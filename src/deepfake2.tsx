import React from 'react';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

const cardData = [
  {
    title: "真实，概率: 78.65%",
    description: "https://v.douyin.com/ij8Du8nx/",
    imageUrl: "/images/true1.png",
  },
  {
    title: "真实，概率: 89.88%",
    description: "https://v.douyin.com/ij8ULkW9/",
    imageUrl: "/images/true2.png",
  },
  {
    title: "虚假，概率: 56.84%",
    description: "https://v.douyin.com/ij8UPT1e/",
    imageUrl: "/images/fake2.png",
  },
  {
    title: "真实，概率: 59.77%",
    description: "https://v.douyin.com/ij8ULqrJ/",
    imageUrl: "/images/true3.png",
  },
  {
    title: "真实，概率: 98.25%",
    description: "https://v.douyin.com/ij8ypMVj/",
    imageUrl: "/images/true6.png",
  },
  {
    title: "真实，概率: 52.91%",
    description: "https://v.douyin.com/ij8yLSTc/",
    imageUrl: "/images/true5.png",
  },
  {
    title: "真实，概率: 60%",
    description: "https://v.douyin.com/ij8UoFxH/",
    imageUrl: "/images/true4.png",
  },
  {
    title: "虚假，概率: 72.85%",
    description: "https://v.douyin.com/ij8yLWGF/",
    imageUrl: "/images/fake1.png",
  },
];

export const Deepfake2: React.FC = () => {
  const rows = [];
  for (let i = 0; i < cardData.length; i += 4) {
    const cards = cardData.slice(i, i + 4);
    rows.push(
      <div key={i} style={{ marginBottom: '24px' }}>
        <Row gutter={16}>
          {cards.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: '100%', height: '100%' }}
                cover={
                  <div
                    style={{
                      width: '100%',
                      paddingBottom: '75%', // 3:4 aspect ratio
                      position: 'relative',
                      backgroundColor: 'white',
                    }}
                  >
                    <img
                      alt={card.title}
                      src={card.imageUrl}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                      }}
                    />
                  </div>
                }
              >
                <Meta
                  title={
                    <span>
                      <span
                        style={{
                          color: card.title.startsWith('真实') ? 'green' : 'red',
                        }}
                      >
                        {card.title.split(':')[0]}
                      </span>
                      {`: ${card.title.split(':')[1]}`}
                    </span>
                  }
                  description={<a href={card.description} target="_blank" rel="noopener noreferrer">{card.description}</a>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return <div style={{ padding: '30px' }}>{rows}</div>;
};
