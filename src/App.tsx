import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

import Card from "./components/Card/Card";
import SortHeader from "./components/SortHeader/SortHeader";

import { CardProps, SortType } from "./types/types";

import "./index.scss";

const App: React.FC = () => {
  const [data, setData] = useState<CardProps[]>([]);
  const [sortType, setSortType] = useState<SortType>({ title: "name", sort: "name" });
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevY, setPrevY] = useState<number>(0);
  const dataRef = useRef<CardProps[]>([]);

  const loadingRef = useRef<HTMLDivElement>(null);
  const prevYRef = useRef({});
  const pageRef = useRef({});
  dataRef.current = data;
  pageRef.current = page;

  prevYRef.current = prevY;

  const handleObserver = (entities: Array<IntersectionObserverEntry>) => {
    const y = entities[0].boundingClientRect.y;
    if (prevYRef.current > y) {
      setPage(Number(pageRef.current) + 1);
      getData();
    }

    setPrevY(y);
  };

  useEffect(() => {
    getData();

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(loadingRef.current as HTMLDivElement);
  }, []);

  const getData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://ftl-cryptokitties.fly.dev/api/crypto_kitties?&page=${pageRef.current}&per_page=50`
      );

      if (response) {
        setData([...dataRef.current, ...response.data.cats]);

        setLoading(false);
      }
    } catch (error) {
      let errorMessage = "Failed to do load data";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    }
  };

  useEffect(() => {
    const sortData = async () => {
      const order = sortType.sort.includes("-") ? "asc" : "desc";
      const sortBy = sortType.sort.replace("-", "");

      setLoading(true);

      try {
        const sortedData = await axios.get(
          `https://ftl-cryptokitties.fly.dev/api/crypto_kitties?&sort_by=${sortBy}&sort_dir=${order}`
        );

        if (sortedData) {
          setData(sortedData.data.cats);
          setLoading(false);
        }
      } catch (error) {
        let errorMessage = "Failed to do sort data";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
      }
    };

    sortData();
  }, [sortType]);

  return (
    <div className="container">
      <SortHeader sortType={sortType} setSortType={(id) => setSortType(id)} />
      <div className="wrapper">
        {data.map((el, id) => {
          return (
            <Card
              key={el.id + id + el.price}
              name={el.name}
              image_url={el.image_url}
              price={el.price}
              category={el.category}
              id={el.id}
            />
          );
        })}
      </div>
      <div ref={loadingRef} className="bottom-infinite">
        {loading && (
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
