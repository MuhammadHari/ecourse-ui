import { observer } from "mobx-react";
import { SectionModelType } from "@root/models";
import { Box, Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import * as React from "react";
import { useContentList } from "./provider";
import { useState } from "react";
import { useClassroomManagement } from "@providers/classroom-management";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { useLayout } from "@providers/layout-provider/provider";
import { ContentListRenderer } from "@components/content-list-renderer";
import { useShowClassrom } from "@pages/shared/classroom/provider";
import { useHeight } from "@hooks/use-height";

const SectionDropdown = () => {
  const { model: classroom } = useClassroomManagement();
  const [selected, setSelected] = useState<SectionModelType | null>(null);
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const { updateVars } = useContentList();

  React.useEffect(() => {
    updateVars({
      sectionId: selected ? selected.id : undefined,
    });
  }, [selected]);

  const onItemChange = (item: SectionModelType | null) => {
    return () => {
      setSelected(item);
      setAnchor(null);
    };
  };
  const onButtonClick = (e: any) => {
    setAnchor(e.target);
  };

  const items = classroom.sections.filter((item) => item.contentCount);

  return (
    <>
      <Menu
        onClose={() => setAnchor(null)}
        open={Boolean(anchor)}
        anchorEl={anchor}
      >
        <MenuItem onClick={onItemChange(null)}>Semua mata pelajaran</MenuItem>
        {items.map((item) => (
          <MenuItem onClick={onItemChange(item)} key={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
      <Button
        onClick={onButtonClick}
        fullWidth
        component="div"
        color="primary"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 0,
        }}
      >
        <Box component="span">
          {!selected ? "Semua mata pelajaran" : selected.title}
        </Box>
        <Box component="span">
          <ArrowDropDown />
        </Box>
      </Button>
    </>
  );
};

const useClasses = makeStyles(() => ({
  root: {
    width: "100%",
    top: 0,
    left: 0,
    background: "white",
    flex: 0,
    position: "relative",
  },
}));

export const ContentList = observer(() => {
  const { setActive, data, via, ...rest } = useContentList();
  const { nodeRef, dimension } = useNodeDimension();
  const check = useClassroomManagement();
  const height = useHeight(3);
  return (
    <>
      {check ? (
        <div style={{ height: 48 }} ref={nodeRef as any}>
          <SectionDropdown />
        </div>
      ) : null}
      <Box overflow="auto" style={{ height }}>
        <ContentListRenderer
          secondaryText={via}
          items={data}
          {...rest}
          onItemClick={setActive}
        />
      </Box>
    </>
  );
});
