import React, { useContext } from "react";
import Filter from "../components/Filter";
import TableComponent from "../components/TableComponent";
import { CryptoContext } from "../context/CryptoContext";

const Crypto = () => {
  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <Filter></Filter>
      <TableComponent></TableComponent>
    </section>
  );
};

export default Crypto;
