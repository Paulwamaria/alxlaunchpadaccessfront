import React, { Fragment, Component } from "react";
import Joke from "../jokes/Joke";
import Kitsu from "../kitsu/Kitsu";
import { connect } from "react-redux";
import { getAnime } from "../../actions/anim";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "action",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.getAnime(this.state.value);
  };

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-8">
            {/* display joke */}
            <Joke />
          </div>
          <div className="col-md-4">
            {/* select category form */}
            <form
              onSubmit={this.handleSubmit}
              className="mt-5 mb-5 #1c2a48 mdb-color darken-3 text-white rounded"
            >
              <div>
                <label htmlFor="category" className="mt-2">
                  {" "}
                  Filter Anime By Category
                </label>
              </div>
              <select
                value={this.state.value}
                onChange={this.handleChange}
                id="category"
                className="mb-3"
              >
                <option name="romance" value="romance">
                  Romance
                </option>
                <option name="horror" value="horror">
                  Horror
                </option>
                <option name="adventure" value="adventure">
                  Adventure
                </option>
                <option name="thriller" value="thriller">
                  Thriller
                </option>
                <option name="sports" value="sports">
                  Sports
                </option>
                <option name="mystery" value="mystery">
                  Mystery
                </option>
                <option name="historical" value="historical">
                  Historical
                </option>
                <option name="fantasy" value="fantasy">
                  Fantasy
                </option>
                <option name="drama" value="drama">
                  Drama
                </option>
              </select>

              <button
                className="mt-3 ml-3 mb-3 rounded bg-success "
                type="submit"
              >
                Click to Filter
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          {/* display anime */}
          <Kitsu category={this.state.value} />
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAnime: (category) => dispatch(getAnime(category)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
