import React from "react";
import "./App.css";
import ShoppingListItem from "./ShoppingListItem";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

//QUIZ: convert from stateless function to stateful component challenge
export default class App extends React.Component {
  constructor(props) {
    super(props);

    //define variables to track in our state
    this.state = {
      //initial list has milk,bread,eggs
      shoppingList: [
        {
          name: "Milk",
          qty: 1,
          complete: false,
        },
        {
          name: "Bread",
          qty: 1,
          complete: false,
        },
        {
          name: "Eggs",
          qty: 1,
          complete: false,
        },
      ],
      buttonVisible: false,
      fruitList: [
        "Bananas",
        "Pears",
        "Cherries",
        "Apples",
        "Peaches",
        "Watermelon",
      ],
    };
  }

  //QUIZ: app lifecycle challenge
  componentDidMount() {
    //initiate a single fire timer to show the button 3 seconds after app start
    //but only after the app starts displaying
    window.setTimeout(this.showButton, 3000);
  }

  //QUIZ: code re-use challenge
  //QUIZ: state special handling challenge
  addToList(item) {
    //to insert we need to clone our state array first (cause it's read only) and then add a new one
    //but do it to the previous state so they are all chained together eventually when the async
    //unravels and are all called
    this.setState((prevState) => ({
      shoppingList: [...prevState.shoppingList, item],
    }));
  }

  //QUIZ: passing data between parent/child challenge
  removeFromList = (index) => {
    //called by child ShoppingListItem to remove itself from array
    const newList = [...this.state.shoppingList];
    newList.splice(index, 1);

    //cause render to fire
    this.setState({
      shoppingList: newList,
    });
  };

  completeItemInList = (index) => {
    //called by child ShoppingListItem to complete item in list
    //clone the state list, and then mark complete at the passed in index
    let newList = [...this.state.shoppingList];
    newList[index].complete = true;

    //cause render to fire
    this.setState({
      shoppingList: newList,
    });
  };

  //QUIZ: interact with user challenge
  onClearShoppingList = () => {
    //confirm first
    if (window.confirm("Are you sure you want to clear the list?")) {
      this.setState({ shoppingList: [] });
    }
  };

  //QUIZ: random data challenge
  generateRandomItem = () => {
    //generate a random quantity and randoml select a fruit to add
    const min = 1;
    const max = 6;
    const randQty = parseInt(min + Math.random() * (max - min));
    const randFruitIndex = parseInt(
      Math.random() * this.state.fruitList.length
    );

    //add to shopping list
    this.addToList({
      name: this.state.fruitList[randFruitIndex],
      qty: randQty,
      complete: false,
    });
  };

  //QUIZ: Dynamic UI based on state challenge
  showButton = () => {
    this.setState({
      buttonVisible: true,
    });
  };

  render() {
    return (
      <div className="App">
        <h3>My Shopping List</h3>
        <ul
          //QUIZ: inline css challenge
          style={{
            border: "1px solid black",
            padding: 10,
            listStyleType: "none",
          }}
        >
          {this.state.shoppingList &&
            this.state.shoppingList.map((item, index) => (
              //QUIZ: code re-use with custom components challenge
              <ShoppingListItem
                key={index}
                index={index}
                data={item}
                removeItem={this.removeFromList}
                completeItem={this.completeItemInList}
              />
            ))}
        </ul>
        <div>
          {this.state.buttonVisible ? (
            <div>
              <Fab
                color="primary"
                aria-label="add"
                onClick={this.generateRandomItem}
                style={{ marginRight: 10 }}
              >
                <AddIcon />
              </Fab>

              <Fab
                color="secondary"
                aria-label="clear"
                onClick={this.onClearShoppingList}
              >
                <DeleteIcon />
              </Fab>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
