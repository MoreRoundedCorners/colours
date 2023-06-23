import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_CART } from "../redux/actions/CartAction";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Shipping from "./Shipping";

const ititialValues = {
  billingAdress: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  Yup.object().shape({
    billingAdress: Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zip: Yup.string().required("Required"),
    }),
    shippingAddress: Yup.object().shape({
      isSameAddress: Yup.boolean(),
      firstName: Yup.string().when("isSameAddress", {
        is: false,
        then: Yup.string().required("Required"),
      }),
      lastName: Yup.string().when("isSameAddress", {
        is: false,
        then: Yup.string().required("Required"),
      }),
      email: Yup.string().email("Invalid email").required("Required"),
      address: Yup.string().when("isSameAddress", {
        is: false,
        then: Yup.string().required("Required"),
      }),
      city: Yup.string().when("isSameAddress", {
        is: false,
        then: Yup.string().required("Required"),
      }),
      state: Yup.string().when("isSameAddress", {
        is: false,
        then: Yup.string().required("Required"),
      }),
      zip: Yup.string().when("isSameAddress", {
        is: false,
        then: Yup.string().required("Required"),
      }),
    }),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart);
  console.log("cart from checkout", cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const dispatch = useDispatch();

  const handleFormSubmit = (value, actions) => {
    setActiveStep(activeStep + 1);
    // actions.setSubmitting(false);
  };

  // create a function to remove item from cart
  const handleRemove = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
    console.log("id", id);
  };

  async function makePayment() {
    const body = {
      amount: 5000,
      email: "",
      phone: "08012345678",
      fullname: "Oluwatobi Shokunbi",
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch("http://localhost:5000/api/charge", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const res = await response.json();
    console.log(res);
    window.location.href = res.data.authorization_url;
  }

  return (
    <section className="">
      <div>
        <p className="text-center">checkout</p>
      </div>
      <div className="w-1/2 border rounded-2xl">
        {cart.cart.map((cloth) => (
          <div
            key={cloth.id}
            className="flex justify-between items-center m-6 border p-2"
          >
            <div className="flex p-2">
              <img
                src={cloth.path}
                alt="clothing item"
                className="h-40 w-40 object-cover"
              />
              <div className="flex flex-col mx-auto justify-center">
                <p>{cloth.name}</p>
                <p>{cloth.price}</p>
                <p>{cloth.size}</p>
              </div>
            </div>
            <button className="p-2" onClick={() => handleRemove(cloth.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      {/* section for stripe info */}
      <div>
        <Formik
          initialValues={ititialValues}
          validationSchema={checkoutSchema[activeStep]}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form className="w-1/2 mx-auto" onSubmit={handleFormSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                ></Shipping>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Checkout;
