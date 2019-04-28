import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Header from "../components/Header";

type TParams = { url: string };

const Direct = ({ match }: RouteComponentProps<TParams>) => {
  return (
    <>
    <Header />
    <p>{match.params.url}</p>
    </>
  );
};

export default Direct;
