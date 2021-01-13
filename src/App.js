import React from "react";
import './App.css';

function App() {
  const availableFiles = getAvailableFiles(data);
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const select = () => {console.log('placeholder select')};
  const unselect = () => {console.log('placeholder unselect')};

  const selectAllCheckbox = React.useRef();
  
  React.useEffect(() => {
    selectAllCheckbox.current.indeterminate = false;
    
    selectedFiles.length === availableFiles.length
    ? (selectAllCheckbox.current.checked = true)
    : selectedFiles.length === 0
    ? (selectAllCheckbox.current.checked = false)
    : (selectAllCheckbox.current.indeterminate = true);
  }, [availableFiles, selectedFiles]);
  
  const onChangeselectAllCheckbox = () => {
    availableFiles.length === selectedFiles.length
    ? setSelectedFiles([])
    : setSelectedFiles(availableFiles);
  };

  const onDownload = () => {alert('placeholder download function')}
  
  return (
    <main>
      <input
        type="checkbox"
        ref={selectAllCheckbox}
        onChange={() => onChangeselectAllCheckbox()}
      />
      {selectedFiles.length === 0 ? (
        "None selected"
      ) : (
        <>Selected {selectedFiles.length}</>
      )}
      <button onClick={onDownload}>
        Download Selected
      </button>
      <table>
          <thead>
            <th></th>
            <th>Name</th>
            <th>Device</th>
            <th>Path</th>
            <th>Status</th>
          </thead>
          <tbody>
            {data.map((file) => {
            const isChecked = selectedFiles.includes(file.name);
            return (
              <File
                key={file.name}
                file={file}
                {...{ isChecked, select, unselect }}
              />
            );
          })}
          </tbody>
        </table>
    </main>
  );
}

const File = ({ file, isChecked, select, unselect }) => {
  const isAvailable = file.status === "available";
  const onChange = () => (isChecked ? unselect(file.name) : select(file.name));
  return (
    <tr>
      <td>
        {isAvailable ? (
          <input type="checkbox" onChange={onChange} checked={isChecked} />
        ) : (
          <input type="checkbox" disabled />
        )}
      </td>
      <td>{file.name}</td>
      <td>{file.device}</td>
      <td>{file.path}</td>
      <td>
        {file.status} {isAvailable ? "greenCirclePlaceholder" : ""}
      </td>
    </tr>
  );
};

const data = [
  {
    name: "smss.exe",
    device: "Stark",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled"
  },
  {
    name: "netsh.exe",
    device: "Targaryen",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available"
  },
  {
    name: "uxtheme.dll",
    device: "Lanniester",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available"
  },
  {
    name: "cryptbase.dll",
    device: "Martell",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled"
  },
  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled"
  }
];

function getAvailableFiles(files) {
  return files.filter((f) => f.status === "available").map((f) => f.name);
}

export default App;
