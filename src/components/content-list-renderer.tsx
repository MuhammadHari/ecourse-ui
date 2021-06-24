import * as React from "react";
import { ContentModelType } from "@root/models";
import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import { gradeUtils } from "@utils/grade-tranform";

type Props = {
  items: Array<ContentModelType>;
  loading: boolean;
  nextDisabled: boolean;
  selected: ContentModelType | null;
  next(): void;
  onItemClick(m: ContentModelType): void;
  secondaryText: "user" | "classroom";
};

type ControllerProp = {
  loading: boolean;
  nextDisabled: boolean;
  next(): void;
};

const Controller = ({ loading, nextDisabled, next }: ControllerProp) => {
  const classes = useClasses();
  return nextDisabled ? null : (
    <ListItem dense button onClick={next}>
      <ListItemText
        primary={
          <>
            <span>{loading ? "Mengambil data" : "Tampilkan lainya"}</span>
            {loading ? <CircularProgress size="15" /> : <ArrowDropDown />}
          </>
        }
        primaryTypographyProps={{
          component: "div",
          className: classes.controller,
        }}
      />
    </ListItem>
  );
};

const { find } = gradeUtils;

const Item = ({
  item,
  active,
  onClick,
  secondaryText,
}: {
  item: ContentModelType;
  active: boolean;
  onClick(): void;
  secondaryText: "user" | "classroom";
}) => {
  const secondary = () => {
    if (secondaryText === "user") {
      return (
        <span style={{ display: "flex", justifyContent:"space-between" }}>
          <span>{find(item.classroom.grade).label}</span>
          <span>{item.section.title}</span>
        </span>
      );
    }
    return item.user.name;
  };

  return (
    <ListItem dense onClick={onClick} selected={active} button key={item.id}>
      <ListItemAvatar>
        <Avatar src={item.thumbnail} />
      </ListItemAvatar>
      <ListItemText secondary={secondary()} primary={item.title} />
    </ListItem>
  );
};

const useClasses = makeStyles(() => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  controller: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export const ContentListRenderer = ({
  next,
  selected,
  loading,
  nextDisabled,
  onItemClick,
  items,
  secondaryText,
}: Props) => {
  const classes = useClasses();
  return (
    <Box overflow="auto">
      <List dense className={classes.root}>
        {items.map((item) => (
          <Item
            secondaryText={secondaryText}
            key={item.id}
            item={item}
            active={Boolean(selected && selected.id === item.id)}
            onClick={() => onItemClick(item)}
          />
        ))}
        <Controller next={next} loading={loading} nextDisabled={nextDisabled} />
      </List>
    </Box>
  );
};
