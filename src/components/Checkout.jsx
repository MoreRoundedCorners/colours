import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_CART, clear_cart } from "../redux/actions/CartAction";

import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Shipping from "./Shipping";
import {
  CardElement as StripeCardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

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

const checkoutSchema = Yup.object().shape({
  billingAddress: Yup.object().shape({
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
      otherwise: Yup.string(), // This ensures that the field is not required when isSameAddress is true.
    }),
    lastName: Yup.string().when("isSameAddress", {
      is: false,
      then: Yup.string().required("Required"),
      otherwise: Yup.string(), // This ensures that the field is not required when isSameAddress is true.
    }),
    email: Yup.string().email("Invalid email").required("Required"),
    address: Yup.string().when("isSameAddress", {
      is: false,
      then: Yup.string().required("Required"),
      otherwise: Yup.string(), // This ensures that the field is not required when isSameAddress is true.
    }),
    city: Yup.string().when("isSameAddress", {
      is: false,
      then: Yup.string().required("Required"),
      otherwise: Yup.string(), // This ensures that the field is not required when isSameAddress is true.
    }),
    state: Yup.string().when("isSameAddress", {
      is: false,
      then: Yup.string().required("Required"),
      otherwise: Yup.string(), // This ensures that the field is not required when isSameAddress is true.
    }),
    zip: Yup.string().when("isSameAddress", {
      is: false,
      then: Yup.string().required("Required"),
      otherwise: Yup.string(), // This ensures that the field is not required when isSameAddress is true.
    }),
  }),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Required"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart);
  console.log("cart from checkout", cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const dispatch = useDispatch();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    if (!stripe || !elements) {
      console.log("stripe or elements not loaded");
      return;
    }

    const cardElement = elements.getElement(StripeCardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      // Send paymentMethod.id to your server (see the fetch call below)
      console.log("[PaymentMethod]", paymentMethod);

      const response = await fetch("http://localhost:5000/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: cart.total,
          id: paymentMethod.id,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);

      // Check if the payment was successful
      if (response.ok) {
        alert("Payment was successful");
        setTimeout(() => {
          navigate("/");
          dispatch(clear_cart());
        }, 2000);
        console.log("Payment succeeded!");
      } else {
        alert("Payment failed");
        console.log("Payment failed");
      }
    }
    setActiveStep(activeStep + 1);
    setSubmitting(false);
  };

  // create a function to remove item from cart
  const handleRemove = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
    console.log("id", id);
  };

  return (
    <section className="flex flex-col h-screen">
      <div className="text-center p-4">
        <p className="text-bold text-2xl">Checkout</p>
      </div>

      <div className="flex flex-row flex-grow overflow-auto">
        <div className="w-1/2 borde rounded-2xl overflow-auto m-10">
          {cart.cart.map((cloth) => (
            <div
              key={cloth.id}
              className="flex justify-between items-center m-6 border-2  rounded-md p-2"
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
                <img src="../images/trash.png" className="h-6 object-contain" />
              </button>
            </div>
          ))}
        </div>

        <div className="w-1/3 pl-10  p-14  fle">
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
              <Form>
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
                <div className="p-4 my-4 border">
                  <StripeCardElement />{" "}
                </div>
                <button
                  type="submit"
                  className="p-2 border bg-black text-white"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
