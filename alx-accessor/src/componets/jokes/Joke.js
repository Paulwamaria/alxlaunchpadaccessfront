import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { getJokes } from "../../actions/Joke";
import Slider from "./Slider"

export class Joke extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount = () => {
    this.props.getJokes();
   
  };

  render() {
    const jokes = this.props.jokes;
    return (
      <Fragment>
           <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }} />
          <Slider
            options={{
              autoPlay: 8000,
              fade:true,
              pauseAutoPlayOnHover: true,
              wrapAround: true,
              fullscreen: true,
              adaptiveHeight: true,
            }}
          >
            {jokes.map((joke, index) => (
              <div className="card text-center mt-3" key={index}>
                <p className="mt=5 text-center">{joke.setup}...</p>
                <p><span className="text-success">{joke.punchline}</span></p>
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
