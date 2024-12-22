import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { addAds } from '../../Components_admin/Api/Admin';

function Dashboard() {
  const [image, setImage] = useState(null);

  const initialValues = {
    companyName: '',
    contactNumber: '',
    image: '', // Store base64 string for image
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required('Company Name is required'),
    contactNumber: Yup.string().required('Contact Number is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    // `values.image` will contain the base64 string
    const response = await addAds(values);
    console.log(response);

    setSubmitting(false);
  };

  const handleImageChange = (e, setFieldValue) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;
        setImage(base64Image); // Store the base64 image string in state

        // Also update Formik's internal state for the "image" field
        setFieldValue('image', base64Image); // Set the base64 string in Formik's field
      };

      // Convert the image file to Base64
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div>
              <label htmlFor="companyName">Company Name</label>
              <Field type="text" name="companyName" />
            </div>
            <div>
              <label htmlFor="contactNumber">Contact Number</label>
              <Field type="text" name="contactNumber" />
            </div>
            <div>
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />
              {image && <img src={image} alt="Preview" width="100" />}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Dashboard;
