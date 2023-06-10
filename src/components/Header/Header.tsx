import { Avatar, Button } from 'antd'
import React from 'react'
import "./Header.css"
import { useAuth } from '../../context/AuthContext'

export const Header = () => {
    const { logout, userInfo } = useAuth()
    return (
        <header className='app__header'>
            <div>
                <h1>Nested Task App</h1>
            </div>
            {
                !!userInfo?.token &&
                <nav className='header__navigation'>
                    <div><Avatar src={userInfo.profile_pic} /> Welcome</div>
                    <Button type="link" onClick={() => { logout() }}>Logout</Button>
                </nav>
            }

        </header>
    )
}
