import * as React from "react";
import { useTeacherContent } from "@providers/teacher-content-provider";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";
import { FormField } from "@fields/form-field";
import { useHeight } from "@hooks/use-height";
import { useEffect, useState } from "react";
import { LoadingButton } from "@components/loading-button";
import { ArrowDropDown } from "@material-ui/icons";
import { ContentModelType } from "@root/models";

export const ContentList = () => {
  const { data, next, nextDisabled, loading, selected, setSelected } =
    useTeacherContent();
  const height = useHeight(3);
  const containerHeight = useHeight(1);

  useEffect(() => {
    if (data.length && !selected) {
      setSelected(data[0]);
    }
  }, [data]);

  const [filter, setFilter] = useState<string>("");
  const isSelected = (model: ContentModelType): boolean => {
    if (!selected) {
      return false;
    }
    return Boolean(selected.id === model.id);
  };
  return (
    <Box bgcolor="white" style={{ height: containerHeight }}>
      <Box
        padding={1}
        zIndex={200}
        position="sticky"
        top={0}
        style={{ height: 48 }}
      >
        <FormField
          fullWidth
          noUseForm
          onChange={setFilter}
          value={filter}
          name="search"
          placeholder="Pencarian"
        />
      </Box>
      <div style={{ height, overflowY: "auto" }}>
        <List style={{ paddingTop: 0 }} dense>
          {data.map((item, i) => (
            <ListItem
              onClick={() => setSelected(item)}
              selected={isSelected(item)}
              button
              key={item.id}
            >
              <ListItemText
                primaryTypographyProps={{
                  variant: "caption",
                }}
                primary={`${i + 1}. ${item.title}`}
                secondary={item.section.title}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <LoadingButton
        disabled={nextDisabled}
        fullWidth
        onClick={next}
        loading={loading}
        icon={<ArrowDropDown />}
      >
        Tampilkan lainya
      </LoadingButton>
    </Box>
  );
};
