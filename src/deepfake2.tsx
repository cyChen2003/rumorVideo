import { Card, Row, Col } from 'antd';

const { Meta } = Card;

const cardData = [
  {
    title: "Pristine: 78.65%",
    // description: "www.instagram.com",
    imageUrl: "/images/true1.png",
  },
  {
    title: "Pristine: 89.88%",
    // description: "www.instagram.com",
    imageUrl: "/images/true2.png",
  },
  {
    title: "Fake: 56.84%",
    // description: "www.instagram.com",
    imageUrl: "/images/fake2.png",
  },
  {
    title: "Pristine: 59.77%",
    // description: "www.instagram.com",
    imageUrl: "/images/true3.png",
  },
  {
    title: "Pristine: 98.25%",
    // description: "www.instagram.com",
    imageUrl: "/images/true6.png",
  },
  {
    title: "Pristine: 52.91%",
    // description: "www.instagram.com",
    imageUrl: "/images/true5.png",
  },
  {
    title: "Pristine: 60%",
    // description: "www.instagram.com",
    imageUrl: "/images/true4.png",
  },
  {
    title: "Fake: 72.85%",
    // description: "www.instagram.com",
    imageUrl: "/images/fake1.png",
  },
];

export const Deepfake2 = () => {
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
                style={{ width: '100%' }}
                cover={<img alt={card.title} src={card.imageUrl} />}
              >
                <Meta title={card.title} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return <div style={{ padding: '30px' }}>{rows}</div>;
};
