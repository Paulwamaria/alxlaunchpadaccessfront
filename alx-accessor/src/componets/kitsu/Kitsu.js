import React, { Component } from "react";
import { connect } from "react-redux";
import { getAnime } from "../../actions/anim";
import Truncate from "react-truncate";

export class Kitsu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount = () => {};

  render() {
    return (
      <div className="container-fluid">
        <h5 className="mt-5">
          Current Anime Category:
          <span className="text-success pl-3">{this.props.category}</span>
        </h5>
        <hr />
        <div className="row">
          {this.props.animLoaded ? (
            this.props.anime.map((anim) => (
              <div key={anim.id} className="col-md-3">
                <div className="card card-anime mt-2">
                  <div className="card-header">
                    {anim.attributes.canonicalTitle}
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <div>
                          {" "}
                          <img
                            src={anim.attributes.posterImage.tiny}
                            alt="posterImage"
                            className="img-responsive"
                          />
                        </div>
                        <div>
                          <h5>Synopsis</h5>
                          <Truncate
                            className="smText"
                            lines={3}
                            ellipsis={<span>...</span>}
                          >
                            {anim.attributes.synopsis ||
                              "No synopsis available"}
                          </Truncate>
                        </div>
                      </div>
                      <div className="col-md-4 text-left">
                        <div>
                          <span className="smText">
                            {" "}
                            Premered on:{anim.attributes.startDate}
                          </span>
                          <br />
                          <span className="smText">
                            {" "}
                            Episodes:{anim.attributes.episodeCount}
                          </span>
                          <br />
                          <span className="smText">
                            {" "}
                            Age Rating:{anim.attributes.ageRating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-left"></div>
                </div>
              </div>
            ))
          ) : (
            <span className="text-success">Loading data...</span>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    animLoaded: state.animReducer.animLoaded,
    anime: state.animReducer.anime,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAnime: (category) => dispatch(getAnime(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Kitsu);
