import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JSAlert from "js-alert"


const Dashboard = () => {

    const navigate = useNavigate();


    const [apiData, setApiData] = useState("");
    const [dummyState, rerender] = React.useState(1);


    const token = localStorage.getItem("user");
    const tokenData = token.slice(1, -1);
    // console.log(tokenData);

    let abc

    const onClick = () => {
        rerender(dummyState + 1);
    }

    const getData = async () => {


        try {
            abc = await axios.get(
                "https://admin-api.pwskills.com/admin/course/allcourses",
                {
                    headers: {
                        Authorization: `Bearer ${tokenData}`
                    }
                }
            );

            console.log(abc.data.data[0].title);
            console.log(abc.data.data[0]._id);

            setApiData(abc)

        } catch (error) {
            alert(error?.message)
        }
        onClick()


    }



    const nav = (id) => {
        // console.log(id.target);
        // console.log(id.target);
        const event = id.target.id;
        console.log(event);
        localStorage.setItem("id", event)
        if (event) {
            navigate("/mainpage")
        } else {
            JSAlert.alert("Please Click again").dismissIn(1000 * 2)
        }
    }

    useEffect(() => {
        console.log("dummyState's state has updated to: " + dummyState)
    }, [dummyState])



    return (
        <>

            <div className="" >
                <nav className="bg-[#3D40C7] border-b-2 border-[black] h-[90px] pt-[20px] text-[white] text-center text-[30px] font-[900] "  >
                    <h1>Dashboard</h1>
                </nav>

                <div className=" w-[100vw] ">


                    {/* <button className="mt-[-65px] ml-[20px] absolute   w-[170px] text-white font-[900] ml-[-20px] h-[50px] rounded " onClick={() => getData()} >Get Data</button> */}

                    <button onClick={() => getData()} class="absolute mt-[-105px] ml-[20px] inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-black font-[900] hover:text-[white] bg-[white] rounded-lg group">
                        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-black rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span class="relative">Fetch Cources </span>
                    </button>


                    {
                        !apiData ? <div className="relative animate-border rounded-md bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1 text-center w-[50vw] mx-[auto] mt-[2rem]   w-[900px] text-[15px] font-[600] " ><span className="block rounded-md  px-5 py-3 font-bold text-white bg-[#101011] " >Click on "Fetch Cources Button"  to get task assignet to you </span></div>
                            : <>
                                <div id="kk">
                                    {
                                        apiData.data.data.map((e) => (
                                            <div className="relative box-sh text-left w-[50vw] mx-[auto] mt-[2.5rem]  text-[15px] font-[600]  p-[15px] rounded" >
                                                <h1 className="ml-[20px] mt-[5px] " id={e._id} >{e.title}</h1>
                                                {/* <button id={e._id} className=" bg-[#1C8D73] p-[5px] w-[150px] mt-[-32px] rounded  border-[2px] border-[black] hover:text-[white] hover:border-[white] float-right	" onClick={(e) => nav(e)} >Get</button> */}
                                                <button onClick={(event) => nav(event)} class="relative inline-flex h-[40px] items-center px-12 py-3 mt-[-35px] overflow-hidden text-lg font-medium text-black-600 border-2 border-black rounded-full hover:text-white group hover:bg-gray-50 float-right">
                                                    <span class="absolute left-0 block w-full h-0 transition-all bg-black opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                                    <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                                    </span>
                                                    <span id={e._id} class="relative">Get Doubts</span>
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                    }

                </div>


            </div>

        </>
    )
}

export default Dashboard