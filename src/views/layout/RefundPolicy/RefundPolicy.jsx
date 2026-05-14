import React from "react";
import style from "./RefundPolicy.module.scss";

export default function RefundPolicy() {
  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.secondNav}>
          <div className={style.inner}>
            <div className={style.title}>Refund Policy</div>
          </div>
        </div>
        <div className={style.content}>
          <h3>One-time Payment</h3>
          <h5>Fulfillment</h5>
          <p>
            As soon as the customer purchases the plan, fulfillment happens
            online and #classes/credits are allotted immediately.
          </p>
          <h3>Refund Policy</h3>
          <p>
            The amount of refund payable shall only be limited to the amount
            paid by the customer for services which were not rendered to the
            customer by CCC Digital India Private Limited . In case of refund of
            EMI transactions, customers will be charged interest & foreclosure
            charges as per bank or lending partners’ terms and conditions which
            the customer may have agreed to. Further the deduction shall be made
            towards the value of any cashback, discounts or rewards, including
            vouchers (if applicable).
          </p>
          <p>
            A refund request will be deemed valid only if it is made through an
            email to namaste@jayaho.io, for registering the refund request,
            within 45 (forty Five) calendar days from the payment date (“Payment
            Date”). It is clarified that no refunds shall be processed for the
            refund request made after 45 (forty five) days from the Payment
            Date* of the course fee.
          </p>
          <p>
            *The course shall be deemed to commence from the Payment Date i.e.
            the date on which the first payment is made by you towards the
            course fee.Also refund shall be calculated on valid credit remaining
            in your account as of the date the refund is requested.
          </p>
          <h3>Refund Process</h3>
          <p>
            We aim to process and refund requests within 7-10 business days of
            receiving the request.If request is made as per our refund policy
            However, if there is a delay, please notify us at namaste@jayaho.io
            . During the refund process, we may request that you validate key
            information required to process your refund.
          </p>
        </div>
      </div>
    </div>
  );
}
