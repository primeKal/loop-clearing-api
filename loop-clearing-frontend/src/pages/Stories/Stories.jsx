import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../EndPoints';
import AddStory from './AddStory';
import { useNavigate } from 'react-router-dom'



function Stories() {

  const [data, setData] = React.useState([])
  const images = [
    "https://images.unsplash.com/photo-1525711857929-4272fb4a040f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=hasan-almasi-OwqLxCvoVxI-unsplash.jpg",
    "https://downloadscdn6.freepik.com/273609/46/45878.jpg?filename=happy-surprised-attractive-afro-american-woman-raises-hands-reacts-awesome-unexpected-relevation.jpg&token=exp=1711787817~hmac=50ca7046dd9eaeab04d2921c874dad31",
    "https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=neom-EbIvcXzgU4s-unsplash.jpg",
    "https://images.unsplash.com/photo-1528194663420-bfa489364cb5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=valentin-salja-9kbaq1xoIr0-unsplash.jpg",
    "https://images.unsplash.com/photo-1580922110301-a666f6745565?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=levi-meir-clancy-LheHIV3XpGM-unsplash.jpg",
    "https://images.unsplash.com/photo-1563804951831-49844db19644?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=duncan-kidd-Cju-BkSkM1k-unsplash.jpg",
  ];
  const headerImages = [
    "img/testimonials/01.jpg",
    "img/testimonials/02.jpg",
    "img/testimonials/03.jpg",
    "img/testimonials/04.jpg",
    "img/testimonials/05.jpg",
    "img/testimonials/06.jpg",
  ];

  const isLoggedIn = useSelector(state => state.loggedInStatus.isLoggedIn);
  const userData = useSelector(state => state.loggedInStatus.userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();


  useEffect(() => { 
    getStories()
  }, [])
  const getStories = async () => {
    try {
      setSearchTerm("")
      const response = await fetch(baseUrl + 'Stories')
      const data = await response.json()
      data.forEach(element => {
        element.img = Math.floor(Math.random() * images.length)
      });
      console.log("my name", data)
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }
  function convertToDisplayableDate(isoDateString) {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
    });
  }
 
  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>Take a look at the Stories left my our heroes</h2>
        </div>
        <div>
        <div className="logged-in">
          <input 
                className="search-input" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search ...'
                style={{
                  borderRadius: '15px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  fontSize: '16px',
                  width: '200px',
                  outline: 'none',
                  boxShadow: '0px 0px 5px 2px rgba(0,0,0,0.1)'
                }}
                ></input>
          {
            isLoggedIn && 
            // <div className="logged-in">
              <a
                href="#services"
                className="btn btn-custom btn-lg page-scroll"
                onClick={() => setIsModalOpen(true)}
              >
                Add New
              </a>
            // </div>
          }
        </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                        mt-10 px-10 md:px-15 lg:px-32'>
          {data.length > 0
            ? data
            .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((item, index) => (
                <div key={item.id} className='m-4 cursor-pointer' onClick={()=>navigate('blog-detail/'+item.id)} >
                <img src={images[item.img]} className='w-full rounded-2xl
                object-cover h-[200px]'/>
                <h3 className='text-red-500 mt-3'>{item.tag}</h3>
                <h3 className='font-bold mt-3'>{item.name}</h3>
                <h3 className='line-clamp-3 text-gray-400 mt-3'>{item.description}</h3>
                <div className='flex items-center mt-5'>
                 <img src={headerImages[item.img]}
                 className='w-[35px] rounded-full'/>
                 <div className='ml-2'>
                     <h3 className='font-bold text-[12px]'>{item.hero?.name?item?.hero?.name : "FFDB Bot"}</h3>
                     <h3 className='text-gray-500 text-[10px]'>{convertToDisplayableDate(item.createdAt)}</h3>
                 </div>
             </div>
             </div>
              ))
            : "loading"}
        </div>
      </div>
      {isModalOpen && (<AddStory isOpen={isModalOpen} closeModal={closeModal} getStories={getStories}></AddStory>)}
    </div>
  )
}

export default Stories