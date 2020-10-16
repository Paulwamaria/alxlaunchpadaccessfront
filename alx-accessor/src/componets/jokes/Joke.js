import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { getJokes } from "../../actions/Joke";

export class Joke extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount = () => {
    this.props.getJokes();
  };

  render() {
    return (
      <Fragment>
        {this.props.dataLoaded ? (
          this.props.jokes.map((joke) => (
            <div id={joke.id}>
              {joke.id}
              <hr />
              {joke.setup},{joke.punchline}
            </div>
          ))
        ) : (
          <div>
            <h1>Jokes Not Loaded Yet</h1>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLoaded: state.jokeReducer.dataLoaded,
    jokes: state.jokeReducer.jokes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJokes: () => dispatch(getJokes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Joke);
