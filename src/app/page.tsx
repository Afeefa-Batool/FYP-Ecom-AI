import React from 'react'
import Navbar from './components/Navbar'
// import Form from './components/Form'
import Services from './services/page'
const page = () => {
  return (
    <div>
      <Navbar/>
      {/* <Form/> */}
      <Services/>
    </div>
  )
}

export default page
