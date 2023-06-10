import { Avatar, Button } from 'antd'
import React from 'react'
import "./Header.css"
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

export const Header = () => {
    const { logout, userInfo } = useAuth()
    return (
        <header className='app__header'>
            <div>
                <Link className='header__logo' to={"/tasks"}><h2> Task App</h2></Link>
            </div>
            {
                !!userInfo?.token &&
                <nav className='header__navigation'>
                    <div><Avatar src={userInfo.profile_pic} /> Welcome</div>
                    <Button type="link" onClick={() => { logout() }}>Logout</Button>
                </nav>
            }

        </header >
    )
}
