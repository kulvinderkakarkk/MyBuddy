import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

function MyPopup({content, children}) {
    return <Popup content={content} trigger={children} />
}

export default MyPopup;