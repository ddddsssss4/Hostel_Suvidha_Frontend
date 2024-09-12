import React, { useState } from 'react';
import bgelm from '../assets/bgelement.png';
import { Formik, Form, Field } from 'formik';

const Laundry = () => {

  const [clothes, useclothes] = useState(0);
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Form data', values);

    try {
      // const response = axios.post(`/api/Laundry/${type}`)
      console.log();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="text-white pr-4 sm:ml-0 ml-4"> {/* Margin only on small screens */}
      <img 
        src={bgelm} 
        alt="Background Element" 
        className="absolute inset-0 w-full h-full object-cover top-[-6vh] z-[-1]" 
      />
      <div className="flex flex-col h-screen gap-4 mt-12">
        <h1 className="font-extrabold text-3xl pr-2 sm:ml-0 ml-4"> {/* Margin only on small screens */}
          LAUNDRY
        </h1>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className="p-6 border-t-8 border-[#7380EC] bg-[#202528] w-full lg:w-[65%] rounded-md space-y-6 sm:ml-0 ml-4"> {/* Margin only on small screens */}
            <Formik
              initialValues={{
                name: '',
                roomNumber: '',
                hostel: '',
                description: '',
                image: null,
                Date: ''
              }}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <h1 className="text-xl pr-2">
                      List Of Clothes
                    </h1>
                    <div className='flex gap-2 items-center'>
                      <label className="block text-sm font-medium text-white">DATE : </label>
                      <Field
                        name="date"
                        type="date"
                        className="mt-1 block w-full lg:w-[40%] border-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-white bg-[#171A1C] p-2 placeholder-gray-400"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {['T-SHIRTS', 'LOWER', 'SHIRTS', 'BEDSHEET', 'PILLOW COVER', 'SHORTS', 'PANTS', 'TOWEL'].map((item) => (
                      <div key={item}>
                        <label className="block text-sm font-medium text-white">{item}</label>
                        <Field
                          name={item.toLowerCase()}
                          type="number"
                          className="mt-1 bg-[#171A1C] block w-full lg:w-[40%]  rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-white placeholder-gray-400"
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className=" bg-indigo-600 text-white py-2 px-10 ml-[40%] rounded-xl hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="p-6 bg-[#202528] border-t-8 border-[#7380EC] w-full lg:w-[30%] rounded-md space-y-6 sm:ml-0 ml-4"> {/* Margin only on small screens */}
            <h1 className="text-xl pr-2">
              Previous Clothes
            </h1>
            <div className='flex flex-col gap-4'>
              <div className="card p-4 rounded-md bg-[#171A1C] flex flex-col">
                <div className="head font-bold text-xl flex justify-between">
                  <div className="no">1.</div>
                  <div className="">{clothes} Clothes </div>
                  <div className="">15/07/24</div>
                </div>
                <div className="type mt-4 gap-2 flex flex-wrap">
                  <div className="tiles h-10 py-1 px-2 gap-2 rounded-2xl flex bg-[#202528]">
                    T-Shirts
                    <div className="count p-1 w-8 h-8 text-center rounded-[40%] bg-[#7380EC]">3</div>
                  </div>
                  <div className="tiles h-10 py-1 px-2 gap-2 rounded-2xl flex bg-[#202528]">
                    Lower
                    <div className="count p-1 w-8 h-8 text-center rounded-[40%] bg-[#7380EC]">4</div>
                  </div>
                  <div className="tiles h-10 py-1 px-2 gap-2 rounded-2xl flex bg-[#202528]">
                    Bedsheets
                    <div className="count p-1 w-8 h-8 text-center rounded-[40%] bg-[#7380EC]">2</div>
                  </div>
                </div>
                <div className="status flex justify-between  mt-2 items-center">
                  <h2 className="font-bold text-md">STATUS : </h2>
                  <h2 className='text-yellow-400 font-bold text-md '>PENDING</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laundry;
