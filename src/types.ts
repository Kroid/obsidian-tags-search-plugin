import { TFile } from "obsidian"

export type FileWithTags = {
  file: TFile;
  tags: string[];
}
