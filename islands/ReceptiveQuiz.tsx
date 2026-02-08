import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { AtomQuizResponse, fetchAtomQuiz } from "../lib/api/learning.ts";

type LoadState = "idle" | "loading" | "ready" | "error";

export default function ReceptiveQuiz() {
  const quiz = useSignal<AtomQuizResponse | null>(null);
  const loadState = useSignal<LoadState>("idle");
  const errorMessage = useSignal("");
  const targetLevel = useSignal("B2");
  const dataset = useSignal("race");
  const split = useSignal("train");
  const atomType = useSignal("lexis");

  const loadQuiz = async () => {
    loadState.value = "loading";
    errorMessage.value = "";
    try {
      const response = await fetchAtomQuiz({
        atom_type: atomType.value || undefined,
        target_level: targetLevel.value || undefined,
        dataset: dataset.value || undefined,
        split: split.value || undefined,
      });
      quiz.value = response;
      loadState.value = "ready";
    } catch (error) {
      console.error(error);
      errorMessage.value = "Failed to load receptive quiz.";
      loadState.value = "error";
    }
  };

  useEffect(() => {
    void loadQuiz();
  }, []);

  if (loadState.value === "loading") {
    return (
      <section>
        <details>
          <summary>Receptive Quiz</summary>
          <h2>Loading</h2>
          <p>Fetching the latest quiz from content atoms.</p>
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
          <button type="button" onClick={loadQuiz}>
            Retry
          </button>
        </details>
      </section>
    );
  }

  const skillType = quiz.value?.skill?.type;
  const skillContent = quiz.value?.skill?.content;
  const system = quiz.value?.system;

  return (
    <section>
      <details>
        <summary>Receptive Quiz</summary>
        <header>
          <p>Content Atom</p>
          <h2>Receptive Quiz Preview</h2>
          <p>Backend parsing is applied before sending quiz content.</p>
        </header>
        <fieldset>
          <legend>Filters</legend>
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
              onInput={(event) =>
                (dataset.value = (event.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            <strong>Split</strong>
            <input
              value={split.value}
              onInput={(event) =>
                (split.value = (event.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            <strong>Atom Type</strong>
            <select
              value={atomType.value}
              onChange={(event) =>
                (atomType.value = (event.target as HTMLSelectElement).value)}
            >
              <option value="lexis">Lexis</option>
              <option value="grammar">Grammar</option>
              <option value="phonology">Phonology</option>
              <option value="skill_receptive">Reading (Receptive)</option>
            </select>
          </label>
          <button type="button" onClick={loadQuiz}>
            Load Quiz
          </button>
        </fieldset>
      </details>

      <article>
        <details open>
          <summary>Quiz Metadata</summary>
          {system ? (
            <table>
              <caption>Quiz metadata</caption>
              <tbody>
                <tr>
                  <th scope="row">Domain</th>
                  <td>{system.domain ?? "Unknown"}</td>
                </tr>
                <tr>
                  <th scope="row">Atom ID</th>
                  <td>{system.atom_id ?? "Unknown"}</td>
                </tr>
                <tr>
                  <th scope="row">Source ID</th>
                  <td>{system.source_id ?? "Unknown"}</td>
                </tr>
                <tr>
                  <th scope="row">Target Level</th>
                  <td>{system.target_level ?? "Unknown"}</td>
                </tr>
                <tr>
                  <th scope="row">Dataset</th>
                  <td>{system.dataset ?? "Unknown"}</td>
                </tr>
                <tr>
                  <th scope="row">Split</th>
                  <td>{system.split ?? "Unknown"}</td>
                </tr>
                <tr>
                  <th scope="row">Example ID</th>
                  <td>{system.example_id ?? "Unknown"}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No quiz metadata available.</p>
          )}
        </details>
      </article>

      <article>
        <details open>
          <summary>Quiz Content</summary>
          {skillType === "reading_receptive" &&
          skillContent &&
          typeof skillContent === "object" &&
          "passage" in skillContent ? (
            <section>
              <h3>Passage</h3>
              <p>{String(skillContent.passage ?? "")}</p>
              <section>
                <h3>Questions</h3>
                {Array.isArray(skillContent.items) ? (
                  <ol>
                    {skillContent.items.map((item, itemIndex) => (
                      <li key={`reading-item-${itemIndex}`}>
                        <p>{item.question}</p>
                        <ol>
                          {item.options.map((option, optionIndex) => (
                            <li key={`reading-opt-${itemIndex}-${optionIndex}`}>
                              {option.text}
                              {option.is_correct ? <small> (Correct)</small> : null}
                            </li>
                          ))}
                        </ol>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p>No questions found.</p>
                )}
              </section>
            </section>
          ) : null}

          {skillType === "4_choice" &&
          skillContent &&
          typeof skillContent === "object" &&
          "options" in skillContent ? (
            <section>
              <h3>Multiple Choice</h3>
              <p>
                {"question" in skillContent
                  ? String(skillContent.question ?? "")
                  : "Select the best answer."}
              </p>
              <ol>
                {Array.isArray(skillContent.options)
                  ? skillContent.options.map((option, optionIndex) => (
                    <li key={`lexis-opt-${optionIndex}`}>
                      {option.text}
                      {option.is_correct ? <small> (Correct)</small> : null}
                    </li>
                  ))
                  : null}
              </ol>
            </section>
          ) : null}

          {skillType === "swipe_true_false" &&
          skillContent &&
          typeof skillContent === "object" &&
          "word" in skillContent ? (
            <section>
              <h3>Phonology</h3>
              <table>
                <caption>Prompt</caption>
                <tbody>
                  <tr>
                    <th scope="row">Word</th>
                    <td>{String(skillContent.word ?? "")}</td>
                  </tr>
                  <tr>
                    <th scope="row">Pronunciation</th>
                    <td>{String(skillContent.pronunciation ?? "")}</td>
                  </tr>
                  <tr>
                    <th scope="row">Match</th>
                    <td>{skillContent.is_match ? "True" : "False"}</td>
                  </tr>
                </tbody>
              </table>
            </section>
          ) : null}

          {skillType === "grammar_two_choice" &&
          skillContent &&
          typeof skillContent === "object" &&
          "choices" in skillContent ? (
            <section>
              <h3>Grammar</h3>
              {Array.isArray(skillContent.leading_sentences) &&
              skillContent.leading_sentences.length > 0 ? (
                <section>
                  <h4>Prompt</h4>
                  <ul>
                    {skillContent.leading_sentences.map((sentence, sentenceIndex) => (
                      <li key={`leading-${sentenceIndex}`}>{sentence}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
              <ol>
                {Array.isArray(skillContent.choices)
                  ? skillContent.choices.map((choice, choiceIndex) => (
                    <li key={`grammar-choice-${choiceIndex}`}>
                      {choice.parts?.map((part, partIndex) =>
                        part.is_bold ? (
                          <strong key={`part-${partIndex}`}>{part.text}</strong>
                        ) : (
                          part.text
                        ),
                      )}
                      {choice.is_correct ? <small> (Correct)</small> : null}
                    </li>
                  ))
                  : null}
              </ol>
              {Array.isArray(skillContent.trailing_sentences) &&
              skillContent.trailing_sentences.length > 0 ? (
                <section>
                  <h4>Notes</h4>
                  <ul>
                    {skillContent.trailing_sentences.map((sentence, sentenceIndex) => (
                      <li key={`trailing-${sentenceIndex}`}>{sentence}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </section>
          ) : null}

          {!skillType ? <p>No quiz content available.</p> : null}
        </details>
      </article>
    </section>
  );
}
