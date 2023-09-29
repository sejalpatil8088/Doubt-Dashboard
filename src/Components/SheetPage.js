import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";



const SheetPage = () => {

    const userid = localStorage.getItem("userId")
    const jsonUserId = JSON.parse(userid)

    const [collection, setCollection] = useState([])
    const ydata = []
    const [base, setbase] = useState([])
    const [count, setCount] = useState(0)


    const [finalCourse, setCourse] = useState();


    const id = localStorage.getItem("id")

    const token = localStorage.getItem("user");
    const tokenData = token.slice(1, -1);


    const Data = async () => {
        try {
            const course = await axios.get(
                `https://admin-api.pwskills.com/admin/doubt/?skip=0&limit=12&courseId=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenData}`
                    }
                }

            );
            setCourse(course)

            if (course) {
                // console.log(course);

            }



        } catch (error) {
            alert(error)
        }


    }
    useEffect(() => {
        handleClick()
        Data()
    }, [])


    const handleClick = async () => {
        Data()

        if (finalCourse) {
            const filter = await finalCourse.data.data



            for (let i = 0; i < jsonUserId.length; i++) {

                for (let x = 0; x < filter.length; x++) {
                    // console.log(filter[x]._id);
                    if (jsonUserId[i] === filter[x]._id) {
                        // console.log("filter data" + jsonUserId[i], filter[x]);

                        ydata.push(filter[x])
                        console.log(filter[x]);

                    }
                }


            }

            console.log(ydata);
            setbase(ydata)


            if (ydata && count === 0) {
                try {
                    for (let i = 0; i < ydata.length; i++) {
                        const comment = await axios.get(`https://admin-api.pwskills.com/admin/doubt/replies/${ydata[i]._id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${tokenData}`,
                                },
                            }
                        )

                        collection.push(comment)
                        console.log(collection);
                        ydata[i].commentA = collection[i].data.data[0].comment
                        console.log("ydata");
                        console.log(ydata[i]);


                    }
                    setCount(1)

                } catch (error) {
                    alert(error)
                }
            }
            console.log(collection);

            const btn = document.getElementById("321btn");
            btn.classList.add("hidden")


        }


    }






    return (
        <>
            <div className="bg-blue-500 h-[80px] text-center p-[5px] "  >
                <button id="321btn" className=" mt-[5px] hover:bg-[black] hover:text-[white] ease-in duration-300 text-[20px] font-[700] bg-green-500 w-[150px] h-[50px] rounded " onClick={() => handleClick()} >Get Sheet</button>
            </div>

            <div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Course name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    lession name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User email Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Comment
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Expert Answer
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Handeled by
                                </th>
                            </tr>
                        </thead>

                        {
                            base.map((e) => (
                                <tbody>
                                    <tr className="bg-white border-b  dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {e.courseDetails.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {e.lessonDetails.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {e.userDetails.firstName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {e.userDetails.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {e.comment}
                                        </td>
                                        <td className="px-6 py-4">
                                            {e.commentA}
                                        </td>
                                        <td className="px-6 py-4">
                                            Answered
                                        </td>
                                        <td className="px-6 py-4">
                                            Prince
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        }
                    </table>
                </div>

            </div>
        </>
    )
}

export default SheetPage