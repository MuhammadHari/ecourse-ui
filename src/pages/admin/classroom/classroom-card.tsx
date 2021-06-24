import * as React from "react";
import { ClassRoomModelType } from "@root/models";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import { motion, AnimatePresence } from "framer-motion";
import {gradeUtils} from "@utils/grade-tranform";

export type Props = {
  classroom: ClassRoomModelType;
  buttons: Array<
    ButtonProps & {
      color?: ButtonProps["color"];
      onClick(): void;
      title: React.ReactNode;
    }
  >;
};

const useClasses = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    minHeight: "240px",
    position: "relative",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  info: {
    position: "absolute",
    bottom: 0,
    height: "50%",
    width: "100%",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.70)",
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AnimatedBox = ({ children }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const { find } = gradeUtils

export const ClassroomCard = ({ classroom, buttons }: Props) => {
  const classes = useClasses();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    const img = document.createElement("img");
    img.setAttribute("src", classroom.photo as string);
    img.classList.add("d-none");
    img.addEventListener("load", () => {
      img.remove();
      setUrl(classroom.photo as string);
    });
    document.body.appendChild(img);
  }, []);
  return (
    <AnimatePresence>
      {!url ? (
        <AnimatedBox>
          <Skeleton variant="rect" height={240} />
        </AnimatedBox>
      ) : (
        <Paper
          className={classes.root}
          style={{
            backgroundImage: `url(${url})`,
          }}
        >
          <Box className={classes.info}>
            <Divider />
            <Box width="100%" padding={2}>
              <Typography variant="h5" align="center">
                {gradeUtils.find(classroom.grade).label}
              </Typography>
              <Box width="100%" display="flex">
                <Box width="50%" textAlign="center">
                  <Typography>{classroom.contentCount + " konten"}</Typography>
                </Box>
                <Box width="50%" textAlign="center">
                  <Typography>{classroom.studentCount + " siswa"}</Typography>
                </Box>
              </Box>
              <Box paddingY={1}>
                <ButtonGroup variant="outlined">
                  {buttons.map(({ color = "primary", ...button }) => (
                    <Button
                      {...button}
                      size="small"
                      color={color}
                      variant="outlined"
                      key={button.title}
                    >
                      {button.title}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </AnimatePresence>
  );
};
