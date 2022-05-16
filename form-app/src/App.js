import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [userInfo, setUserInfo] = useState({
    description: "",
    confirmation: "",
    tax: 0,
    beforeTaxValue: "",
    afterTaxValue: 0,
  });
  const [textArea, setTextArea] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const floatRegex = /^[+-]?([0-9]*[.|,])?[0-9]+$/;
  const signsToTypy = 255 - userInfo.description.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };
    fetch("https://reqres.in/api/posts", requestOptions)
      .then((data) => {
        if (data.ok) {
          setSuccessMessage(data);
        } else {
          console.log("There was an error!");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const setDescription = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };
  const setSelectedOption = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        tax: e.target.value,
      };
    });
  };
  const setBeforeTaxValue = (e) => {
    const parsedValue = parseFloat(e.target.value.replace(/,/, "."), 10) || 0;
    const vat = userInfo.tax.slice(0, -1) / 100;
    setUserInfo((prev) => {
      return {
        ...prev,
        beforeTaxValue: e.target.value,
        afterTaxValue: (parsedValue * vat + parsedValue).toFixed(2),
      };
    });
  };

  const setConfirmation = (e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        confirmation: e.target.value,
      };
    });
  };

  return successMessage ? (
    <div className="box">Success</div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {textArea && (
          <span
            style={{
              color: `${userInfo.description.length >= 255 ? "red" : "black"}`,
            }}
          >
            Text is required. You can’t enter more than{" "}
            {signsToTypy <= 0 ? 255 : signsToTypy} characters.
          </span>
        )}
        <textarea
          required
          id="description"
          name="description"
          maxLength={255}
          onFocus={(e) => setTextArea(!textArea)}
          onBlur={(e) => setTextArea(!textArea)}
          value={userInfo.description}
          onInput={(e) => setDescription(e)}
        ></textarea>
        <label htmlFor="description">Description</label>
      </div>

      <div className="flex" onChange={(e) => setConfirmation(e)}>
        Send confirmation.
        <input
          required
          type="radio"
          name="fancy-radio"
          id="fancy-radio-1"
          onInvalid={(e) => e.target.setCustomValidity("Text is required")}
          onInput={(e) => e.target.setCustomValidity("")}
        />
        <label htmlFor="fancy-radio-1">Radio</label>
        <label htmlFor="fancy-radio-1">Yes</label>
        <input required type="radio" name="fancy-radio" id="fancy-radio-2" />
        <label htmlFor="fancy-radio-2">Radio</label>
        <label htmlFor="fancy-radio-1">No</label>
      </div>
      <div className="row">
        <label htmlFor="vat-select">Choose VAT</label>
        <select
          className="minimal"
          onChange={(e) => setSelectedOption(e)}
          onInvalid={(e) => e.target.setCustomValidity("Text is required")}
          onInput={(e) => e.target.setCustomValidity("")}
          value={userInfo.tax}
          required
          name="vat"
          id="vat-select"
        >
          <option></option>
          <option>19%</option>
          <option>21%</option>
          <option>23%</option>
          <option>25%</option>
        </select>
      </div>

      <div className="row">
        <input
          required
          onInvalid={(e) => e.target.setCustomValidity("Please, input number")}
          onInput={(e) => e.target.setCustomValidity("")}
          type="text"
          name="fancy-text"
          id="fancy-text"
          disabled={!userInfo.tax}
          onChange={(e) => setBeforeTaxValue(e)}
          value={userInfo.beforeTaxValue}
        />
        <label htmlFor="fancy-text">Price netto EUR</label>
        <span
          style={{
            display: `${
              userInfo.beforeTaxValue.toString().match(floatRegex)
                ? "none"
                : "block"
            }`,
          }}
        >
          Please, input number
        </span>
      </div>

      <div className="row">
        <input
          type="text"
          disabled
          value={userInfo.afterTaxValue}
          className="vat-input"
        />
        <label htmlFor="fancy-text">Price brutto EUR</label>
      </div>
      <button type="submit" tabIndex="0">
        Submit
      </button>
    </form>
  );
};

export default App;
