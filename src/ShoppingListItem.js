import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Grid from "@material-ui/core/Grid";

export default class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);

    //QUIZ: passing data from parent to child challenge
    this.props = props;
  }

  removeItem = () => {
    //use the passed in props from the parent which is the index of the list item
    //and the method to call in parent removeItem

    //QUIZ: passing data from parent to child challenge
    this.props.removeItem(this.props.index);
  };

  completeItem = () => {
    //use the passed in props from the parent which is the index of the list item
    //and the method to call in parent completeItemInList

    //QUIZ: passing data from parent to child challenge
    this.props.completeItem(this.props.index);
  };

  render() {
    return (
      //QUIZ: global/external css challenge
      <li
        className="ShoppingListItem"
        //QUIZ: styling based on state of component
        style={
          this.props.data.complete ? { backgroundColor: "lightgreen" } : {}
        }
      >
        <Grid container>
          <Grid item xs>
            {/* //QUIZ: changing UI components based on state */}
            {this.props.data.complete ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon onClick={this.completeItem} />
            )}
          </Grid>
          <Grid item xs>
            {this.props.data.qty} - {this.props.data.name}
          </Grid>
          <Grid item xs>
            {/* //QUIZ: passing data from parent to child challenge */}
            <HighlightOffIcon onClick={this.removeItem} />
          </Grid>
        </Grid>
      </li>
    );
  }
}
