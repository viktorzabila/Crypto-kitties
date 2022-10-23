import React from "react";

import { sortObject } from "../../helpers/const";
import { SortType } from "../../types/types";

import "./SortHeader.scss";

export type SortProps = {
  sortType: SortType;
  setSortType: (sortType: SortType) => void;
};

const SortHeader: React.FC<SortProps> = ({ sortType, setSortType }) => {
  const onClickItem = (i: SortType) => {
    setSortType(i);
  };

  return (
    <div>
      <ul className="sort">
        <p className="sort__title">Sort By:</p>
        {sortObject.map((el, i) => (
          <li
            key={i}
            className={sortType.sort === el.sort ? "active" : "sort__el"}
            onClick={() => onClickItem(el)}
          >
            {el.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortHeader;
