import { Menu, Segment } from 'semantic-ui-react'
import React, { useState } from 'react'
import {Link} from "react-router-dom"


function MenuBar()  {
    const path=window.location.pathname
    const pathname=path=="/"?'home':path.substr(1)
    const [activeItem,setActiveItem]=useState(pathname)
    const handleItemClick=(e,{name})=>setActiveItem(name)
    return (
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
}

export default MenuBar;