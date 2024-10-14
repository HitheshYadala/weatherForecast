import React from 'react'
import '../styles/Forecasts.css'

function Forecasts(props) {
  return (
    <div >
        <table className="custom-table">
      <tbody>
        <tr >
          <td style={{backgroundColor:'#d26c24'}} colspan= {3}>{props.day}</td>
        </tr>
        <tr>
          <td colspan= {3}>Temperature</td>
        </tr>

        <tr>
          <td>Min</td>
          <td>Max</td>
        </tr>
        <tr>
          <td>{props.min_temp}</td>
          <td>{props.max_temp}</td>
        </tr>
        <tr>
          <td>Pressure</td>
          <td>{props.pressure}</td>
        </tr>
        <tr>
          <td>Humidity</td>
          <td>{props.humidity}</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default Forecasts