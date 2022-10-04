/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import MuiButton from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import type { ResponsesObject } from "docusaurus-plugin-openapi/src/openapi/types";

import { getSchemaQualifiedType } from "../../../utils";
import { useTypedDispatch, useTypedSelector } from "../../ApiDemoPanel/hooks";
import BodyParamListItem from "../BodyParamListItem";
import ContentSection from "../ContentSection";
import SchemaObject from "../SchemaObject";
import { setDialogOpen, setStatusCode } from "./slice";
import styles from "./styles.module.css";

interface Props {
  codes: string[];
  responses: ResponsesObject;
  children?: React.ReactNode;
}

const Button = styled(MuiButton)(() => ({
  color: "var(--ifm-color-primary)",
}));

const Select = styled(MuiSelect)(() => ({
  color: "var(--ifm-font-color-base)",
  borderColor: "var(--ifm-color-emphasis-300)",
}));

/**
 * Renders the response body for a given status code.
 * @param properties The properties of the response body.
 * @param requiredProps The properties that are required in the response.
 */
function renderResponseBody(properties: any, requiredProps: string[] = []) {
  if (!properties) {
    return null;
  }
  return Object.keys(properties).map((prop, key) => {
    const section = properties[prop];
    return (
      <BodyParamListItem
        key={key}
        propertyName={prop}
        required={section.required || requiredProps.includes(prop)}
        schema={section}
      >
        <SchemaObject object={section} />
        {section.description}
        {section.properties && renderResponseBody(section.properties)}
        {section.items?.properties &&
          renderResponseBody(section.items.properties)}
      </BodyParamListItem>
    );
  });
}

function StatusCodeTable({ codes, responses, children }: Props) {
  const dialogOpen = useTypedSelector((state) => state.statusCode.isDialogOpen);
  const code = useTypedSelector((state) => state.statusCode.code);
  const response = useTypedSelector((state) => state.statusCode.response);
  const contentType =
    useTypedSelector((state) => state.accept.value) ?? "application/json";

  const dispatch = useTypedDispatch();

  let schema: any;

  if (response?.content) {
    schema = response.content[contentType]?.schema;
  }

  return (
    <>
      {children}
      <Dialog
        open={dialogOpen}
        fullWidth={true}
        aria-labelledby="response-dialog-title"
        aria-describedby="response-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: "var(--openapi-card-background-color)",
            color: "var(--ifm-font-color-base)",
          },
        }}
      >
        <header className={styles.dialogHeader}>
          <DialogTitle id="response-dialog-title">
            Response
            <Select
              className={styles.dialogHeaderSelect}
              value={code}
              SelectDisplayProps={{
                style: {
                  padding: "8px 30px 8px 8px",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "var(--ifm-background-surface-color)",
                    color: "var(--ifm-color-content)",
                  },
                },
              }}
              onChange={(ev) => {
                const code = ev.target.value as string;
                dispatch(
                  setStatusCode({
                    code,
                    response: responses[code],
                  })
                );
              }}
            >
              {codes.map((code, index) => (
                <MenuItem key={`response-menu-item-${index}`} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </DialogTitle>
          <Button onClick={() => dispatch(setDialogOpen(false))}>
            <CloseIcon />
          </Button>
        </header>
        {response && (
          <DialogContent
            className={styles.dialogContent}
            id="response-dialog-description"
          >
            <p>{response.description}</p>

            {schema && (
              <ContentSection title="Response Body">
                <Card
                  className={styles.responseBodyCard}
                  sx={{
                    backgroundColor: "var(--openapi-card-background-color)",
                    color: "var(--ifm-color-content)",
                  }}
                >
                  <CardHeader
                    className={styles.responseBodyCardHeader}
                    subheader={
                      <span className={styles.paramType}>
                        {getSchemaQualifiedType(schema)}
                      </span>
                    }
                    subheaderTypographyProps={{
                      sx: {
                        color: "var(--ifm-color-content)",
                      },
                    }}
                  />
                  {schema.properties &&
                    renderResponseBody(schema.properties, schema.required)}
                  {schema.items?.properties &&
                    renderResponseBody(
                      schema.items.properties,
                      schema.required
                    )}
                </Card>
              </ContentSection>
            )}
          </DialogContent>
        )}
        <footer className={styles.dialogFooter}>
          <DialogActions>
            <Button onClick={() => dispatch(setDialogOpen(false))}>
              Close
            </Button>
          </DialogActions>
        </footer>
      </Dialog>
    </>
  );
}

export default StatusCodeTable;
