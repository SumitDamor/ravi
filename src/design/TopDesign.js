import React, {useState, useEffect} from 'react'

const TopDesign = (props) => {
    // https://goquotes-api.herokuapp.com/api/v1/all/quotes


    const [first, myData] = useState({})

    const first_load_func = async () => {
      try {
        const response_business = await fetch(`https://goquotes-api.herokuapp.com/api/v1/all/quotes`)
        const business_data = await response_business.json()
         let randomNumber = Math.floor(Math.random() * business_data.quotes.length);
    console.log(randomNumber);
        const myObj = {
            quote: `${business_data.quotes[randomNumber].text}`,
            author: `${business_data.quotes[randomNumber].author}`
        }
        myData(myObj)
         console.log(myObj);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      first_load_func();
    }, [])

  

  return (
    <>
           <div className='w-screen h-fit bg-center bg-no-repeat backdrop-brightness-10 bg-cover' style={{ backgroundImage: `url(${props.img})`}}>
    <div className='w-full h-full rounded-lg p-6 bg-black bg-opacity-60 flex flex-col justify-center items-center'>
      <h1 className='text-white mb-0 font-semibold text-3xl tracking-wide'>{props.topTitle}</h1>
      <p className='text-white mt-4 mb-0 font-thin text-md tracking-wide text-center'>
     {/* "{first.quotes[5].text}" */}
     ❝
     {
       " "+ first.quote + " "
     }
      ❞
      </p>
      <p className='text-white mt-4 mb-0 font-semibold text-md tracking-wide text-center'>
     {
       " – " + first.author
     }
      </p>
    </div>
    </div>
    </>
  )
}

export default TopDesign