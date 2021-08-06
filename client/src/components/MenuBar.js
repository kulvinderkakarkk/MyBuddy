import { Menu, Segment } from 'semantic-ui-react'
import React, { useState, useContext } from 'react'
import {Link} from "react-router-dom"
import {AuthContext} from '../context/auth'

function MenuBar()  {
    const {user,logout} = useContext(AuthContext)
    const path=window.location.pathname
    const pathname=path=="/"?'home':path.substr(1)
    const [activeItem,setActiveItem]=useState(pathname)
    const handleItemClick=(e,{name})=>setActiveItem(name)
    const menuBar = user?(
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name={user.username}
            as={Link}
            to="/"
          />
          <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={logout}
          />
          </Menu.Menu>
        </Menu>
      </div>
    ):(
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as={Link}
            to="/register"
            />
          </Menu.Menu>
        </Menu>
      </div>
    ) 
    return menuBar
}

export default MenuBar;