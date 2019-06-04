import React from 'react'
const Info = props =>
    <div className='info-header'>
        <table className='info-table'>
            <thead className='info-table-header'>
            <tr>
                <th>Инфо</th>
                <th>Связь</th>
                <th>ПО</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <span className='info-table-label'>Банк</span><span>{props.device.Info.Bank}</span>
                    <span className='info-table-label'>Идентификатор</span><span>{props.device.Info.Id}</span>
                    <span className='info-table-label'>Адрес установки</span><span>{props.device.Info.Address}</span>
                    <span className='info-table-label'>Серийный номер</span><span>{props.device.Info.Serial}</span>
                    <span className='info-table-label'>Модель</span><span>{props.device.Info.Model}</span>
                </td>
                <td>
                    <span className='info-table-label'>Ip адрес</span><span>{props.device.Network.IP}</span>
                    <span className='info-table-label'>Порт</span><span>{props.device.Network.Port}</span>
                    <span className='info-table-label'>Конфигурация</span><span>{props.device.Network.Config}</span>
                    <span className='info-table-label'>Тип конфигурации</span><span>{props.device.Network.Config_type}</span>
                    <span className='info-table-label'>Последняя перезагрузка</span><span>{props.device.Network.Last_reboot}</span>
                </td>
                <td>
                    <span className='info-table-label'>ПО1</span><span>{props.device.Software.Agi}</span>
                    <span className='info-table-label'>ПО1</span><span>{props.device.Software.Sub_1}</span>
                    <span className='info-table-label'>ПО3</span><span>{props.device.Software.Sub_2}</span>
                    <span className='info-table-label'>ПО4</span><span>{props.device.Software.Sub_3}</span>
                    <span className='info-table-label'>ПО5</span><span>{props.device.Software.Sub_4}</span>
                </td>
            </tr>
            </tbody>
        </table>
    </div>;

export default Info

