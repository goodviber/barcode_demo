import React, { useEffect, useState } from "react";
import { fetchJson, post } from "../../lib/Fetching";
import ProductBarcodeForm from "./ProductBarcodeForm";
import Barcode from "react-barcode";
import Link from "../Link";

export default function ProductBarcodes({ product_id }) {
  const [barcodes, setBarcodes] = useState(false);

  const fetchBarcodes = () =>
    fetchJson("/products/products/" + product_id + "/product_barcodes").then(
      json => {
        if (json.error) alert(json.error);
        else setBarcodes(json);
      }
    );

  const handleBarcodeSubmit = barcode =>
    post("/products/products/" + product_id + "/product_barcodes", barcode)
      .then(fetchBarcodes)
      .catch(error => alert(error));

  const handleDeleteBarcode = id => {
    if (confirm(I18n.t("are_you_sure_you_want_to_delete_this_barcode"))) {
      post(
        "/products/products/" + product_id + "/product_barcodes/" + id,
        {},
        "DELETE"
      )
        .then(fetchBarcodes)
        .catch(error => alert(error));
    }
  };

  useEffect(
    () => {
      fetchBarcodes();
    },
    [product_id]
  );

  return (
    <div style={{ paddingLeft: 20, paddingTop: 10 }}>
      {barcodes &&
        barcodes.length > 0 && (
          <ul
            style={{
              listStyleType: "none",
              paddingLeft: 0,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center"
            }}
          >
            {barcodes.map(barcode => (
              <li
                key={barcode.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 20
                }}
              >
                <Link
                  data-testid="delete_button"
                  onClick={() => {
                    handleDeleteBarcode(barcode.id);
                  }}
                  style={{ color: "red" }}
                >
                  <i className="fa fa-times-circle" />
                </Link>
                <Barcode
                  value={barcode.body}
                  height={30}
                  fontSize={10}
                  width={1}
                />
              </li>
            ))}
          </ul>
        )}
      <ProductBarcodeForm handleBarcodeSubmit={handleBarcodeSubmit} />
    </div>
  );
}
