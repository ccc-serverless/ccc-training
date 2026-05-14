import React from "react";
import styles from "./CartContainer.module.scss";

import { ClickAwayListener } from "@material-ui/core";
import { ShoppingCart } from "react-feather";
import clsx from "clsx";

import { useCart } from "contexts/AllContexts";

const styleIcon = {
  width: "25px",
  height: "25px",
};

export default function CartContainer(props) {
  const Cart = useCart();

  function handleClickAwayCart(e) {
    if (e.type === "touchend") return;
    if (!e.target.className) {
      Cart.dispatch({ type: "HIDE_CART" });
      return;
    }

    if (Array.isArray(e.target.className)) {
      let classes = e.target.className.split(" ");
      let isPresent = classes.indexOf("openCart");
      if (isPresent === -1) Cart.dispatch({ type: "HIDE_CART" });
    } else {
      if (e.target.className !== "openCart") {
        Cart.dispatch({ type: "HIDE_CART" });
      }
    }
  }

  return (
    <div className={clsx(styles.wrapper, styles[props.color])}>
      {Cart.state.items.length ? (
        <span className={styles.count}>{Cart.state.items.length}</span>
      ) : null}
      <span
        onClick={() => Cart.dispatch({ type: "TOGGLE_CART" })}
        className={styles.iconWrapper}
      >
        <ShoppingCart styles={styleIcon} /> Cart
      </span>

      {Cart.state.isDisplayActive && (
        <ClickAwayListener onClickAway={handleClickAwayCart}>
          <div className={clsx(styles.cartWrapper, "openCart")}>
            {Cart.state.items.length
              ? Cart.state.items.map((item, index) => (
                  <div key={index} className={clsx(styles.item, "openCart")}>
                    <div className={clsx(styles.details, "openCart")}>
                      <p className="openCart">
                        {index + 1}. {item.name}
                      </p>
                      <p className="openCart">$ {item.price}</p>
                    </div>
                    <div
                      onClick={() =>
                        Cart.dispatch({
                          type: "REMOVE_ITEM",
                          payload: { _id: item._id },
                        })
                      }
                      className={clsx(styles.remove, "openCart")}
                    >
                      -
                    </div>
                  </div>
                ))
              : null}
            {Cart.state.items.length ? (
              <div className={clsx(styles.controller, "openCart")}>
                <p className="openCart">Total $ {Cart.state.totalValue}</p>
                <button className="openCart" onClick={props.handlePayment}>
                  Register Now
                </button>
              </div>
            ) : (
              <p className={clsx(styles.noItemText, "openCart")}>
                No items added to cart yet
              </p>
            )}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
