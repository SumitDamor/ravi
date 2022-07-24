import { Chart } from 'chart.js';
import React, { useContext, useState, useEffect } from 'react'
import { useRef } from 'react';
import { createContext } from 'react'
import { FiX } from "react-icons/fi";
import postApi from '../context/postApi';
import TagsInputField from './TagsInputField'
import TinyMCEEditor from './TinyMCEEditor';
const StartupChart = (props) => {

  const userData = useContext(postApi)


  const [TitleDesc, settitleDesc] = useState()
  // console.log();

  const [MyDatatags, setMyDatatags] = useState([])
  const [MyBgTags, setMyBgtags] = useState([])
  const [MyBcTags, setMyBctags] = useState([])
  const [labels, setLabels] = useState([])
  const [label, setlabel] = useState()
  const [typeChart, settypeChart] = useState('doughnut')
  const [allArrays, setallArrays] = useState([])
  const [tecData, dataFromTCE] = useState()



  function refData(e) {
    settitleDesc({...TitleDesc, [e.target.name]: e.target.value})
  }

  function labelChange(e) {
    setlabel(e.target.value)
  }
  function labelstagsTar(tags) {
    setLabels(tags)
  }

  function datatagsTar(tags) {
    // console.log([tags]);
    setMyDatatags(tags)
  }
  function bgagsTar(tags) {
    // console.log([tags]);
    setMyBgtags(tags)
  }
  function bctagsTar(tags) {
    // console.log([tags]);
    setMyBctags(tags)
  }
  // const datatagsTar = tags => console.log(tags);
  function submitData() {
    let obj = 
        {
          "label": label,
          "data": MyDatatags,
          "backgroundColor": MyBgTags,
          "boderColor": MyBcTags,
          "borderWidth": 1,
          "tension": 0.4,
          "fill": true,
        }
    // allArrays.push(obj)
    setallArrays([...allArrays, obj]);
  }
  function deleteAllData() {
    setallArrays([])
  }
  function deleteEverything() {
    setallArrays([])
    setLabels([])
  }
  function setChartFunc(e) {
    settypeChart(e.target.value)
  }

  function dataFunc(data) {
    dataFromTCE(data)
  }

  function sendChartDataToState() {
    let endObj = {
      "title": TitleDesc.chart_title,
      "desc": tecData,
      "type": typeChart,
      "labels": labels,
      "datalabels": allArrays,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }

    }
    userData.ChartFunc(endObj)
  }
  return (
    <div className='m-4 flex flex-col gap-3'>
      <h1>My Chart Fields</h1>

      <label for="charts">Select a chart:</label>

      <select className='p-2 bg-slate-100 ' name="charts" id="charts" value={typeChart} onChange={setChartFunc}>
        <option value="line">Line</option>
        <option value="radar">Radar</option>
        <option selected value="doughnut">Doughnut</option>
        <option value="bar">Bar</option>
        <option value="polarArea">Polar Area</option>
        <option value="scatter">Scatter</option>
        <option value="bubble">Bubble</option>
        <option value="pie">Pie</option>
      </select>
      <h1>Add labels:</h1>
      <TagsInputField
        tagsTar={labelstagsTar}
        placeholder='Enter Labels'
      />

      <div className='flex flex-wrap bottom-2 border-black bg-slate-100'>
        {
          labels.map((value) => {
            return (
              <p className='bg-blue-100 rounded px-2 m-1'>{value}</p>
            )
          })
        }
      </div>

      <h1>Add All Data</h1>
      <input className='w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default' type="text" placeholder='Enter Label' onChange={labelChange} />
      <input className='w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default'  type="text" placeholder='Chart Title' onChange={refData} name='chart_title'/>
      {/* <input className='w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default'  type="text" placeholder='Chart Description' onChange={refData} name='chart_desc'/> */}

<div>
            <TinyMCEEditor
              dataFunc={dataFunc}
              apiKey='prndtdop69f2yh9hk3rend694t0dtz3fq734rz63vr6jczzq'
              
            />
          </div>
      <TagsInputField
        tagsTar={datatagsTar}
        placeholder='Enter Data Points'
      />

      <TagsInputField
        tagsTar={bgagsTar}
        placeholder='Enter Background Colors'
      />
      <TagsInputField
        tagsTar={bctagsTar}
        placeholder='Enter Border Color/Colors'
      />
      <div className='flex flex-col md:flex-row  justify-center gap-2'>
        <button className='bg-gray-100 px-6 py-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:font-bold hover:bg-gray-200 hover:shadow-xl text-black' onClick={submitData}>Submit Data</button>
        <button className='bg-gray-100 px-6 py-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:font-bold hover:bg-gray-200 hover:shadow-xl text-black' onClick={deleteAllData}>Delete Only Data</button>
        <button className='bg-gray-100 px-6 py-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:font-bold hover:bg-gray-200 hover:shadow-xl text-black' onClick={deleteEverything}>Delete Everything</button>
      </div>

      <div className='border-2 border-black'>
        {
          allArrays.map((value, i) => {
            return <div className='bg-slate-100 m-2'>
              <p>Data No. {i + 1}</p>
              {/* {console.log(value)} */}
              <p>Label: {value.label}</p>
              <div className='flex'>DATA: {value.data.map((v) => {
                return (<p className='bg-red-100 px-2 m-1'>{v}</p>)
              })}</div>
              <div className='flex'>Background Color: {value.backgroundColor.map((v) => {
                return (<p className='bg-red-100 px-2 m-1'>{v}</p>)
              })}</div><div className='flex'>Border Color: {value.boderColor.map((v) => {
                return (<p className='bg-red-100 px-2 m-1'>{v}</p>)
              })}</div>
            </div>
          })




        }

      </div>

      <button className='bg-gray-100 px-6 py-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:font-bold hover:bg-gray-200 hover:shadow-xl text-black' onClick={sendChartDataToState}>Add Chart</button>
    </div>
  )
}

export default StartupChart