import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { ContentAtom, fetchContentAtoms } from "../lib/api/learning.ts";

type LoadState = "idle" | "loading" | "ready" | "error";

const normalize = (value: string) => value.trim().toLowerCase();

const uniqueValues = (values: Array<string | null | undefined>) => {
  const filtered = values
    .map((value) => (value ? value.trim() : ""))
    .filter(Boolean);
  return Array.from(new Set(filtered)).sort();
};

export default function ReceptiveQuiz() {
  const atomList = useSignal<ContentAtom[]>([]);
  const loadState = useSignal<LoadState>("idle");
  const errorMessage = useSignal("");
  const targetLevel = useSignal("B2");
  const dataset = useSignal("race");
  const split = useSignal("train");
  const atomType = useSignal("lexis");
  const atomIndex = useSignal(0);

  const loadData = async () => {
    loadState.value = "loading";
    errorMessage.value = "";
    try {
      const atoms = await fetchContentAtoms();
      atomList.value = atoms;
      atomIndex.value = 0;
      loadState.value = "ready";
    } catch (error) {
      console.error(error);
      errorMessage.value = "Failed to load receptive content.";
      loadState.value = "error";
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const filteredAtoms = () => {
    const atomKey = normalize(atomType.value);
    return atomList.value.filter((atom) => {
      const atomBody = atom.atom_body;
      const atomLevel = normalize(String(atomBody?.target_level ?? ""));
      const atomDataset = normalize(String(atomBody?.dataset ?? ""));
      const atomSplit = normalize(String(atomBody?.split ?? ""));
      if (targetLevel.value && atomLevel && atomLevel !== normalize(targetLevel.value)) {
        return false;
      }
      if (dataset.value && atomDataset && atomDataset !== normalize(dataset.value)) {
        return false;
      }
      if (split.value && atomSplit && atomSplit !== normalize(split.value)) {
        return false;
      }
      if (!atomKey) {
        return true;
      }
      return normalize(atom.atom_type) === atomKey;
    });
  };

  const nextAtom = () => {
    const atoms = filteredAtoms();
    if (atoms.length === 0) {
      return;
    }
    atomIndex.value = (atomIndex.value + 1) % atoms.length;
  };

  if (loadState.value === "loading") {
    return (
      <section>
        <details>
          <summary>Receptive Quiz</summary>
          <h2>Loading</h2>
          <p>Fetching receptive sources and atoms.</p>
        </details>
      </section>
    );
  }

  if (loadState.value === "error") {
    return (
      <section>
        <details>
          <summary>Receptive Quiz</summary>
          <h2>Unable to load</h2>
          <p>{errorMessage.value}</p>
          <button type="button" onClick={loadData}>
            Retry
          </button>
        </details>
      </section>
    );
  }

  const atoms = filteredAtoms();
  const activeAtom =
    atoms.length > 0 ? atoms[atomIndex.value % atoms.length] : null;
  const datasetOptions = uniqueValues(
    atomList.value.map((atom) => String(atom.atom_body?.dataset ?? "")),
  );
  const splitOptions = uniqueValues(
    atomList.value.map((atom) => String(atom.atom_body?.split ?? "")),
  );

  return (
    <section>
      <details>
        <summary>Receptive Quiz</summary>
        <header>
          <p>Content Atom</p>
          <h2>Receptive Quiz Preview</h2>
          <p>Use filters to match CEFR tags and dataset splits.</p>
        </header>
        <fieldset>
          <legend>Source Filters</legend>
          <label>
            <strong>Target Level</strong>
            <select
              value={targetLevel.value}
              onChange={(event) =>
                (targetLevel.value = (event.target as HTMLSelectElement).value)}
            >
              <option value="">All</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>
          </label>
          <label>
            <strong>Dataset</strong>
            <input
              value={dataset.value}
              list="dataset-options"
              onInput={(event) =>
                (dataset.value = (event.target as HTMLInputElement).value)}
            />
          </label>
          <datalist id="dataset-options">
            {datasetOptions.map((value) => (
              <option key={value} value={value} />
            ))}
          </datalist>
          <label>
            <strong>Split</strong>
            <input
              value={split.value}
              list="split-options"
              onInput={(event) =>
                (split.value = (event.target as HTMLInputElement).value)}
            />
          </label>
          <datalist id="split-options">
            {splitOptions.map((value) => (
              <option key={value} value={value} />
            ))}
          </datalist>
        </fieldset>
        <fieldset>
          <legend>Atom Filters</legend>
          <label>
            <strong>Atom Type</strong>
            <select
              value={atomType.value}
              onChange={(event) =>
                (atomType.value = (event.target as HTMLSelectElement).value)}
            >
              <option value="">All</option>
              <option value="lexis">Lexis</option>
              <option value="grammar">Grammar</option>
              <option value="phonology">Phonology</option>
            </select>
          </label>
          <button type="button" onClick={nextAtom}>
            Next Atom
          </button>
        </fieldset>
        <button type="button" onClick={loadData}>
          Reload Data
        </button>
      </details>

      <article>
        <details open>
          <summary>Atom Preview</summary>
          {activeAtom ? (
            <section>
              <table>
                <caption>Atom metadata</caption>
                <tbody>
                  <tr>
                    <th scope="row">Atom Type</th>
                    <td>{activeAtom.atom_type}</td>
                  </tr>
                  <tr>
                    <th scope="row">Atom ID</th>
                    <td>{activeAtom.id}</td>
                  </tr>
                  <tr>
                    <th scope="row">Source ID</th>
                    <td>{activeAtom.source_id}</td>
                  </tr>
                  <tr>
                    <th scope="row">Atom Hash</th>
                    <td>{activeAtom.atom_hash}</td>
                  </tr>
                  <tr>
                    <th scope="row">Target Level</th>
                    <td>
                      {String(activeAtom.atom_body?.target_level ?? "Unknown")}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Dataset</th>
                    <td>{String(activeAtom.atom_body?.dataset ?? "Unknown")}</td>
                  </tr>
                  <tr>
                    <th scope="row">Split</th>
                    <td>{String(activeAtom.atom_body?.split ?? "Unknown")}</td>
                  </tr>
                </tbody>
              </table>
              <section>
                <h3>Atom Body</h3>
                <pre>{JSON.stringify(activeAtom.atom_body, null, 2)}</pre>
              </section>
            </section>
          ) : (
            <p>No atoms match the filters.</p>
          )}
        </details>
      </article>
    </section>
  );
}
