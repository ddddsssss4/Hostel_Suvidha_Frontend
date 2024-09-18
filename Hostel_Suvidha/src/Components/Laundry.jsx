import React, { useState, useEffect } from "react";
import axios from "axios";
import bgelm from "../assets/bgelement.png";
import { Formik, Form, Field } from "formik";

const Laundry = () => {
  const token = localStorage.getItem("accessToken");
  const [clothes, setClothes] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [previousClothes, setPreviousClothes] = useState([]);
  const [update , setUpdate]=useState(false);

  // Fetch previous laundry requests on component mount
  useEffect(() => {
    console.log("Stored token:", token);
    const fetchPreviousClothes = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/students/getLaundryRequests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched API Response:", response.data.data);
        // Adjust the code to set the correct array of laundry entries
        setPreviousClothes(
          Array.isArray(response.data.data) ? response.data.data : []
        );
      } catch (error) {
        console.error("Error fetching previous clothes:", error);
        setPreviousClothes([]); // Set an empty array in case of error
      }
    };

    fetchPreviousClothes();
  }, [backendUrl, token,update]);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Form data", values);

    const totalClothes = [
      "t-shirts",
      "lower",
      "shirts",
      "bedsheet",
      "pillow cover",
      "shorts",
      "pants",
      "towel",
    ].reduce((total, item) => total + (parseInt(values[item]) || 0), 0);

    setClothes(totalClothes);

    const newEntry = {
      clothes: totalClothes,
      date: values.date,
      status: "PENDING",
      items: values,
    };
    setPreviousClothes((prev) => [...prev, newEntry]);

    try {
      const response = await axios.post(
        `${backendUrl}/students/laundry`,
        {
          tShirts: values["t-shirts"],
          lowers: values.lower,
          shirts: values.shirts,
          bedsheets: values.bedsheet,
          pillowCovers: values["pillow cover"],
          shorts: values.shorts,
          pants: values.pants,
          towels: values.towel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response);
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setSubmitting(false);
      setUpdate(!update);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.date) {
      errors.date = "Required";
    }
    return errors;
  };

  return (
    <div className="relative text-white px-4 sm:px-0">
      <img
        src={bgelm}
        alt="Background Element"
        className="absolute inset-0 w-full h-full object-cover top-[-6vh] z-[-1]"
      />
      <div className="flex flex-col min-h-screen gap-6 mt-12">
        <h1 className="font-extrabold text-3xl text-center sm:text-left">
          LAUNDRY
        </h1>
        <div className="flex lg:w-[75vw] flex-col lg:flex-row gap-8 mb-4">
          <div className="p-6 border-t-8 border-[#7380EC] bg-[#202528] lg:w-2/3 rounded-md h-[70vh]">
            <Formik
              initialValues={{
                "t-shirts": 0,
                lower: 0,
                shirts: 0,
                bedsheet: 0,
                "pillow cover": 0,
                shorts: 0,
                pants: 0,
                towel: 0,
                date: "",
              }}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <h1 className="text-xl">List Of Clothes</h1>
                    <div className="flex gap-2 items-center justify-end">
                      <label className="block text-sm font-medium">
                        DATE :{" "}
                      </label>
                      <Field
                        name="date"
                        type="date"
                        className={`mt-1 block w-full lg:w-[40%] border-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-[#171A1C] p-2 placeholder-gray-400 ${
                          errors.date && touched.date ? "border-red-500" : ""
                        }`}
                      />
                      {errors.date && touched.date && (
                        <div className="text-red-500 text-sm">
                          {errors.date}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {[
                      "T-SHIRTS",
                      "LOWER",
                      "SHIRTS",
                      "BEDSHEET",
                      "PILLOW COVER",
                      "SHORTS",
                      "PANTS",
                      "TOWEL",
                    ].map((item) => (
                      <div key={item}>
                        <label className="block text-sm font-medium text-white">
                          {item}
                        </label>
                        <Field
                          name={item.toLowerCase()}
                          type="number"
                          className="mt-1 bg-[#171A1C] block w-full lg:w-[60%] rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-white placeholder-gray-400"
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className=" bg-indigo-600 text-white py-2 px-10 mx-auto block rounded-xl hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="p-6 bg-[#202528] border-t-8 border-[#7380EC] lg:w-1/3 rounded-md h-[70vh] overflow-y-scroll">
            <h1 className="text-xl">Previous Clothes</h1>
            {/*Render previous clothes */}
            <div className="flex flex-col gap-4">
              {Array.isArray(previousClothes) && previousClothes.length > 0 ? (
                previousClothes.map((entry, index) => (
                  <div
                    key={index}
                    className="card p-4 rounded-md bg-[#171A1C] flex flex-col"
                  >
                    <div className="head font-bold text-xl flex justify-between">
                      <div className="no">{index + 1}.</div>
                      {/* Update to access totalClothes or whatever property holds the total */}
                      <div>{entry.totalClothes || entry.clothes} Clothes</div>
                      {/* Make sure date is properly accessed and formatted */}
                      <div>
                        {entry.createdAt
                          ?.split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/")}
                      </div>
                    </div>
                    <div className="type mt-4 gap-2 flex flex-wrap">
                      {/* Make sure `entry.clothes` holds the correct object to map over */}
                      {Object.entries(entry.clothes || {}).map(
                        ([key, value]) =>
                          value > 0 && (
                            <div
                              key={key}
                              className="tiles h-10 py-1 px-2 gap-2 rounded-2xl flex bg-[#202528]"
                            >
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                              <div className="count p-1 w-8 h-8 text-center rounded-[40%] bg-[#7380EC]">
                                {value}
                              </div>
                            </div>
                          )
                      )}
                    </div>

                    <div className="status flex justify-between mt-2 items-center">
                      <h2 className="font-bold text-md">STATUS : </h2>
                      <h2 className="text-yellow-400 font-bold text-md">
                        {entry.status || "PENDING"}
                      </h2>
                    </div>
                  </div>
                ))
              ) : (
                <p>No previous clothes found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laundry;
