import "./Login.css"
import { Button, Divider, Form, Input, Typography } from 'antd'
import { Link } from 'react-router-dom';
import { PayloadType, useAuth } from '../../context/AuthContext';
import Sha1 from "js-sha1";


const { Text, Title } = Typography;

export const Login = () => {
    const { login, loading } = useAuth()

    const onFinish = async (values: PayloadType) => {
        const payload = {
            email_id: values.email_id.trim(),
            password: Sha1(values.password.trim())
        }
        await login(payload)
    };

    return (
        <div className='login__container'>
            <div className="login__wrapper">
                <Title level={2} >Login</Title>
                <Divider />
                <Form
                    name="login__form"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email_id"
                        rules={[{ required: true, message: 'Please input your Email!', type: "email" }]}
                    >
                        <Input type="email" placeholder='Enter Your Email Address' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!', transform: (val: string) => val?.trim() }]}
                    >
                        <Input.Password placeholder='Enter Your Password' minLength={8} />
                    </Form.Item>


                    <Form.Item>
                        <Button className="submit__btn" type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Text strong type="secondary" style={{ textAlign: "left", display: "block" }}>{"Don't have an account"}? <Link to="/signup">{"Sign Up"}</Link></Text>

                </Form>
            </div>
        </div >
    )
}
