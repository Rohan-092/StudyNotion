import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { courseEndpoints } from '../services/api';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {

//   const { loading } = useSelector((state) => state.profile)
    const [loading,setLoading] = useState(false);
    const { catalogName } = useParams()
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [diffCateCourse, setDiffCateCourse] = useState([]);

    //Fetch all categories
    useEffect(()=> {
    
      const getCategories = async() => {
        setLoading(true);
          const res = await apiConnector("GET", courseEndpoints.COURSE_CATEGORIES_API);
          console.log(res);
          const category = 
        //   res?.data?.allTags?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
          res?.data?.allTags?.filter((ct) => ct.name === catalogName);
          const category_id = category[0]._id;
          console.log("categoryidddddd..........",category_id);
          setCategoryId(category_id);
        setLoading(false);
      }
      getCategories();
  },[catalogName]);

  useEffect(() => {
      const getCategoryDetails = async() => {
        setLoading(true);
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("Printing res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
          setLoading(false);
      }
      if(categoryId) {
          getCategoryDetails();
      }
      
  },[categoryId]);

  useEffect(() => {
    if (!loading && catalogPageData?.data?.differentCategory) {
    let newDiffCate = []
      newDiffCate = catalogPageData.data.differentCategory.map((categoryCourses) => {
        return categoryCourses
      });
      newDiffCate = newDiffCate.map((element) => {
        return element.course
      });
      let allCourses = [];
      Object.values(newDiffCate).forEach( (arr)=>{
        arr.forEach( (course)=>{
          allCourses.push(course);
        })
      })
      setDiffCateCourse(allCourses);
    }
  }, [catalogPageData]);


  if (loading || !catalogPageData) {
      console.log("1");
      console.log("loa....",loading);
      console.log("catalogPageData....",catalogPageData);
      return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      )
    }
    if (!loading && !catalogPageData.success) {
      console.log("2");
      console.log("loa....",loading);
      console.log("catalogPageData....",catalogPageData);
      return <Error />
    }

    console.log("final",catalogPageData);
    console.log("catalogPageData?.data?.differentCategory",catalogPageData?.data?.differentCategory);
    console.log(catalogPageData.data.selectedCategory);
    console.log(diffCateCourse);

    // let diffCate = [];
    // if(!loading && (catalogPageData !== null && catalogPageData !== undefined)){
    //   catalogPageData?.data?.differentCategory.forEach( (categoryCourses)=>{
    //     categoryCourses.course.forEach( (element) =>{
    //       diffCate.push(element);
    //     })

    //   })
    // }
    // console.log("diffCate........",diffCate);

    return (
      <>
        {/* Hero Section */}
        <div className=" box-content bg-richblack-800 px-4">
          <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
            <p className="text-sm text-richblack-300">
              {`Home / Catalog / `}
              <span className="text-yellow-25">
                {catalogPageData?.data?.selectedCategory?.name}
              </span>
            </p>
            <p className="text-3xl text-richblack-5">
              {catalogPageData?.data?.selectedCategory?.name}
            </p>
            <p className="max-w-[870px] text-richblack-200">
              {catalogPageData?.data?.selectedCategory?.description}
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">Courses to get you started</div>
          <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <p
              className={`px-4 py-2 ${
                active === 1
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              } cursor-pointer`}
              onClick={() => setActive(1)}
            >
              Most Populer
            </p>
            <p
              className={`px-4 py-2 ${
                active === 2
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              } cursor-pointer`}
              onClick={() => setActive(2)}
            >
              New
            </p>
          </div>
          <div>
            <CourseSlider
              Courses={catalogPageData?.data?.selectedCategory?.course}
            />
          </div>
        </div>
        {/* Section 2 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">
            Top courses in {catalogPageData?.data?.differentCategory?.name}
          </div>
          <div className="py-8">
            <CourseSlider
              Courses={diffCateCourse}
            />
          </div>
        </div>

        {/* Section 3 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <div className="section_heading">Frequently Bought</div>
          <div className="py-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, i) => (
                  <Course_Card course={course} key={i} Height={"h-[400px]"} />
                ))}
            </div>
          </div>
        </div>

        <Footer />
      </>
    )
  }

export default Catalog