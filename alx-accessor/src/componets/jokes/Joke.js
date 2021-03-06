import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { getJokes } from "../../actions/Joke";
import Slider from "./Slider";

export class Joke extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount = () => {};

  render() {
    const jokes = this.props.jokes;
    return (
      <Fragment>
        <div>
          <h5 className="mt-3">Joke Of The Day...</h5>
          <Slider
            options={{
              autoPlay: 8000,
              fade: true,
              pauseAutoPlayOnHover: true,
              wrapAround: true,
              fullscreen: true,
              adaptiveHeight: true,
            }}
          >
            {jokes.map((joke, index) => (
              <div className="card card-joke text-center mt-2" key={index}>
                <p className="mt-5 text-center">{joke.setup}...</p>
                <p className="mb-5">
                  <span className="text-success">{joke.punchline}</span>
                </p>
              </div>
            ))}
          </Slider>
        </div>
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
