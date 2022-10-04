/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import clsx from "clsx";

import { useTypedDispatch } from "../../ApiDemoPanel/hooks";
import { setStatusCode, setDialogOpen } from "../StatusCodeTable/slice";
import styles from "./styles.module.css";

interface Props {
  code: any;
  response?: any;
  children?: React.ReactNode;
}

function StatusCodeListItem({ code, response, children }: Props) {
  const dispatch = useTypedDispatch();

  return (
    <button
      className={styles.apiResponseSchemaPickerOption}
      onClick={() => {
        dispatch(setDialogOpen(true));
        dispatch(setStatusCode({ code, response }));
      }}
    >
      <div>
        <div className={styles.apiResponseSchemaPickerOptionLabel}>
          <code className={styles.httpStatus}>
            <span
              className={clsx(
                styles.httpStatusChit,
                styles[`httpStatus_${code.substring(0, 1)}`]
              )}
              aria-hidden="false"
              aria-label={code}
            ></span>
          </code>
          {code}
        </div>
        <div className={styles.apiResponseSchemaPickerDescription}>
          <p>{children}</p>
        </div>
      </div>
      <OpenInFullIcon className={styles.apiResponseSchemaPickerIcon} />
    </button>
  );
}

export default StatusCodeListItem;
