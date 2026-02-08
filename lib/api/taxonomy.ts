export type TaxonomyMeta = {
  version: string;
  source: string;
};

export type NrfDomainKey =
  | "humanities"
  | "social_science"
  | "natural_science"
  | "engineering"
  | "medical"
  | "arts_physical"
  | "interdisciplinary";

export type SuneungFieldKey =
  | "language"
  | "mathematics"
  | "history"
  | "ethics"
  | "geography"
  | "politics"
  | "sociology"
  | "economics"
  | "physics"
  | "chemistry"
  | "biology"
  | "earth_science";

export type SuneungTrack = "common" | "elective";

export type SuneungSubjectKey =
  | "korean"
  | "mathematics"
  | "english"
  | "korean_history"
  | "life_ethics"
  | "ethics_thought"
  | "korean_geography"
  | "world_geography"
  | "east_asian_history"
  | "world_history"
  | "law_politics"
  | "society_culture"
  | "economics"
  | "physics"
  | "chemistry"
  | "biology"
  | "earth_science"
  | "second_foreign_language"
  | "classical_chinese";

export type NrfAlignment = {
  domain_name: string;
  code: string | null;
};

export type SuneungTaxonomy = {
  exam: "suneung";
  domain: NrfDomainKey;
  field: SuneungFieldKey;
  track: SuneungTrack;
  subject_key: SuneungSubjectKey;
  subject_name: string;
  nrf: NrfAlignment;
};

export type SuneungTaxonomyPayload = {
  meta: TaxonomyMeta;
  taxonomy: SuneungTaxonomy;
};

export type SuneungSubjectEntry = {
  subject_key: SuneungSubjectKey;
  subject_name: string;
  domain: NrfDomainKey;
  field: SuneungFieldKey;
  track: SuneungTrack;
};

export const SUNEUNG_SUBJECT_CATALOG: ReadonlyArray<SuneungSubjectEntry> = [
  {
    subject_key: "korean",
    subject_name: "Korean",
    domain: "humanities",
    field: "language",
    track: "common",
  },
  {
    subject_key: "mathematics",
    subject_name: "Mathematics",
    domain: "natural_science",
    field: "mathematics",
    track: "common",
  },
  {
    subject_key: "english",
    subject_name: "English",
    domain: "humanities",
    field: "language",
    track: "common",
  },
  {
    subject_key: "korean_history",
    subject_name: "Korean History",
    domain: "humanities",
    field: "history",
    track: "common",
  },
  {
    subject_key: "life_ethics",
    subject_name: "Life and Ethics",
    domain: "social_science",
    field: "ethics",
    track: "elective",
  },
  {
    subject_key: "ethics_thought",
    subject_name: "Ethics and Thought",
    domain: "social_science",
    field: "ethics",
    track: "elective",
  },
  {
    subject_key: "korean_geography",
    subject_name: "Korean Geography",
    domain: "social_science",
    field: "geography",
    track: "elective",
  },
  {
    subject_key: "world_geography",
    subject_name: "World Geography",
    domain: "social_science",
    field: "geography",
    track: "elective",
  },
  {
    subject_key: "east_asian_history",
    subject_name: "East Asian History",
    domain: "social_science",
    field: "history",
    track: "elective",
  },
  {
    subject_key: "world_history",
    subject_name: "World History",
    domain: "social_science",
    field: "history",
    track: "elective",
  },
  {
    subject_key: "law_politics",
    subject_name: "Law and Politics",
    domain: "social_science",
    field: "politics",
    track: "elective",
  },
  {
    subject_key: "society_culture",
    subject_name: "Society and Culture",
    domain: "social_science",
    field: "sociology",
    track: "elective",
  },
  {
    subject_key: "economics",
    subject_name: "Economics",
    domain: "social_science",
    field: "economics",
    track: "elective",
  },
  {
    subject_key: "physics",
    subject_name: "Physics",
    domain: "natural_science",
    field: "physics",
    track: "elective",
  },
  {
    subject_key: "chemistry",
    subject_name: "Chemistry",
    domain: "natural_science",
    field: "chemistry",
    track: "elective",
  },
  {
    subject_key: "biology",
    subject_name: "Biology",
    domain: "natural_science",
    field: "biology",
    track: "elective",
  },
  {
    subject_key: "earth_science",
    subject_name: "Earth Science",
    domain: "natural_science",
    field: "earth_science",
    track: "elective",
  },
  {
    subject_key: "second_foreign_language",
    subject_name: "Second Foreign Language",
    domain: "humanities",
    field: "language",
    track: "elective",
  },
  {
    subject_key: "classical_chinese",
    subject_name: "Classical Chinese",
    domain: "humanities",
    field: "language",
    track: "elective",
  },
];
