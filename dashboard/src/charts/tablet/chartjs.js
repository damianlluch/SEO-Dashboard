import React, { Component } from 'react';
import Chart from '../../components/Chart';
import axios from 'axios'
import { Container, Row, Col } from 'reactstrap';

// This file is only for example. 
//To add a new graph we need to add it in the specific folder and add the path to the content.js file in /dashboard

class App extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentDidMount(){
    this.getChartData();
  }

  getChartData(){
    //Call the url that you need
    axios.get("http://localhost:3003/tablet").then(api =>{
      const data = api.data;

      var date =[];
      var clicks = []
      var impressions =[]

      
     

      //getting the data to empty arrays
      for (var i in data)
      {
      date.push(data[i].Date)
      clicks.push(data[i].Clicks)
      impressions.push(data[i].Impressions)

      }

      
       //Check if my api is working
      // console.log(data)
      // console.log(date)
      // console.log(clicks)
     
      this.setState({
          chartData:{
            labels: date,
            datasets:[
              {
                label:'Clicks',
                 fill: true,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
                data:clicks,
                backgroundColor:[
                  'rgba(29,140,248,0.2)',

               ]
              },
              {
            label:'Impressions',
                data:impressions,
                backgroundColor:[
                  'rgba(228, 241, 254, 1)',  
               ]
          },
            ]
          }
      });
    });  
  }

  render() {
    return (
    
      
          <Col>
              {Object.keys(this.state.chartData).length &&
               <Chart chartData={this.state.chartData} location="Clicks and Impressions" legendPosition="bottom"/>
             }
          </Col>
    );
  }
}

export default App;