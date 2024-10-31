import React from 'react'

const Info = ({id,webElements,setWebElements}) => {
  return (
    <div className='Info-prop-element border-b border-b-slate-200 py-2 px-3 '>
      {`${webElements[id].type} ${webElements[id].id}`}
    </div>
  )
}

export default Info
