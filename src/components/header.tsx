import { type } from "os";
import React from "react";

export type HeaderProps = { content: string };
export const Header = ({ content }: HeaderProps) => {
  return <h1 style={{ marginLeft: "650px" }}>{content}</h1>;
};
