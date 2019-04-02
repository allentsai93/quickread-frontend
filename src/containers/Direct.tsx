import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";

type TParams =  { url: string };

const Direct = ({ match }: RouteComponentProps<TParams>) => {
    return (
        <p>{match.params.url}</p>
    )
};

export default Direct;