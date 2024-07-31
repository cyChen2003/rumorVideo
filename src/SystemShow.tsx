import React, { useState } from "react";
import { Card, Space } from "antd";
import { Divider } from 'antd';
import type { SearchProps } from "antd/es/input/Search";
import { Input } from "antd";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
import { Flex, Layout } from "antd";
import { Button, message, Steps, theme } from "antd";
import { Col, Row } from "antd";
import { Table, Tag } from 'antd';
import { RelationshipGraph } from "./relationship";
import { EChartsCalendarComponent } from "./DateMap";
import type { TableColumnsType, TableProps } from 'antd';
import './App.css';
import { TrafficChart } from "./trafficchart";
//从DataMap.tsx中import
export const SystemShow: React.FC = () => {

    return (
        <Layout>
            <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <Row gutter={10}>
                <Col span={12}>
                    <Card title="关联词云图" className="text-center">
                        <RelationshipGraph />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="问题分布图" className={"text-center"}>
                        <EChartsCalendarComponent />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card title="系统展示">
                        <TrafficChart />
                    </Card>
                </Col>
            </Row>
            </Space>
        </Layout>
    );
};