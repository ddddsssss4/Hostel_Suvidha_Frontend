import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
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
    <div className="text-white py-6 ">
      <div className="relative mt-8 rounded-md">
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
                        className="mt-1 bg-black block w-[40%]  rounded-sm p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-white placeholder-gray-400"
                        placeholder="AMAN KUMAR"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white">COMPLAINT ID</label>
                      <Field
                        name="complaintId"
                        type="text"
                        className="mt-1 block w-[40%] border-none rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-white bg-black p-2 placeholder-gray-400"
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
                        className="mt-1 block w-[30%] border-none rounded-sm p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black text-white placeholder-gray-400"
                        placeholder="306 A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white w-[20px]">HOSTEL</label>
                      <Field
                        name="hostel"
                        type="text"
                        className="mt-1 block w-[20%] border-none rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  text-white placeholder-gray-400 bg-black p-2"
                        placeholder="OBH"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white">DESCRIPTION OF THE COMPLIANT</label>
                    <Field
                      name="description"
                      as="textarea"
                      className="mt-1 block w-[60%] border-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white bg-black p-2 placeholder-gray-400 h-24"
                      placeholder="Description up to 20 to 30 words..."
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="block text-sm font-medium text-white">ADD IMAGE</label>
                    <div className="ml-4 w-64 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                      <input
                        name="image"
                        type="file"
                        className="px-2"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                        }}
                      />
                      <span className="text-gray-500 px-2">IMAGE</span>
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
