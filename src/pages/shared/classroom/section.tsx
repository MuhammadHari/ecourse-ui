import React, { useEffect, useState } from "react";
import {
  WrapSectionProvider,
  useSectionProvider,
} from "@service-provider/section-provider";
import { observer } from "mobx-react";
import { useClassroomManagement } from "@providers/classroom-management";
import { FormField } from "@fields/form-field";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useSuccessModal } from "@hooks/use-success-modal";
import { Role, SectionModelType } from "@root/models";
import { Edit, Save } from "@material-ui/icons";
import { useApp } from "@providers/app-provider/provider";
import { useLayout } from "@providers/layout-provider/provider";

type FormProps = {
  loading: boolean;
  handler(e: any): any;
};
const Form = ({ handler, loading }: FormProps) => {
  return (
    <form onSubmit={handler}>
      <Box marginY={3}>
        <FormField
          disabled={loading}
          variant="outlined"
          fullWidth
          name="title"
          label="Nama mata pelajaran"
        />
      </Box>
      <Button
        startIcon={loading ? <CircularProgress size={15} /> : <Save />}
        disabled={loading}
        color="primary"
        variant="outlined"
        type="submit"
      >
        Simpan
      </Button>
    </form>
  );
};

const CreateSectionForm = observer(() => {
  const { model: classroom } = useClassroomManagement();
  const { create, refresh } = useSectionProvider();
  const {
    provider: Provider,
    handler,
    result,
    form,
    loading,
  } = create({
    injectInput: {
      classroomId: classroom.id,
    },
  });
  useSuccessModal({
    callback() {
      form.setValue("title", "");
      refresh();
    },
    message: "Mata pelajaran berhasil di tambah",
    depedencies: Boolean(result),
  });
  return (
    <Provider>
      <Form loading={loading} handler={handler} />
    </Provider>
  );
});

const EditDialog = observer(
  ({
    selected,
    onSuccess,
  }: {
    onSuccess(): void;
    selected: null | SectionModelType;
  }) => {
    const { update } = useSectionProvider();
    const {
      provider: Provider,
      form,
      result,
      handler,
      loading,
    } = update({
      injectInput: {
        id: selected ? selected.id : null,
      },
    });
    useSuccessModal({
      callback() {
        form.setValue("title", "");
        onSuccess();
      },
      message: "Mata pelajaran berhasil di edit",
      depedencies: Boolean(result),
    });
    useEffect(() => {
      if (selected) {
        form.setValue("title", selected.title);
      }
    }, [selected]);
    const handleClose = () => {
      if (!loading) {
        onSuccess();
      }
    };

    return (
      <Dialog onClose={handleClose} fullWidth open={Boolean(selected)}>
        <DialogTitle>Edit nama mata pelajaran</DialogTitle>
        <DialogContent>
          <Provider>
            <Form loading={loading} handler={handler} />
          </Provider>
        </DialogContent>
      </Dialog>
    );
  }
);

const SectionTable = ({
  onRowClick,
}: {
  onRowClick(model: SectionModelType): void;
}) => {
  const { getContentHeight } = useLayout();
  const { sections } = useSectionProvider();
  return (
    <Box bgcolor="white">
      <TableContainer style={{ height: getContentHeight() }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Mata pelajaran</TableCell>
              <TableCell>Jumlah konten</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sections.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box component="span">
                    <IconButton
                      onClick={() => onRowClick(item)}
                      size="small"
                      style={{ marginRight: 3 }}
                      component="span"
                    >
                      <Edit />
                    </IconButton>
                    <Typography component="span">{item.title}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{item.contentCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const Component = observer(() => {
  const [selected, setSelected] = useState<null | SectionModelType>(null);
  const { user } = useApp();
  const isEnableWrite = () => {
    return user?.role === Role.Adm;
  };
  return (
    <>
      <EditDialog onSuccess={() => setSelected(null)} selected={selected} />
      <Grid container>
        <Grid item md={6} sm={12} lg={5}>
          <SectionTable onRowClick={setSelected} />
        </Grid>
        {isEnableWrite() ? (
          <Grid item md={6} sm={12} lg={7}>
            <Box paddingX={2}>
              <Box padding={2}>
                <Typography variant="h6">Tambah mata pelajaran</Typography>
                <CreateSectionForm />
              </Box>
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
});

export const Section = WrapSectionProvider(Component);
