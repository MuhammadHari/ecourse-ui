import * as React from "react";
import { UserForm } from "../user-form/user-form";
import {Box} from "@material-ui/core";

export const Page = () => {
  return (
    <Box width='60%' padding={4}>
      <UserForm />
    </Box>
  );
};
