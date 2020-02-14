import React from "react";
import {
  act,
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "@testing-library/react";
import ProductBarcodes from "../../app/javascript/components/registration/ProductBarcodes.js";
import ProductBarcodeForm from "../../app/javascript/components/registration/ProductBarcodeForm";
import Barcode from "react-barcode";

//mock Fetching.js
jest.mock("../../app/javascript/lib/Fetching.js", () => {
  return {
    fetchJson: () => {
      return new Promise(function(resolve, reject) {
        const barcodes = [
          {
            id: 1,
            body: "hello"
          },
          {
            id: 2,
            body: "hello again"
          }
        ];
        resolve(barcodes);
      });
    },
    fetchHtml: null,
    post: () => {
      return new Promise(function(resolve, reject) {
        const response = {
          success: "ok",
          result: {
            id: 3,
            product_id: 1,
            body: "hello there again",
            created_at: "2019-10-17T08:53:49.506+01:00",
            updated_at: "2019-10-17T08:53:49.506+01:00"
          }
        };
        resolve(response);
      });
    },
    normalPost: null
  };
});

//csrfToken
const csrfToken = "gjdfhgjdfgjhdfjhghdfjhgdj";
document.head.innerHTML = `<meta name="csrf-token" content="${csrfToken}">`;
//translations
window.I18n = require("../../public/javascripts/i18n.js");
require("../../public/javascripts/translations.js");
window.I18n.locale = "en";
//canvas for Barcode
HTMLCanvasElement.prototype.getContext = jest.fn(() => {
  return {
    fillRect: function() {},
    clearRect: function() {},
    getImageData: function(x, y, w, h) {
      return {
        data: new Array(w * h * 4)
      };
    },
    putImageData: function() {},
    createImageData: function() {
      return [];
    },
    setTransform: function() {},
    drawImage: function() {},
    save: function() {},
    fillText: function() {},
    restore: function() {},
    beginPath: function() {},
    moveTo: function() {},
    lineTo: function() {},
    closePath: function() {},
    stroke: function() {},
    translate: function() {},
    scale: function() {},
    rotate: function() {},
    arc: function() {},
    fill: function() {},
    measureText: function() {
      return { width: 0 };
    },
    transform: function() {},
    rect: function() {},
    clip: function() {}
  };
});

afterEach(cleanup);

it("allows user to open BarcodeForm", async () => {
  const { getByText, getByPlaceholderText } = render(
    <ProductBarcodes product_id={1} />
  );
  fireEvent.click(getByText("Add Barcode"));
  const input = await waitForElement(() =>
    getByPlaceholderText("Input barcode here...")
  );
  expect(input.value).toBe("");
});

it("allows user to cancel BarcodeForm", async () => {
  const spy = jest.fn(() => Promise.resolve());
  const { getByText, getByPlaceholderText, getByTestId } = render(
    <ProductBarcodeForm handleBarcodeSubmit={spy} />
  );
  fireEvent.click(getByText("Add Barcode"));
  fireEvent.click(getByText("Cancel"));
  const toggleButton = await waitForElement(() => getByTestId("toggleButton"));
  expect(toggleButton.textContent).toMatch("Add Barcode");
});

it("handleBarcodeSubmit function called in BarcodeForm", () => {
  const spy = jest.fn(() => Promise.resolve());
  const { getByText, getByPlaceholderText } = render(
    <ProductBarcodeForm handleBarcodeSubmit={spy} />
  );
  //click Add to open form input
  fireEvent.click(getByText("Add Barcode"));
  const input = getByPlaceholderText("Input barcode here...");
  fireEvent.change(input, { target: { value: "hello" } });
  //click Add to submit
  fireEvent.click(getByText("Add Barcode"));
  const resolved = waitForElement(() => getByText("Add Barcode"));
  expect(spy).toHaveBeenCalledTimes(1);
});
