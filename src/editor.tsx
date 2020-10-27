import type monaco from "monaco-editor";

type monacoType = typeof monaco;

export async function startMonaco(
  { onChange, code, language },
) {
  const monacoLang = language || "typescript";
  if (
    window && window["monaco"] && window["monaco"]["editor"]
  ) {
    return window["monaco"]["editor"];
  }
  return new Promise<monaco.editor.IStandaloneCodeEditor>(
    async function (resolve) {
      if (window["monaco"]) return window["monaco"];
      window["monaco"] = "loading";
      // await loadScript(
      //   "https://unpkg.com/react-cdn-monaco-editor@1.1.1/dts-gen.bundle.js",
      // );

      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/loader.min.js",
      );

      const vsPath =
        "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs";

      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs/loader.min.js",
      );

      // @ts-ignore
      require.config({ paths: { "vs": vsPath } });

      // @ts-ignore
      const document = window.document;
      // @ts-ignore
      require(["vs/editor/editor.main"], async function () {
        const monaco = (window as unknown as { monaco: monacoType }).monaco;

        XPathExpression;
        const editor = monaco.editor.create(
          document.getElementById("container"),
          {
            cursorStyle: "block",
            formatOnType: true,
            scrollbar: {
              horizontal: "hidden",
              verticalHasArrows: true,
              verticalScrollbarSize: 20,
            },

            minimap: {
              enabled: false,
            },
            folding: false,
            multiCursorModifier: "alt",
            wordWrap: "on",
            wordWrapBreakAfterCharacters: ">([{]))],;}",
            mouseWheelZoom: false,
            wordWrapColumn: 70,

            //       glyphMargin: true,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            autoIndent: "brackets",
            autoClosingQuotes: "always",
            lineNumbers: "off",
            autoClosingBrackets: "always",
            autoClosingOvertype: "always",

            suggest: {},
            codeLens: true,
            autoSurround: "languageDefined",
            // acceptSuggestionOnCommitCharacter: true,
            trimAutoWhitespace: true,
            codeActionsOnSaveTimeout: 100,
            model: monaco.editor.createModel(
              code,
              monacoLang,
              monaco.Uri.parse(
                monacoLang === "typescript"
                  ? "file:///main.tsx"
                  : "file:///main.html",
              ),
            ),
            value: code,
            language: monacoLang,
            theme: "vs-dark",
          },
        );

        // editor.deltaDecorations([], [
        //   {
        //     range: new monaco.Range(3, 1, 3, 1),
        //     options: {
        //       isWholeLine: true,
        //       className: "myContentClass",
        //       glyphMarginClassName: "myGlyphMarginClass",
        //     },
        //   },
        // ]);

        if (monacoLang !== "html") {
          const importHelper = {
            react: {
              url: "https://unpkg.com/@types/react@latest/index.d.ts",
              depends: ["global", "csstype", "react-dom", "prop-types"],
            },
            global: {
              url: "https://unpkg.com/@types/react@latest/global.d.ts",
            },
            "prop-types": {
              url: "https://unpkg.com/@types/prop-types@latest/index.d.ts",
            },
            "react-dom": {
              url: "https://unpkg.com/@types/react-dom@latest/index.d.ts",
            },
            csstype: { url: "https://unpkg.com/csstype@latest/index.d.ts" },
          };
          
          (async () => {
            (async () => {
              return monaco.languages.typescript.typescriptDefaults.addExtraLib(
                await (await fetch(
                  "https://unpkg.com/@types/react@latest/index.d.ts",
                )).text(),
                "file:///node_modules/@types/react/index.d.ts",
              );
            })();
            (async () => {
              const reactGlobalDts = await fetch(
                "https://unpkg.com/@types/react@latest/global.d.ts",
              );
              monaco.languages.typescript.typescriptDefaults.addExtraLib(
                await reactGlobalDts.text(),
                "file:///node_modules/@types/react/global.d.ts",
              );
            })();
            (async () => {
              const cssTypeDts = await fetch(
                "https://unpkg.com/csstype@latest/index.d.ts",
              );

              monaco.languages.typescript.typescriptDefaults.addExtraLib(
                await cssTypeDts.text(),
                "file:///node_modules/@types/csstype/index.d.ts",
              );
            })();
            (async () => {
              const propTypesDTS = await fetch(
                "https://unpkg.com/@types/prop-types@latest/index.d.ts",
              );

              monaco.languages.typescript.typescriptDefaults.addExtraLib(
                await propTypesDTS.text(),
                "file:///node_modules/@types/prop-type/index.d.ts",
              );
            })();
            (async () => {
              const reactDOMDts = await fetch(
                "https://unpkg.com/@types/react-dom@latest/index.d.ts",
              );

              monaco.languages.typescript.typescriptDefaults.addExtraLib(
                await reactDOMDts.text(),
                "file:///node_modules/@types/react-dom/index.d.ts",
              );
            })();

            if (monacoLang === "typescript") {
              monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                {
                  target: monaco.languages.typescript.ScriptTarget.ESNext,
                  allowNonTsExtensions: true,
                  allowUmdGlobalAccess: true,
                  strict: true,
                  allowJs: true,
                  noEmitOnError: true,
                  allowSyntheticDefaultImports: true,
                  moduleResolution:
                    monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                  module: monaco.languages.typescript.ModuleKind.CommonJS,
                  noEmit: true,
                  typeRoots: ["node_modules/@types"],
                  jsx: monaco.languages.typescript.JsxEmit.React,
                  jsxFactory: "React.createElement",
                  jsxFragmentFactory: "React.Fragment",
                  esModuleInterop: true,
                },
              );

              monaco.languages.typescript.javascriptDefaults
                .setDiagnosticsOptions({
                  noSuggestionDiagnostics: false,
                  noSemanticValidation: false,
                  noSyntaxValidation: false,
                });
            }
            return "done";
          })();

          monaco.languages.typescript.javascriptDefaults
            .setDiagnosticsOptions({
              noSuggestionDiagnostics: true,
              noSemanticValidation: true,
              noSyntaxValidation: true,
            });
        }

        editor.onDidBlurEditorText(() => {
          //@ts-ignore
          //  console.log(window["prettier"] && prettier);
          //    const code = editor.getValue();
          //   editor.setValue(window["prettier"].format(code));
        });

        (async () => {
          await loadScript(
            "https://unpkg.com/prettier@2.1.2/parser-graphql.js",
          );
        })();

        editor.onDidChangeModelContent((_event) => onChange(editor.getValue()));

        resolve(editor);
      });
    },
  );
}

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    var s;
    s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
