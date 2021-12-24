import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/rating.css';

export default class Rating extends Component {
    render() {
      const { rating } = this.props;
      const range = [1, 2, 3, 4, 5];
      return (
        <div className="rating">
          {range.map((index) =>
            rating >= index ? (
              <i key={index} className="fas fa-star full-star"></i>
            ) : (
              <i key={index} className="fas fa-star empty-star"></i>
            )
          )}
        </div>
      );
    }
  }
  
  Rating.propTypes = {
    rating: PropTypes.oneOf(['1', '2', '3', '4', '5']).isRequired,
  };
  