import * as React from "react";
import {AppBar, Box, Tab, Tabs, useTheme} from "@material-ui/core";
import { Path, useClassroomManagement } from "@providers/classroom-management";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { useEffect } from "react";
import { useLayout } from "@providers/layout-provider/provider";

type Item = {
  path: Path;
  label: string;
};

const items: Item[] = [
  { path: "contents", label: "Konten" },
  { path: "section", label: "Mata pelajaran" },
  { path: "students", label: "Siswa" },
  { path: "add-content", label: "Tambah konten" },
];

export const Navigator = () => {
  const { path, updatePath } = useClassroomManagement();
  const theme = useTheme();
  const { nodeRef, dimension } = useNodeDimension();
  const { pushPageHeight } = useLayout();
  useEffect(() => {
    if (dimension.height && nodeRef.current) {
      const node = nodeRef.current as HTMLDivElement;
      if (!node.id) {
        const id = "classroom-management-header";
        node.setAttribute("id", id);
      }
      const cb = pushPageHeight({
        id: node.id,
        height: node.getBoundingClientRect().height,
      });
      return () => cb();
    }
    return () => {};
  }, [dimension]);
  return React.useMemo(
    () => (
      <AppBar position="sticky" ref={nodeRef as any}>
        <Box bgcolor={theme.palette.primary.main} color="white">
          <Tabs value={path} onChange={(e, v: Path) => updatePath(v)}>
            {items.map((item) => (
              <Tab value={item.path} key={item.path} label={item.label} />
            ))}
          </Tabs>
        </Box>
      </AppBar>
    ),
    [path]
  );
};
