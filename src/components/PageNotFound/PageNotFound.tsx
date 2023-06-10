import { Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
    return (
        <div style={{
            display: "flex", justifyContent: "center", height: "100vh", alignItems: "center"
        }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to={"/dashboard"} type="primary">Back Home</Link>}
            />
        </div >
    )
}
