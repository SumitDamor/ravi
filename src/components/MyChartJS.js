import React from 'react'
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
  )
const MyChartJS = () => {
  const [chart, setchart] = useState({})
  const [Charttype, setChartType] = useState('bar')
  const [haveData, setHaveData] = useState(false); //here
  let labels = [];
  let datasets = [];
  let options;
  let data;
  let type;
  let title;
  let desc;
  async function chartCalling() {
    try {
      const allPostsData = await axios.get(`https://my-ravi-project.herokuapp.com/api/chart-startups/chart-js-custom-api/fetch`)
      labels = allPostsData.data.labels
      datasets = allPostsData.data.datalabels
      options = allPostsData.data.options
      type = allPostsData.data.type
      title= allPostsData.data.title
      desc= allPostsData.data.desc
      data = {
        title: title,
        desc: desc,
        labels: labels,
        datasets: datasets,
        options: options,
      };
      setchart(data)
      setChartType(type)
      setHaveData(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    chartCalling();
  }, [haveData])
  
  if (haveData) {
    return <div className='w-screen grid md:grid-cols-1 lg:grid-cols-2 justify-center'>
    <div className='lg:w-6/12 lg:h-1/6 lg:m-24 md:m-0 md:w-fit md:h-1/6'>
       { 
           haveData ? <Chart type={Charttype} data={chart} showTooltips={true} /> : <div>Sumit</div>
       }
         {/* {console.log(chart)} */}
       </div>
       {
         haveData ? <div>
       <h1 className='text-3xl font-semibold capitalize flex justify-center flex-wrap'>{chart.title}</h1>
       <p className='text-md text-left flex justify-center p-8 flex-wrap'>{parse(chart.desc.slice(0, 2500))}<p className='font-semibold w-full flex justify-center p-1 hover:bg-slate-200 my-2 rounded hover:shadow-sm bg-slate-200 underline cursor-pointer hover:font-bold'>
        <Link  to={{pathname: `chart-post`}}>Read More</Link>
       </p></p>
       </div> : <div>Sumit</div>
       }
     
      
       </div>
  }
else {
  return (
    <>
      <div>Loading...</div>
    </>
   
  )
}
}

export default MyChartJS