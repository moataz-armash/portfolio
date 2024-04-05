import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://65f23ca7034bdbecc7647fef.mockapi.io/projects/1/react-essentail"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
