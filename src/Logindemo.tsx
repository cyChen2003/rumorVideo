import React, { useState } from "react";
import "./LoginDemo.css";
import { useNavigate } from 'react-router-dom';

import { Card, Form, Input, Button, message } from 'antd';
import { Space } from 'antd';
const LoginDemo: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate(); // 使用 useNavigate 钩子

    const navigateToAdmin = () => {
        navigate("/admin"); // 使用 navigate 函数跳转
    }

    const navigateToUser = () => {
        navigate("/User"); // 使用 navigate 函数跳转
    }
    return (

        <div className="login">
            <Card className="login-container">
                <Button type="primary" className="login-button" size="large" block onClick={navigateToAdmin}>管理员模式</Button>
                <Button type="primary" className="login-button" size="large" block onClick={navigateToUser}>用户模式</Button>
            </Card>
        </div>
    )
}

export default LoginDemo;