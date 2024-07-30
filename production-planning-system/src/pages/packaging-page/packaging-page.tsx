import { useState } from "react";
import PackagingCurrentOrdersComponent from "../../components/packaging-components/current-orders-component/current-orders-component";
import PackagingCompletedOrdersComponent from "../../components/packaging-components/completed-orders-component/completed-orders-component";

const PackagingPage: React.FC = () => {

  const [currentTab, setCurrentTab] = useState('current-orders');

  return (
    <div>
      PackagingPage
      <ul>
        <li>
          <button onClick={() =>setCurrentTab('current-orders')}>current-orders</button>
        </li>
        <li>
        <button onClick={() =>setCurrentTab('completed-orders')}>completed-orders</button>
        </li>
      </ul>

      {currentTab === 'current-orders' ? <PackagingCurrentOrdersComponent /> : ''}
      {currentTab === 'completed-orders' ? <PackagingCompletedOrdersComponent /> : ''}
    </div>

  )
}

export default PackagingPage;