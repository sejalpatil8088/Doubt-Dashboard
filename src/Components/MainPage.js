import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JSAlert from "js-alert";


const Mainpage = () => {



    const [finalCourse, setCourse] = useState();
    const [inputDataa, setInputData] = useState();
    const [response, setResponse] = useState();
    const [dummyState, rerender] = React.useState(1);
    // const [expert, setExpertAns] = useState();
    const [userIddd, setUserId] = useState([]);







    const navigate = useNavigate()

    // localStorage.setItem("userId", "64ca340a32ff100047447927")


    const id = localStorage.getItem("id")
    console.log(id);

    const token = localStorage.getItem("user");
    const tokenData = token.slice(1, -1);


    // https://admin-api.pwskills.com/admin/doubt/replies/64c8b266b6747e00266b468c


    const onClick = function () {
        rerender(dummyState + 1);
    }



    const Data = async () => {
        try {
            const course = await axios.get(
                `https://admin-api.pwskills.com/admin/doubt/?skip=0&limit=50&courseId=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData}`
                    }
                }

            );
            setCourse(course)

            console.log(course);


        } catch (error) {
            alert(error)
        }


    }

    const storeID = (userId) => {
        const iddd = userId.target.id
        console.log(iddd);
        userIddd.push(iddd)
        console.log(userIddd);
        const dataStr = JSON.stringify(userIddd)
        localStorage.setItem("userId", dataStr)
    }



    const clicked = async function (id) {

        let userId = id.target.id
        // storeID(userId)

        // setExpertAns(userId)

        const child = document.getElementById(userId)
        const parent = child.parentNode.id

        try {


            await axios.patch(
                `https://admin-api.pwskills.com/admin/doubt/${userId}/reply`,
                {
                    comment: inputDataa,
                    lessonId: parent
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenData}`,
                        'Content-Type': 'application/json'
                    },
                }
            ).then((response) => {
                setResponse(response.data.message)
            })



        } catch (error) {
            alert(error)
        }

        const comment = await axios.get(`https://admin-api.pwskills.com/admin/doubt/replies/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenData}`,
                },
            }
        )
        storeID(id)

        if (comment) {
            onClick()
            console.log(comment.data.data[0].comment);
            console.log(response);

            if (response === "successfully replied to comment") {
                const getParent = document.getElementById(`${parent}pr`)
                console.log(getParent);
                const inputTag = document.getElementById(`${parent}input`)
                const btnDiv = document.getElementById(parent)

                inputTag.classList.add("hidden")
                btnDiv.classList.add("hidden")
                const newHone = document.createElement("h1")
                newHone.style.color = "white"
                const textnode = document.createTextNode("Already answered")
                newHone.appendChild(textnode)
                getParent.appendChild(newHone)
                console.log(newHone);
                const coloHead = document.getElementById(`${parent}colorh`)
                coloHead.classList.remove("bg-yellow-500")
                coloHead.classList.add("bg-green-500")


            }
            JSAlert.alert("sucess").dismissIn(1000 * 2)

        }






    }

    let dataMap

    if (finalCourse) {
        dataMap = finalCourse.data.data
    }

    useEffect(() => {
        console.log("dummyState's state has updated to: " + dummyState)
    }, [dummyState])




    return (
        <>

            <div className="bg-[#3D40C7] flex justify-between h-[90px] border-[2px] border-[black]  text-center " >
                <h1 className="pt-[15px] text-[white] ml-[200px] mt-[20px] font-[900] " >{finalCourse ? finalCourse.data.data[0].courseDetails.title : "Click to Get Data"}</h1>
                <div className="mr-[70px] mt-[15px] ">
                    {/* <button onClick={() => Data()} className=" mr-[40px] border-[2px] border-[black] hover:bg-orange-500 font-[800] bg-yellow-500 mt-[20px] h-[50px] w-[150px] rounded " >Get Data</button> */}

                    <button onClick={() => Data()} class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-black hover:text-[white] font-[900] bg-[white] mr-[20px] rounded-lg group">
                        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span class="relative">Fetch Doubts</span>
                    </button>

                    {/* <button className="bg-yellow-500  mt-[20px] h-[50px] border-[2px] border-[black] hover:bg-orange-500 font-[800] w-[150px] rounded " onClick={() => navigate("/sheetpage")}>Sheet</button> */}

                    <button onClick={() => navigate("/sheetpage")} class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-white w-[150px] h-[55px] rounded shadow-md group">
                        <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </span>
                        <span class="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full font-[900]  ease">Sheet</span>
                        <span class="relative invisible">Sheet</span>
                    </button>


                </div>
            </div>
            {
                dataMap ? <div className="" >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650, width: "max-content", color: "#CAD5E2" }} aria-label="simple table">
                            <TableHead sx={{ background: "#1FAA59" }} >
                                <TableRow>
                                    <TableCell sx={{ border: "solid 2px black" }} ><h1 className="text-[20px] text-[white] font-[900] " >Course name</h1></TableCell>
                                    <TableCell sx={{ border: "solid 2px black" }} align="left"><h1 className="text-[20px] text-[white] font-[900] " >Lesson name</h1></TableCell>
                                    <TableCell sx={{ border: "solid 2px black" }} align="left"><h1 className="text-[20px] text-[white] font-[900] " >User name</h1></TableCell>
                                    <TableCell sx={{ border: "solid 2px black" }} align="left"><h1 className="text-[20px] text-[white] font-[900] " >User Email</h1></TableCell>
                                    <TableCell sx={{ border: "solid 2px black" }} align="left"><h1 className="text-[20px] text-[white] font-[900] " >Comment</h1></TableCell>
                                    <TableCell sx={{ border: "solid 2px black" }} align="left"><h1 className="text-[20px] text-[white] font-[900] " >Status</h1></TableCell>
                                    <TableCell sx={{ border: "solid 2px black" }} align="left"><h1 className="text-[20px] text-[white] font-[900] " >Expert ans</h1></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {dataMap.map((row) => (
                                    <TableRow id={row._id + "p"}
                                        key="1"
                                        sx={{ border: "2px white solid" }}
                                    >
                                        <TableCell sx={{ border: "solid 2px black" }} component="th" scope="row">{row ? row.courseDetails.title : "click to Get Data"} </TableCell>
                                        <TableCell sx={{ width: "270px", border: "solid 2px black" }} align="left">{row.lessonDetails.title}</TableCell>
                                        <TableCell sx={{ border: "solid 2px black" }} align="left">{row.userDetails.firstName}</TableCell>
                                        <TableCell sx={{ border: "solid 2px black" }} align="left">{row.userDetails.email}</TableCell>
                                        <TableCell sx={{ fontWeight: "800", borderBottom: "none", width: "auto", maxWidth: "600px", border: "solid 2px black" }} align="left">{row.comment}</TableCell>
                                        {
                                            row.doubtStatus === "open" ? <TableCell sx={{ border: "solid 2px black" }} align="left"><h1 id={`${row.lessonId}colorh`} className="bg-yellow-500 font-[800] changeColo p-[3px] text-black  text-center rounded  " >{row.doubtStatus}</h1></TableCell> : <TableCell sx={{ color: "#0D0D0D", border: "2px solid black", fontWeight: "800" }} align="left"><h1 className="bg-green-500 p-[3px] rounded " >{row.doubtStatus}</h1></TableCell>
                                        }
                                        <TableCell sx={{ color: "white", border: "2px solid black", fontWeight: "800" }} align="left">
                                            {
                                                row.doubtStatus === "open" ? <div id={`${row.lessonId}pr`} className="flex text-[black] gap-[30px]" >
                                                    <textarea id={`${row.lessonId}input`} onChange={(e) => setInputData(e.target.value)} className="h-[100px] border-[black] border-[2px] p-[5px] w-[300px] text-[15px] rounded " ></textarea>
                                                    {/* <textarea></textarea> */}
                                                    <div id={row.lessonId} className="bg-blue-500  hover:bg-[black] ease-in duration-300 w-[100px] rounded " ><button id={row._id} onClick={(e) => clicked(e)} className="bg-blue-500 w-[100px] hover:bg-[black] ease-in duration-300 text-[white]  h-[70px] rounded mt-[5px] ">submit</button></div>
                                                </div> :
                                                    <div>
                                                        <h1 className="text-[black]" >Already Answered</h1>
                                                        {/* <button id={row._id} onClick={(e) => clicked(e)} className="bg-blue-500 w-[100px] rounded mt-[5px] ">submit</button> */}
                                                        {/* <button id="64cc9d20a52f590026de5b86" onClick={(e) => storeID(e)} className="bg-blue-500 w-[100px] rounded mt-[5px] ">submit</button> */}
                                                    </div>
                                            }

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div> : <div></div>
            }
        </>
    )
}


export default Mainpage