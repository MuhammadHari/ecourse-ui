import * as React from "react";
import { Props as BaseProps, Option, selectFieldFactory } from "./select-field";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { ClassRoomModelType, SectionModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { useState } from "react";

type Props = Omit<BaseProps, "options"> & {
  classroom?: ClassRoomModelType | null;
};

const mapper = ({ id, title }: SectionModelType): Option => ({
  value: id,
  label: title,
});

export const SectionField = ({ classroom = null, ...props }: Props) => {
  const [sections, { fetch }] = useFetchQuery<SectionModelType[]>({
    queryKey: RootStoreBaseQueries.querySections,
  });

  const [options, setOptions] = useState<Array<Option>>([]);
  React.useEffect(() => {
    if (sections) {
      setOptions([...sections.map(mapper)]);
    }
  }, [sections]);
  React.useEffect(() => {
    if (classroom && classroom.sections) {
      setOptions([...classroom.sections.map(mapper)]);
    }
    if (!classroom) {
      fetch({});
    }
  }, [classroom]);
  const Node = selectFieldFactory(options);
  return options.length ? <Node {...props} /> : <></>;
};
