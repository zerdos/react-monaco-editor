export const example = `<!DOCTYPE html>
<html>

<head>
  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <title>Hello Example</title>
  <style>
    body {
      margin: auto;
      overflow-y: auto;
    }
  </style>
</head>

<body>
  <div id="output"></div>

  <script type="text/jsx">

    const Hello = ({name}) => <h1>Hello {name}</h1>;
    ReactDOM.render(<Hello name="React"/>, document.getElementById("output"))

</script>
</body>
<html>

`