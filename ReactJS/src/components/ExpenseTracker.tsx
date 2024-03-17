import { ChangeEvent, Component, FormEvent } from "react";
import { pushDataToServer } from "../services/menu";

// Define the types for the props and state
type Props = {
  onTrue: any;
  onClose: any;
};

type State = {
  payeeName: string;
  product: string;
  price: number;
  setDate: string;
};

// Define the ExpenseTracker component
class ExpenseTracker extends Component<Props, State> {
  // Constructor to initialize state and bind methods
  constructor(props: Props) {
    super(props);
    this.state = {
      payeeName: "",
      product: "",
      price: 0,
      setDate: this.setDefaultDate(),
    };

    // Binding methods to the instance
    this.setPayee = this.setPayee.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setPrice = this.setPrice.bind(this);
  }

  // Method to set the default date
  setDefaultDate = () => {
    const today = new Date();
    return (
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2)
    );
  };

  // Event handler for selecting payee
  setPayee = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      payeeName: event.target.value,
    });
  };

  // Event handler for entering product
  setProduct = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      product: event.target.value,
    });
  };

  // Event handler for entering price
  setPrice = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      price: parseInt(event.target.value),
    });
  };

  // Event handler for selecting date
  loggedDate = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      setDate: event.target.value,
    });
  };

  // Event handler for form submission
  submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    // Create a final data object with the current state and a unique ID
    const finalData = {
      ...this.state,
      id: parseInt(Math.random() * 1000 + ""),
    };

    // Send the data to the server and log the result
    const data = await pushDataToServer(finalData);
    console.log(data);

    // Trigger the onTrue prop (assuming it's a callback for successful submission)
    this.props.onTrue();
  };

  // Create a div element
  el = document.createElement("div");

  // Render method to display the component
  render() {
    const element = (
      <>
        <section>
          <header>
            <h1>Add New Item</h1>
            <p>
              Read the below instructions before proceeding:
              <br />
              Make sure you fill all the fields where * is provided
            </p>
          </header>

          {/* Form for adding a new expense item */}
          <form onSubmit={this.submitHandler}>
            <article>
              <p>Name</p>
              {/* Dropdown for selecting payee */}
              <select
                name="Name"
                id="district"
                required
                value={this.state.payeeName}
                onChange={this.setPayee}
              >
                <option value="" defaultChecked>
                  Choose
                </option>
                <option value="Rahul">Rahul</option>
                <option value="Ramesh">Ramesh</option>
              </select>
            </article>

            <article>
              <p>Product Purchased</p>
              {/* Input field for entering the purchased product */}
              <input
                type="text"
                required
                value={this.state.product}
                onChange={this.setProduct}
              />
            </article>

            <article>
              <p>Price</p>
              {/* Input field for entering the price */}
              <input
                type="number"
                required
                value={this.state.price}
                onChange={this.setPrice}
              />
            </article>

            <article>
              <p>Date</p>
              {/* Input field for selecting the date */}
              <input
                type="date"
                required
                value={this.state.setDate}
                onChange={this.loggedDate}
              />
            </article>

            {/* Button to close the form */}
            <button
              type="button"
              className="form-button"
              onClick={this.props.onClose}
            >
              Close
            </button>

            {/* Button to submit the form */}
            <button className="form-button">Submit</button>
          </form>
        </section>
      </>
    );
    return element;
  }
}

// Export the ExpenseTracker component
export default ExpenseTracker;
