import { useState } from "react";
import PackagingCompletedOrdersComponent from "../../components/packaging-components/completed-orders-component/completed-orders-component";
import CurrentOrdersListComponent from "./components/current-orders-list/current-orders-list-component";

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

      {currentTab === 'current-orders' ? <CurrentOrdersListComponent /> : ''}
      {currentTab === 'completed-orders' ? <PackagingCompletedOrdersComponent /> : ''}
    </div>

  )
}

export default PackagingPage;