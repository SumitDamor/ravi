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
const ChartPage = () => {
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
            title = allPostsData.data.title
            desc = allPostsData.data.desc
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
        return <div className='w-screen flex flex-col my-12 items-center justify-center'>
            <h1 className='text-3xl font-semibold text-center capitalize flex justify-center flex-wrap'>{chart.title}</h1>
            <div className='lg:w-1/3 lg:h-1/3 lg:m-12'>
                <Chart type={Charttype} data={chart} showTooltips={true} />
            </div>
            <h1 className='text-3xl font-semibold text-center capitalize flex justify-center flex-wrap'>{Charttype}</h1>
            <p className='blog-content p-class text-left'>{parse(`<div className'flex-wrap break-all'>${chart.desc}</div>`)}</p>
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

export default ChartPage