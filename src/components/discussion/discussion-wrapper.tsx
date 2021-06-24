import * as React from "react";
import { Provider, useDiscussionPaginator } from "./provider";
import { DiscussionProps } from "./type";
import { Box } from "@material-ui/core";
import { Container } from "./container";
import { LoadingButton } from "@components/loading-button";
import { ArrowDropDown } from "@material-ui/icons";
import { CreateForm } from "./create-form";
import { useCallback } from "react";
import { DiscussionModelType } from "@root/models";
import { Editor } from "./editor";

const Paginator = () => {
  const {
    loading,
    data,
    nextDisabled,
    next,
    updateSelected,
    selected,
    content,
  } = useDiscussionPaginator();
  const onEditClick = useCallback((model: DiscussionModelType) => {
    return () => {
      updateSelected(model, "edit");
    };
  }, []);

  return (
    <Box>
      <CreateForm content={content} />
      {data.map((item) => (
        <Box key={item.id} marginBottom={2}>
          <Container
            onEditClick={onEditClick(item)}
            item={item}
            key={item.id}
            selected={Boolean(selected && selected.id === item.id)}
            onClick={() => updateSelected(item)}
          />
        </Box>
      ))}
      {nextDisabled ? null : (
        <LoadingButton
          onClick={next}
          loading={loading}
          icon={<ArrowDropDown />}
        >
          Tampilkan lainya
        </LoadingButton>
      )}
      <Editor />
    </Box>
  );
};

export const DiscussionWrapper = (props: DiscussionProps) => {
  return (
    <Provider {...props}>
      <Paginator />
    </Provider>
  );
};
