import React from 'react'
const Repair = props =>
    (props.repairs !== undefined)
        ? <div className='repair-table' style={props.style}>
            <div className='EventList__scroll_header'>
                <div className='EventList__scroll_header_box'>
                    <table className='EventList__scroll_table' >
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Исполнитель</th>
                            <th>Описание проблемы</th>
                            <th>Отчет о работе</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div className='EventList__scroll_body'>
                <table className='EventList__scroll_table'>
                    <tbody>
                    {
                        [...props.repairs]
                            .reverse()
                            .map( (repair, index) =>
                                <tr key={index}>{ Object.keys(repair).map((col, index) => <td key={index}>{repair[col]}</td>) }</tr>
                            ) //base td
                    }
                    </tbody>
                </table>
            </div>
        </div>
        : <div className='no-results'>Здесь не было (пока) ремонтов...</div>;

export default Repair

