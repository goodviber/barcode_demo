import React, { useEffect, useState } from "react";
import { fetchJson, post } from "../../lib/Fetching";
import Button from "../Button";

export default function ProductBarcodeForm({ handleBarcodeSubmit }) {
  const [barcodeText, setBarcodeText] = useState("");
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  const onSubmit = e => {
    e.preventDefault();
    handleBarcodeSubmit({
      body: barcodeText
    }).then(() => {
      setBarcodeText("");
      setIsShowing(false);
    });
  };

  return (
    <div className="">
      {!isShowing && (
        <button
          data-testid="toggleButton"
          className="btn btn-default btn-xs fa fa-plus"
          onClick={toggle}
          style={{ marginBottom: "0px" }}
        >
          &nbsp;&nbsp;
          {I18n.t("add_barcode")}
        </button>
      )}
      {isShowing && (
        <form onSubmit={onSubmit}>
          <div style={{ maxWidth: 600, margin: "0 auto", marginTop: 30, marginBottom: 30 }}>
            <div className="row">
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Input barcode here..."
                  onChange={e => setBarcodeText(e.target.value)}
                  value={barcodeText}
                  style={{ width: "100%", marginBottom: "6px" }}
                />
              </div>
              <div className="col-sm-2">
                <Button
                  primary
                  title={I18n.t("add_barcode")}
                  style={{ marginLeft: "4px", marginBottom: 0 }}
                />
              </div>
              <div className="col-sm-2">
                <Button
                  title={I18n.t("cancel")}
                  onClick={toggle}
                  style={{ marginLeft: "4px", marginBottom: 0 }}
                />
              </div>
            </div>
            <p className="small">
              Adding product barcodes allows you to speed up the registration process by
              scanning your barcodes to quickly filter the product list.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
