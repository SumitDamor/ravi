import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import PostsContext from '../context/posts/postsContext';
import CardDesign from './CardDesign';
import ReadTemplate from '../ReadTemplate';
import parse from 'html-react-parser';
const PostDesign = ({ props }) => {
  const c1 = useContext(PostsContext);
  let location = useLocation()
  const [tags, settags] = useState([])
  // const x = String(props.title.length)
  // console.log(props);

  useEffect(() => {
    window.scrollTo(0, 0)
    // props.first_load_func()
    return () => {
      // tags iterating
      // console.log([props.tags]);
      if ([props.tags]) {
        try {
          [props.tags].map((tag) => {
            return (
              settags(tag),
              console.log(tags)
            )
          })
        } catch (error) {
          console.log(error);
        }
      }
      else {
        settags("No Tags")
      }

    }
  }, [])


// console.log(props.tags);

  // Recommandation Engine
  let business_algo = [];
  if (props.category === "Business") {
    business_algo = c1.business_data
  } else if (props.category === "Startups") {
    business_algo = c1.startups_data
  }
  else if (props.category === "Sports") {
    business_algo = c1.sports_data
  }
  else if (props.category === "Technology") {
    business_algo = c1.tech_data
  }
  else {
    business_algo = c1.data
  }

  let randomNumber = Math.floor(Math.random() * business_algo.length);


  // Algorithm Maths
  let algo_maths = business_algo.length - 4;
  // console.log(algo_maths);
  if (randomNumber > algo_maths) {
    randomNumber = randomNumber - 4;
  }


// let readTime = props.desc.length * 0.008;
  return (
    <>
 <div class="blog-post">

  <img className='h-72 w-screen object-cover' srcSet={props.image_link} alt="" />
		<article>
			<div class="blog-content">
				<summary>
					<h3 className='h3-class'>{props.title}</h3>
					<div class="blog-date">{props.date}</div>
          <Link to={`/${props.category}`}>
            <h2 className='text-md font-semibold text-purple-600'>{props.category}</h2>
          </Link>
				</summary>
				<p className='p-class text-justify'>{parse(`<div className'flex-wrap text-justify break-all'>${props.desc}</div>`)}</p>

        <div className='mx-40 flex justify-center content-center'>
          {tags.map(function (tag) {
            return (
              <>
                <h2 className='px-4 py-1 bg-slate-200 mx-1 rounded-2xl font-semibold'>{tag}</h2>
              </>
            )
          })}
        </div>
			</div>	
	</article>
</div>
   

      {/* Algorithm HTML Append */}
      <div className='text-center'>
        <h1 className='text-center mt-8 text-4xl font-semibold'>Recommandations</h1>
        <div className='w-screen grid md:grid-cols-2 lg:grid-cols-4 justify-center p-16'>
          {

            business_algo.slice(randomNumber, randomNumber + 4).map((info) => {
              return (
                <>
                  <CardDesign {...info} />
                </>
              )
            })}
        </div>
      </div>




     

    </>
  )
}

export default PostDesign