import React from 'react'
import MiniDrawer from '../../components/Sidebar/Sidebar'
import OrderForm from '../../components/Order/Order'


const Order = () => {
  return (
    <div>
        <MiniDrawer />
        <div>
            <OrderForm />

        </div>
    </div>
  )
}

export default Order