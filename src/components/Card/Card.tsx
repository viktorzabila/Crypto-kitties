import React from "react";

import { CardProps } from "../../types/types";
import "./Card.scss";

const Card: React.FC<CardProps> = ({ name, price, image_url, category }) => {
  return (
    <div className="card">
      <div className="card__body">
        <img src={image_url} className="card__image" alt="cat" />
        <div className="card__text">
          <p>
            Name: <span className="card__name">{name}</span>
          </p>
          <p>
            Price: <span className="card__price">{price}</span>
          </p>
          <p>
            Category: <span className="card__category">{category}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
