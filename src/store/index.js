import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";

const initialState = {
  newsData: [],
  newsDataStatus: "INITIAL",
  modalContent: {
    title: '',
    from: '',
    url: '',
    author: '',
    created: 0,
    description: '',
    image: ''
  },
  categories: [],
  categoriesStatus: "INITIAL"
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;