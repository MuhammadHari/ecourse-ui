import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  Padding,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  FileUploadProvider,
  useFileUpload,
} from "@components/form-fields/file-upload-field";
import { Player } from "@components/player";
import { PdfViewer } from "@components/pdf-viewer";
import { useToggle } from "@hooks/use-toggle";
import { FormField } from "@fields/form-field";
import { SectionField } from "@fields/section-field";
import { ClassRoomModelType } from "@root/models";
import { TextEditor } from "@fields/text-editor-field";
import { Save } from "@material-ui/icons";
import { useLayout } from "@providers/layout-provider/provider";
import { useHeight } from "@hooks/use-height";
import { useState } from "react";

const Field = ({ disabled }: { disabled: boolean }) => {
  const { clickHandler } = useFileUpload();
  return (
    <Button
      fullWidth
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={clickHandler}
    >
      Pilih file
    </Button>
  );
};

const VideoMode = ({ url }: { url: string }) => {
  const [play, { toggle }] = useToggle();
  return <Player url={url} onContainerClick={toggle} play={play} />;
};

const FileWatcher = () => {
  const { previewUrl, type } = useFileUpload();
  const { getContentHeight } = useLayout();
  if (!previewUrl) {
    return <></>;
  }

  if (type.includes("video")) {
    return <VideoMode url={previewUrl} />;
  }
  if (type.includes("pdf")) {
    return (
      <Box>
        <PdfViewer url={previewUrl} />
      </Box>
    );
  }
  return <></>;
};

type Props = {
  showUpload?: boolean;
  classroom: ClassRoomModelType;
  loading: boolean;
  handler(a: any): any;
};

type AProp = {
  open: boolean;
  onClick(): void;
  title: string;
};

const Accordion = ({
  open,
  onClick,
  title,
  children,
}: React.PropsWithChildren<AProp>) => {
  return (
    <Box marginBottom={2} bgcolor="white">
      <Button
        size="small"
        component="div"
        fullWidth
        onClick={onClick}
        style={{
          height: 48,
          borderRadius: 0,
          justifyContent: "start",
          paddingInline: "2rem",
        }}
      >
        {title}
      </Button>
      <Collapse in={open} timeout="auto">
        <Box marginTop={2} paddingY={2}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

const InfoFields = ({ loading, classroom }: Props) => {
  return (
    <>
      <Grid container>
        <Grid item sm={6}>
          <Box paddingX={2}>
            <FormField
              variant="outlined"
              label="Judul konten"
              name="title"
              disabled={loading}
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item sm={6}>
          <Box paddingX={2}>
            <SectionField
              name="sectionId"
              disabled={loading}
              label="Mata pelajaran"
              variant="outlined"
              classroom={classroom}
            />
          </Box>
        </Grid>
      </Grid>
      <Box padding={2}>
        <Typography>Deskripsi</Typography>
        <Box borderRadius={8} bgcolor="#eaeff1">
          <TextEditor name="description" />
        </Box>
      </Box>
    </>
  );
};

const UploaderField = ({ showUpload, loading }: Props) => {
  return (
    <>
      {showUpload ? (
        <Box padding={1}>
          <Field disabled={loading} />
        </Box>
      ) : null}
    </>
  );
};

export const Form = (props: Props) => {
  const [view, setView] = useState<number>(0);
  const height = useHeight(2);
  return (
    <FileUploadProvider name="content" accept="application/pdf,video/*">
      <Grid container style={{ height }}>
        <Grid item sm={8}>
          <Box>
            <Accordion
              open={view === 0}
              onClick={() => setView(0)}
              title="Informasi konten"
            >
              <InfoFields {...props} />
            </Accordion>
            <Accordion
              open={view === 1}
              onClick={() => setView(1)}
              title="Konten"
            >
              <UploaderField {...props} />
              <Box padding={1}>
                <FileWatcher />
                <Box paddingTop={2}>
                  <Button
                    disabled={props.loading}
                    onClick={props.handler}
                    startIcon={
                      props.loading ? <CircularProgress size={15} /> : <Save />
                    }
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Upload konten
                  </Button>
                </Box>
              </Box>
            </Accordion>
          </Box>
        </Grid>
      </Grid>
    </FileUploadProvider>
  );
};
