import { useEffect, useState } from "react";
import IDataList from "../model/IDataList";
import { getDataFromServer } from "../services/menu";
import ExpenseTracker from "./ExpenseTracker";

// Function component for displaying the expense list
function ShowList() {
  // State variables for managing data and UI state
  const [sum, setSum] = useState<number | null>();
  const [error, setError] = useState<Error | null>(null);
  const [items, setItems] = useState<IDataList[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [rahulExpenditure, setRahulExpenditure] = useState<number>(0);
  const [rameshExpenditure, setRameshExpenditure] = useState<number>(0);

  // Variables to track individual amounts spent by Rahul and Ramesh
  var amountSpentByRahul: number = 0;
  var amountSpentByRamesh: number = 0;

  // useEffect to fetch data from the server and update state
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getDataFromServer();
        setItems(data);
        // Calculate the total sum of prices
        setSum(
          data.reduce((result, value) => (result = result + value.price), 0)
        );
        // Calculate individual expenditures for Rahul and Ramesh
        Shares(data);
      } catch (error: any) {
        setError(error);
      }
    };

    // Fetch data when the showForm state changes
    fetchMenu();
  }, [showForm]);

  // Function to calculate individual expenditures for Rahul and Ramesh
  const Shares = (data: IDataList[]) => {
    data.map((share) =>
      share.payeeName === "Rahul"
        ? (amountSpentByRahul = amountSpentByRahul + share.price)
        : (amountSpentByRamesh = amountSpentByRamesh + share.price)
    );
    setRahulExpenditure(amountSpentByRahul);
    setRameshExpenditure(amountSpentByRamesh);
  };

  // Callback function for successful form submission
  const success = () => {
    setShowForm(false);
  };

  // Callback function for closing the form
  const cancel = () => {
    setShowForm(false);
  };

  // JSX for rendering the component
  return (
    <>
      {/* Header for the expense tracker */}
      <header id="page-Header">Expense Tracker</header>
      {/* Button to trigger the form display */}
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {/* Display the form when showForm state is true */}
      {showForm && (
        <div className="form">
          <ExpenseTracker onTrue={success} onClose={cancel}></ExpenseTracker>
        </div>
      )}
      {/* Headers for the expense list table */}
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>
          Payee
        </div>
      </>
      {/* Map through items and display expense details */}
      {items &&
        items.map((user, ind) => (
          <div key={ind}>
            <div className="use-inline date">{user.setDate}</div>
            <div className="use-inline">{user.product}</div>
            <div className="use-inline price">{user.price}</div>
            <div className="use-inline" style={{ width: 112 }}>
              {user.payeeName}
            </div>
          </div>
        ))}
      <hr />
      {/* Total sum of prices */}
      <div className="use-inline ">Total: </div>
      <span className="use-inline total">{sum}</span> <br />
      {/* Individual expenditures for Rahul and Ramesh */}
      <div className="use-inline ">Rahul paid: </div>
      <span className="use-inline total Rahul">{rahulExpenditure}</span> <br />
      <div className="use-inline ">Ramesh paid: </div>
      <span className="use-inline total Ramesh">{rameshExpenditure}</span>{" "}
      <br />
      {/* Display who to pay and the amount */}
      <span className="use-inline payable">
        {rahulExpenditure > rameshExpenditure ? "Pay Rahul " : "Pay Ramesh"}
      </span>
      <span className="use-inline payable price">
        {" "}
        {Math.abs((rahulExpenditure - rameshExpenditure) / 2)}
      </span>
      {/* Display error message if there's an error */}
      {error && <> {error?.message} </>}
    </>
  );
}

// Export the ShowList component
export default ShowList;
