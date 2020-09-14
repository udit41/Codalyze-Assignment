import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { pricingInfo } from "./React-products";

const EditProduct = (props) => {
  useEffect(() => {
    setObjid(props.match.params.id);
    preload(props.match.params.id);
  }, []);

  const [objid, setObjid] = useState("");

  const [values, setValues] = useState({
    name: "",
    weight: "",
    availability: "",
    pricingTier: "",
    priceRange: "",
    productUrl: "",
    isEditable: true,
    didRedirect: false,
  });

  const {
    name,
    weight,
    availability,
    priceRange,
    pricingTier,
    productUrl,
    isEditable,
    didRedirect,
  } = values;

  const preload = (id) => {
    const data = props.myProduct[id];
    setValues({
      ...values,
      name: data.name,
      weight: data.weight,
      availability: data.availability,
      pricingTier: data.pricingTier,
      priceRange: data.priceRange,
      productUrl: data.productUrl,
      isEditable: data.isEditable,
    });
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.myProduct[objid].name = name;
    props.myProduct[objid].weight = weight;
    props.myProduct[objid].availability = availability;
    props.myProduct[objid].isEditable = isEditable;
    props.myProduct[objid].priceRange = priceRange;
    props.myProduct[objid].pricingTier = pricingTier;
    props.myProduct[objid].productUrl = productUrl;
    props.UpdateData(props.myProduct);
    setValues({ ...values, didRedirect: true });
  };

  return (
    <div className="container w-50 p-5">
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            required
            onChange={handleChange("name")}
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Weight</label>
          <input
            type="text"
            className="form-control"
            placeholder="Weight"
            required
            onChange={handleChange("weight")}
            value={weight}
          />
        </div>
        <div className="form-group">
          <label>Availability</label>
          <input
            type="number"
            className="form-control"
            placeholder="Availability"
            onChange={handleChange("availability")}
            value={availability}
          />
        </div>
        <div className="form-group">
          <label>Product URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="URL"
            required
            onChange={handleChange("productUrl")}
            value={productUrl}
          />
        </div>
        <div className="form-group">
          <label>Price Tier</label>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optradio"
                required
                value="budget"
                checked={pricingTier === "budget"}
                onChange={handleChange("pricingTier")}
              />
              Budget
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="optradio"
                value="premier"
                checked={pricingTier === "premier"}
                onChange={handleChange("pricingTier")}
              />
              Premier
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Price Range</label>
          <select
            className="custom-select custom-select-sm"
            onChange={handleChange("priceRange")}
            required
            value={priceRange}
          >
            {pricingTier === "budget" &&
              pricingInfo.budget.map((range, key) => {
                return (
                  <option value={range} key={key}>
                    {range}
                  </option>
                );
              })}
            {pricingTier === "premier" &&
              pricingInfo.premier.map((range, key) => {
                return (
                  <option value={range} key={key}>
                    {range}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              value={!isEditable}
              onChange={handleChange("isEditable")}
              defaultChecked={isEditable}
            />
            isEditable
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-5"
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
      {performRedirect()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myProduct: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateData: (data) => {
      dispatch({ type: "UPDATE_DATA", payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
