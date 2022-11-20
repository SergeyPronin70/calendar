import { Button, Form, Input, Layout, Row } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AuthActionCreator } from "../store/reducers/auth/action-creator";
import { rules } from "../utils/rules";

const LoginForm: React.FC = () => {
    const {login} = useAction();
    const {error, isLoading} = useTypedSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const submit = () => {
        login(username, password)
    }

    return (
        <Form
        onFinish={submit} 
        >
            {error && <div style={{color: 'red'}}>
                {error}
                </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input value={password} onChange={e => setPassword(e.target.value)} type={'password'} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading} >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;