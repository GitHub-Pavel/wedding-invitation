import { atom, useAtomValue, useSetAtom } from "jotai";
import { Section } from "./types";
import { useEffect } from "react";

const SectionsAtom = atom<Section[]>([]);

export const useSections = () => useAtomValue(SectionsAtom);
export const useSectionRegistration = (section: Section) => {
  const setSections = useSetAtom(SectionsAtom);
  useEffect(() => {
    setSections((prev) => {
      if (prev.map((section) => section.id).includes(section.id)) return prev;
      return [...prev, section];
    });
  }, []);
};
