import React, { useState } from 'react'
import { Alert, Button, Divider, Form, Input, Typography } from 'antd'
import "./Signup.css"
import { Link } from 'react-router-dom';
import { PayloadType, useAuth } from '../../context/AuthContext';
import Sha1 from "js-sha1";


const { Text, Title } = Typography;


export const Signup = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const { signup, loading } = useAuth()

    const onFinish = async (payload: PayloadType) => {
        setErrorMessage(null)
        if (payload.confirm_password?.trim() !== payload.password.trim()) {
            setErrorMessage("Password not Matching")
            return
        }

        const response = validatePassword(payload.password.trim())
        if (!response) {
            setErrorMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return
        }
        const updatedPayload = {
            email_id: payload.email_id.trim(),
            password: Sha1(payload.password.trim())
        }
        await signup(updatedPayload)
    };

    const validatePassword = (password: string) => {
        // Define your validation criteria
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()]/.test(password);

        // Check if the password meets all the criteria
        if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
            return true;
        }
        return false;
    };


    return (
        <div className='signup__container'>
            <div className="signup__wrapper">
                <Title level={2} >Sign Up</Title>
                <Divider />
                {errorMessage && <Alert type='error' message={errorMessage} showIcon />}
                <Form
                    name="signup__form"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email_id"
                        validateTrigger="onChange"
                        rules={[{ required: true, pattern: new RegExp(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/), message: <Text style={{ color: "red", display: "block", textAlign: "left", margin: "0.2rem" }}>{"Please enter a valid email address."}</Text> }]}>
                        <Input type="email" placeholder='Enter Your Email Address' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        tooltip={'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'}
                        rules={[{ required: true, message: 'Please input your password!', transform: (val: string) => val?.trim() }]}
                    >
                        <Input.Password placeholder='Enter Your Password' minLength={8} />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirm_password"
                        rules={[{ required: true, message: 'Please input your password!', transform: (val: string) => val?.trim() }]}
                    >
                        <Input.Password placeholder='Enter Your Confirm Password' minLength={8} />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Text strong type="secondary" className="linktoLogin">Have an account? <Link to="/login">Log in</Link></Text>
                </Form>
            </div>
        </div >
    )
}
