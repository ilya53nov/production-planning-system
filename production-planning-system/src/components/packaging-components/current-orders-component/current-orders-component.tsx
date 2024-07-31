


const PackagingCurrentOrdersComponent: React.FC = () => {



  return (
    <div>
      current-orders-component
    
      <ul>
        <li>
          <div>IMA 1</div> 

          Завершённый заказ
          <ul>
            <li>
              Сиофор 1000
            </li>
            <li>
              10224810
            </li>
          </ul>

          Текущий заказ
          <ul>
            <li>
              Сиофор 1000
            </li>
            <li>
              10224812
            </li>
          </ul>

          В ожидании упаковки
          <ul>
            <li>
              Сиофор 1000
            </li>
            <li>
              10224811
            </li>
          </ul>
        </li>
        <li>
          IMA 2
        </li>
        <li>
          IMA 3
        </li>
        <li>
          Deckert
        </li>
        <li>
          IMA 4
        </li>
      </ul>
    </div>
  )
}

export default PackagingCurrentOrdersComponent;