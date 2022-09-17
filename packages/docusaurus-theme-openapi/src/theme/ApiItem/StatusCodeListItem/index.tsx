/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import clsx from "clsx";

import styles from "./styles.module.css";

interface Props {
  code: any;
  children?: React.ReactNode;
}

function StatusCodeListItem({ code, children }: Props) {
  return (
    <button
      className={styles.apiResponseSchemaPickerOption}
      onClick={() => {
        // setSelectedResponseCode(code);
        // setSelectedResponse(response);
        // setDialogOpen(true);
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
