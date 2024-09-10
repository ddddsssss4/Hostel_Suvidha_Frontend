import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
import inp from '../assets/input.png';  
import axios from 'axios';
const FormValue1 = ({ backgroundImage }) => {
  const { type } = useParams();
  const handleSubmit = async(values , {setSubmitting}) => {
    console.log('Form data', values);
    try{
      const response = axios.post(`/api/complaints/${type}`)
      console.log()
    }catch(error){
      console.log(error)
    }finally{
      setSubmitting(false)
    }
  };

  return (
    <div className="text-white rounded-3xl py-6 w-[65vw]">
      <div className="relative mt-2 overflow-hidden rounded-3xl">
        <img src={backgroundImage} className="w-full h-full object-cover rounded-md" alt="Background" />
        
        <div className="absolute inset-0 p-6">
          <div className="p-6 rounded-md space-y-6">
            <h2 className="font-extrabold text-2xl">FILL YOUR DETAILS</h2>
            <Formik
              initialValues={{
                name: '',
                roomNumber: '',
                hostel: '',
                description: '',
                image: null,
                complaintId: ''
              }}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white">NAME</label>
                      <Field
                        name="name"
                        type="text"
                        className="mt-1 bg-[#171A1C] block w-[40%]  rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-white placeholder-gray-400"
                        placeholder="AMAN KUMAR"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white">COMPLAINT ID</label>
                      <Field
                        name="complaintId"
                        type="text"
                        className="mt-1 block w-[40%] border-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-white bg-[#171A1C] p-2 placeholder-gray-400"
                        placeholder="12473"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white">ROOM NUMBER</label>
                      <Field
                        name="roomNumber"
                        type="text"
                        className="mt-1 block w-[30%] border-none rounded-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-[#171A1C] text-white placeholder-gray-400"
                        placeholder="306 A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white w-[20px]">HOSTEL</label>
                      <Field
                        name="hostel"
                        type="text"
                        className="mt-1 block w-[20%] border-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-white placeholder-gray-400 bg-[#171A1C] p-2"
                        placeholder="OBH"
                      />
                    </div>
                  </div>
                  <h2 className="block text-sm font-medium text-white">DESCRIPTION OF THE COMPLIANT</h2>
                  <div className="mb-4 w-[70%] h-52 flex bg-[#171A1C] rounded-md shadow-sm">
                    <div className="w-full rounded-md">
                      <Field
                        name="description"
                        as="textarea"
                        className="block w-full resize-none rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-[#171A1C] p-4 placeholder-gray-500 h-full max-h-full"
                        placeholder="Description up to 20 to 30 words..."
                      />
                    </div>

                    <div className="mr-4 mt-2 flex flex-col items-center">
                      <label className="block text-sm font-medium text-white mb-1">
                        ADD IMAGE
                      </label>
                      <div className="w-32 h-36 relative bg-[#38393A] rounded-md flex cursor-pointer">
                      <label className=" absolute block left-11 mt-1 text-sm font-medium text-white mb-1">
                      IMAGE
                      </label>
                        <img className='absolute top-9 left-7' src={inp} alt="image" />
                          <input
                            name="image"
                            type="file"
                            className="opacity-0 w-32 h-36 absolute top-0 left-0"
                            onChange={(event) => {
                              setFieldValue("image", event.currentTarget.files[0]);
                            }}
                          />
                      </div>
                    </div>
                  </div>



                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormValue1;
