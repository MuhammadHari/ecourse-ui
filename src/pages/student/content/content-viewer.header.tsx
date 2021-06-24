import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Typography,
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { observer } from "mobx-react";
import { ContentModelType, ProgressModelType } from "@root/models";
import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";

const useCompletionMark = mutationServiceFactory<
  ProgressModelType,
  RootStoreBaseMutations.mutateProgressCompletionMark
>({
  schema: {},
  mutation: RootStoreBaseMutations.mutateProgressCompletionMark,
});

export const ContentViewerHeader = observer(
  ({ content }: { content: ContentModelType }) => {
    const { resolver, loading } = useCompletionMark({
      injectInput: {
        id: content.progress.id,
        completed: !content.progress.completed,
      },
    });
    return (
      <Box marginBottom={2}>
        <AppBar position="static">
          <Box padding={1} alignItems="center" display="flex">
            <Typography
              color="textSecondary"
              style={{
                color: "white",
                flex: 1,
                fontWeight: "bold",
                fontSize: "x-large",
              }}
            >
              {content.title}
            </Typography>
            <ButtonGroup>
              <Button
                onClick={() => resolver({})}
                disabled={loading}
                startIcon={<CheckCircle />}
                size="small"
                variant="outlined"
                style={{ color: "white" }}
              >
                Tandai telah selesai
              </Button>
            </ButtonGroup>
          </Box>
        </AppBar>
      </Box>
    );
  }
);
