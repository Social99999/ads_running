import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { addAds, getAds, updateAd, deleteAd } from '../../Components_web/Api/Webapi';

function Dashboard() {
  const [image, setImage] = useState(null);
  const [ads, setAds] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateAdData, setUpdateAdData] = useState(null);
  const [category, setCategory] = useState([]);

  const fetchAds = async () => {
    try {
      const response = await getAds();
      setAds(response.data.data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };
  useEffect(() => {
    fetchAds();
  }, [updateModal]);

  const initialValues = {
    companyName: '',
    contactNumber: '',
    image: '', // Base64 string for the image
    category: '',
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required('Company Name is required'),
    contactNumber: Yup.string().required('Contact Number is required'),
    category: Yup.string().required('Category is required'),
  });

  const handleImageChange = (e, setFieldValue) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setImage(base64Image);
        setFieldValue('image', base64Image); // Set the base64 image in Formik
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdateModalOpen = (ad) => {
    console.log('Ad to update:', ad); // Debugging to verify data
    setUpdateAdData(ad);
    setImage(ad.image); // Set the current image
    setUpdateModal(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModal(false);
    setUpdateAdData(null);
    setImage(null);
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addAds(values);
      const response = await getAds();
      setAds(response.data.data);
      resetForm();
      fetchAds()
    } catch (error) {
      console.error('Error adding ad:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (values) => {
    try {
      await updateAd(updateAdData._id, { ...values, image });
      const response = await getAds();
      setAds(response.data.data);
      handleUpdateModalClose();
    } catch (error) {
      console.error('Error updating ad:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAd(id);
      setAds(ads.filter((ad) => ad._id !== id));
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Manage Ads</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</label>
              <Field type="text" name="companyName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">Contact Number</label>
              <Field type="text" name="contactNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
              <Field type="text" name="category" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image" className="text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e, setFieldValue)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {image && <img src={image} alt="Preview" width="100" className="mt-2" />}
            </div>
            <button type="submit" disabled={isSubmitting} className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Add Ad
            </button>
          </Form>
        )}
      </Formik>

      <h2 className="text-2xl font-bold mt-6">Ads List</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Company Name</th>
              <th className="border border-gray-300 px-4 py-2">Contact Number</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id}>
                <td className="border border-gray-300 px-4 py-2">{ad.companyName}</td>
                <td className="border border-gray-300 px-4 py-2">{ad.contactNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{ad.category}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img src={ad.image} alt="Ad" className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleUpdateModalOpen(ad)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(ad._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {updateModal && updateAdData && (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Ad</h2>
            <Formik
              initialValues={{
                companyName: updateAdData.companyName || '',
                contactNumber: updateAdData.contactNumber || '',
                image: updateAdData.image || '',
                category: updateAdData.category || '',
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                handleUpdateSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <Field
                      type="text"
                      name="companyName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="contactNumber" className="text-sm font-medium text-gray-700">
                      Contact Number
                    </label>
                    <Field
                      type="text"
                      name="contactNumber"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <Field
                      type="text"
                      name="category"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="image" className="text-sm font-medium text-gray-700">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {image && <img src={image} alt="Preview" width="100" className="mt-2" />}
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={handleUpdateModalClose}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Dashboard;
