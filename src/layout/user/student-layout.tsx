import * as React from "react";
import { Header } from "./header";
import {Container} from "@material-ui/core";

export const StudentLayout = ({ children }: any) => {
  return (
    <div style={{minHeight:"100vh", background:"#eaeff1"}}>
      <Header />

      <div>
        <Container>
          {children}
        </Container>
      </div>
    </div>
  );
};
