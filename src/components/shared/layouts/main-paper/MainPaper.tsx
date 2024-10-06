import { Paper, PaperProps, ScrollArea } from "@mantine/core";
import { PropsWithChildren } from "react";
import classes from "./MainPaper.module.css";

type MainPaperProps = PaperProps & PropsWithChildren;

export function MainPaper({ children, ...props }: MainPaperProps) {
  return (
    <Paper className={classes.paper} {...props}>
      {/* <ScrollArea className={classes.scroll}> */}
      {children}
      {/* </ScrollArea> */}
    </Paper>
  );
}
