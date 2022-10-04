/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ResponseObject } from "docusaurus-plugin-openapi/src/openapi/types";

export interface State {
  /**
   * The selected status code.
   */
  code?: string;
  /**
   * The selected response.
   */
  response?: ResponseObject;
  /**
   * `true` if the status code dialog is open.
   */
  isDialogOpen: boolean;
}

const initialState: State = {
  isDialogOpen: false,
} as State;

export const slice = createSlice({
  name: "statusCode",
  initialState,
  reducers: {
    setDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
    setStatusCode: (
      state,
      action: PayloadAction<{
        code: any;
        response: any;
      }>
    ) => {
      const { code, response } = action.payload;
      return {
        ...state,
        code,
        response,
      };
    },
    clearStatusCode: () => {
      return {
        code: undefined,
        response: undefined,
        isDialogOpen: false,
      };
    },
  },
});

export const { setStatusCode, clearStatusCode, setDialogOpen } = slice.actions;

export default slice.reducer;
