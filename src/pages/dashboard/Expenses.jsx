import React from 'react'
import MiniDrawer from '../../components/Sidebar/Sidebar'
import Expence from '../../components/expense/Expence'

const Expenses = () => {
  return (
    <div>
        <MiniDrawer />


        <div>
            <Expence />
        </div>

    </div>
  )
}

export default Expenses