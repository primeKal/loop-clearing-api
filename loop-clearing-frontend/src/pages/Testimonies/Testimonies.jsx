import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddTestimony from './AddTestimony'
import { baseUrl } from '../../EndPoints';



function Testimonies() {

  const [data, setData] = React.useState([])
  const images = [
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

  useEffect(() => { 
    getTestimonies()
  }, [])
  const getTestimonies = async () => {
    try {
      setSearchTerm("")
      const response = await fetch(baseUrl + 'transaction')
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
 
  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>Current Trading Transactions</h2>
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
        <div className="row flex-end">
          {data.length > 0
            ? data
            .filter(d => d?.user?.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((d, i) => (
                <div key={`${d?.user?.name}-${i}`} className="col-md-4">
                  <div className="testimonial">
                    <div className="testimonial-image">
                      {" "}
                      <img src={images[d.img]} alt="" />{" "}
                    </div>
                    <div className="testimonial-content">
                      <p>"{d.value}"</p>
                      <p>From - {d?.user?.name}</p>
                      <div className="testimonial-meta">To - {d?.partner?.name} </div>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
      {isModalOpen && (<AddTestimony isOpen={isModalOpen} closeModal={closeModal} getTestimonies={getTestimonies}></AddTestimony>)}
    </div>
  )
}

export default Testimonies