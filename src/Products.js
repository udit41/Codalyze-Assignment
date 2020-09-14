import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Products = (props) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Weight</th>
            <th scope="col">Availabilty</th>
            <th scope="col">isEditable</th>
          </tr>
        </thead>
        <tbody>
          {props.myProduct.map((prod, key) => {
            return (
              <tr key={key}>
                <th scope="row">{key}</th>
                <td>{prod.name}</td>
                <td>{prod.weight}</td>
                <td>{prod.availability}</td>
                <td hidden={!prod.isEditable}>
                  {prod.isEditable && (
                    <div>
                      <Link
                        to={`/edit-product/${key}`}
                        className="btn btn-sm btn-danger"
                      >
                        Edit
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myProduct: state.map((prod, key) => {
      return prod;
    }),
  };
};

export default connect(mapStateToProps)(Products);
