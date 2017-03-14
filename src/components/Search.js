import React, { Component } from 'react';
import {connect} from 'react-redux';
import Geocoder from './Geocoder';
import PlaceName from './PlaceName';
import {writeSearch, setSearchLocation, setMapUpdated, setMode} from '../actions/index';

class Search extends Component {
  render() {
    return (
      <div className='absolute top m24 w420 flex-parent flex-parent--row'>
        <div className='absolute flex-parent flex-parent--center-cross flex-parent--center-main w42 h42'>
          <svg className='icon color-darken25'><use xlinkHref='#icon-search'></use></svg>
        </div>
        {
          (this.props.searchLocation === null) // no place was selected yet
          ?
          <Geocoder
            onSelect={this.props.setSearchLocation}
          />
          :
          <div className='input input--border-darken5 unround pl36 w420 h42 bg-white shadow-darken5 flex-parent flex-parent--center-cross flex-parent--center-main'>
            <div className='w420 pr48 txt-truncate'>
              <PlaceName location={this.props.searchLocation}/>
            </div>
            <div
              className='absolute right flex-parent flex-parent--center-cross flex-parent--center-main w42 h42 mr24 cursor-pointer'
              onClick={() => {
                this.props.setMode('directions');
              }}
            >
              <img src='/directions.svg' alt='directions'/>
            </div>
          </div>
        }
        {
          (this.props.searchString !== '' || this.props.searchLocation !== null) // search bar is not empty
          ?
          <div
            className='absolute right flex-parent flex-parent--center-cross flex-parent--center-main w42 h42 cursor-pointer'
            onClick={() => {
              this.props.writeSearch('');
              this.props.setSearchLocation(null);
              this.props.setMapUpdated(false);
            }}
          >
            <svg className='icon color-darken25'><use xlinkHref='#icon-close'></use></svg>
          </div>
          :
          <div/>
        }


      </div>
    );
  }
}

Search.propTypes = {
  searchString: React.PropTypes.string,
  searchLocation: React.PropTypes.object,
  writeSearch: React.PropTypes.func,
  setSearchLocation: React.PropTypes.func,
  setMapUpdated: React.PropTypes.func,
  setMode: React.PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    searchString: state.searchString,
    searchLocation: state.searchLocation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    writeSearch: (input) => dispatch(writeSearch(input)),
    setSearchLocation: (location) => dispatch(setSearchLocation(location)),
    setMapUpdated: (bool) => dispatch(setMapUpdated(bool)),
    setMode: (mode) => dispatch(setMode(mode))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
