# React Table Example

![react-table-example](react-table.gif)

## Requirements

- The component should be able to be given the following data:

  ```
  [
  {name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},
  
  {name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},
  
  {name: 'uxtheme.dll', device: 'Lanniester', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},
  
  {name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},
  
  {name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'}
  ]
  ```

- Only those that have a status of "available" are currently able to be downloaded. Your implementation should manage this.

- The select-all checkbox should be in an unselected state if no items are selected.

- The select-all checkbox should be in a selected state if all items are selected.

- The select-all checkbox should be in an indeterminate state if some but not all items are selected.

- The "Selected 2" text should reflect the count of selected items and display "None Selected" when there are none selected.

- Clicking the select-all checkbox should select all items if none or some are selected.

- Clicking the select-all checkbox should de-select all items if all are currently selected.

- Status should be correctly formatted

- Clicking "Download Selected" when some or all items are displayed should generate an alert box with the path and device of all selected files.

- Precise/exact HTML formatting/styling to match the mockup is not required however rows should change colour when selected and on hover.



## How to run

### Running the example

1. Download the zip file
2. Install dependencies with `npm install`
3. Run example with `npm start` and view on http://localhost:3000/

### Running the tests

1. Run `npm test`
2. Press `a` to run all tests



## Thought process/Rationale:

- I decided to use React since that is a framework I am familiar with. I started with create-react-app to quickly get started up. I took out some of the default files and replaced it with code for this table component example.
- For this component, since the main objective is to download available files, I decided to disable the checkboxes for items that are not available. This way, the user cannot download files that aren't available. The logic in the download button will only be concerned with alerting with the available files rather than having to sort through all data and decide whether the item should be included or not. In the case where other buttons will be on here that will require the user to be able to select and unselect all the items displayed, we can refactor the `numberOfAvailableItems` to `numberOfItems`. 
- I created a separate File component that I can use to just populate with data we see in each row.
- The checked rows determine how the select-all checkbox is displayed, the logic and display of the download button, and the styling of the row itself. Because of that, it is the only state we need to track in this case.



## Future work

- Add more tests

  - Test that select-all checkbox and the text corresponding to it displays correctly for all states

  - Test that download button displays correctly and displays correct path/devices

    

Ways to extend the component:

- Resizing the columns
- Sorting column data
- Filtering data
