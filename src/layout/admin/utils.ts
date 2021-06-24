import { useApp } from "@providers/app-provider/provider";
import { Role } from "@root/models";
import { Class, MenuBook, People } from "@material-ui/icons";
import {createElement, ReactNode} from "react";

type Item  = {
  icon : ReactNode,
  label: string
  pageTitle: string
  path: string
}

const items: Item[] = [
  {
    icon: createElement(Class),
    label: "Ruang kelas",
    path: "/classroom",
    pageTitle: "Ruang kelas",
  },
  {
    icon: createElement(People),
    label: "Siswa",
    path: "/student",
    pageTitle: "Siswa",
  },
  {
    icon: createElement(People),
    label: "Pengajar",
    path: "/teacher",
    pageTitle: "Pengajar",
  },
];

export const useGetItems = (): Item[] => {
  const { user } = useApp();
  if (!user) return [];
  const isTeacher = user.role === Role.Teacher;
  if (isTeacher) {
    return [
      {
        icon: createElement(Class),
        label: "Ruang kelas",
        path: "/classroom",
        pageTitle: "Ruang kelas",
      },
      {
        icon: createElement(MenuBook),
        label: "Konten",
        path: "/content",
        pageTitle: "Konten",
      },
    ];
  }
  return items;
};
