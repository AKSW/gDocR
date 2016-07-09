//Pop up the metadata edit/display panel
//The document is created as a templated HTML document
function metadataView() {
  // Generate the HTML
  html= HtmlService
      .createTemplateFromFile('gDocR')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  //Pop up a panel and render the HTML describing the metadata form inside it
  DocumentApp.getUi().showModalDialog(html, 'Properties Data:');
}

//This function sets the document properties from the metadata form elements
function processMetadataForm(theForm) {
  var props=PropertiesService.getDocumentProperties()
  //Process each form element
  var description = "{";
  for (var item in theForm) {
    props.setProperty(item,theForm[item]);
    description += "\"" + item + "\":\"" + theForm[item] + "\",";
    Logger.log(item+':::'+theForm[item]);
  }
  var size = description.length;
  description = description.substring(0,size-1);
  description += "}";
  var id = DocumentApp.getActiveDocument().getId();
  DriveApp.getFileById(id).setDescription(description);

}

function killLastChraracter(input){
  var size = input.length;
  return input.substring(0,size-1);
}

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Metadata','metadataView')
      .addToUi();
}

function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

function createConfig(){
  var ssid = SpreadsheetApp.create("gDocR_configFile").getId();
  var sheet = SpreadsheetApp.openById(ssid);
  
  //var file = DriveApp.getFilesByName("gDocR_configFile").next();
  //var sheet = SpreadsheetApp.open(file);
  
  sheet.setFrozenRows(1);
  var values = [["categories","multiOptions","values...","Help: column A is for the Keys of the Properties, from Column C on, you can write as much Values for that keys as you like. If you have more than one Value, you must set the B column for that row to 1. you can leave the columns from c on empty, they will not appear in a dropdown menu. if there are no values in the whole line, in the menu will appear a text field where you are free to write any value you like"]];
  var range = sheet.getRange("A1:D1");
  range.setValues(values);
  
  values = [["type",1,"Bachelor Thesis","Master Thesis","Project","Dissertation"]];
  range = sheet.getRange("A2:F2");
  range.setValues(values);
  
  values = [["status",1,"open","assigned","closed","---"]];
  range = sheet.getRange("A3:F3");
  range.setValues(values);
  
  values = [["urgency",1,"high","normal","---"]];
  range = sheet.getRange("A4:E4");
  range.setValues(values);
  
  values = [["supervisor",0,""]];
  range = sheet.getRange("A5:C5");
  range.setValues(values);
  
  values = [["comment",0,""]];
  range = sheet.getRange("A6:C6");
  range.setValues(values);
  return DriveApp.getFilesByName("gDocR_configFile").next().getId();
}

function loadConfig(configFileId){
  var file = DriveApp.getFileById(configFileId);
  var sheet = SpreadsheetApp.open(file);
  var numRows = sheet.getLastRow();
  var numColumns = sheet.getLastColumn();
  var akswDocumentProperties = "{";
  //loading config File
  
  for (var i=0; i<numRows-1;i++){
    //rowContent = sheet.getSheetValues(startRow, startColumn, numRows, numColumns)
    rowContent = sheet.getSheetValues(i+2 , 1, 1, numColumns);
    
    var rowContentArray = rowContent.toString().split(',');
    akswDocumentProperties += "\"" + rowContentArray[0] + "\":";
    if(rowContentArray[1]==="1"){
      akswDocumentProperties += "[";
      for (var j=2 ; j < rowContentArray.length ; j++){
        if (rowContentArray[j]!=="") { akswDocumentProperties += "\"" + rowContentArray[j] + "\","; }
      }
      akswDocumentProperties = killLastChraracter(akswDocumentProperties);
      akswDocumentProperties += "],";
    } else {
      akswDocumentProperties += "\"" + rowContentArray[2] + "\",";
    }
  }
  akswDocumentProperties = killLastChraracter(akswDocumentProperties);
  akswDocumentProperties += "}";
  akswDocumentProperties = JSON.parse(akswDocumentProperties);
  return akswDocumentProperties;
}

function onInstall(e) {
  onOpen(e);
}

