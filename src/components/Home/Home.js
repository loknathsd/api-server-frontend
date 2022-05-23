import React, { useRef,useState,useEffect } from 'react';

const Home = () => {
    const [stations,setStations] = useState([])

    const titleRef = useRef()
    const frequencyRef = useRef()


    useEffect(()=>{
        fetch('http://localhost:5000/stations')
        .then(res=>res.json())
        .then(data=>setStations(data))

    },[])



  const handleSubmit = e =>{
      const title = titleRef.current.value;
      const frequency = frequencyRef.current.value;
      const newStation ={title: title,frequency:frequency}
      console.log(newStation)
      fetch('http://localhost:5000/addStation',{
          method:'POST',
          headers:{'Content-Type' : 'application/json'},
          body:JSON.stringify(newStation)
      })
      .then(res=>res.json())
      .then(data=>{
          alert('Successfully created station')
          e.target.reset();
      })
        e.preventDefault()
  }

    const handleDelete = id =>{
        console.log(id)
        fetch(`http://localhost:5000/delete/${id}`,{
            method: 'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.deletedCount > 0){
                alert("Station is deleted Successfully")
                const remaining = stations.filter(station=>station._id !==id)
                setStations(remaining);
            }
        })
    }

    return (
        <div className='mt-5'>
            <h1>Radio Stations</h1>
            <hr />
            <div className="row">
                <div className="col-md-6">
                    <h3 className='mt-3 mb-4'>Create station</h3>
                    <form onSubmit={handleSubmit} className='w-50 mx-auto' action="">
                    <input ref={titleRef} className='form-control' type="text" placeholder='Title' /><br />
                    <input ref={frequencyRef} className='form-control' type="text" placeholder='Frequency' /><br />
                    <button className='btn btn-primary' type="submit"  >add station</button>
                    </form>
                </div>
                <div className="col-md-6 ">
                    <h2>all stations</h2>
                    {
                        stations.map(station=><li key={station._id} className='m-3 '>
                            {station.title} --{station.frequency} --
                            <button onClick={()=>handleDelete(station._id)} className='btn btn-sm btn-danger'>delete</button>--
                            <button className='btn btn-primary btn-sm'>update</button>
                            </li>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;