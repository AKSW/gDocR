# gDocR
A small configurable extension for Google Docs for encoding meta data user-friendly.

Beta Version for testing:

- open https://script.google.com
- overwrite the existing code in the Code.gs file with the code offered here
- create a new file by clicking File -> New -> HTML File, name it 'gDocR'
- go to Ressources -> Advanced Google Services and in the opening dialog activate 'Drive API', 'v2', click OK
- save all by pressing CTRL + SHIFT + S (or File -> save all)
- go to File -> Version Control and save as new Version

  - click Publish -> test as Add-on. 
  - in the opening Dialog, configure a new Test, select any Document, where you want to manipulate the Description, click 'save'
  - select this test with the radio button and click 'Test'
    
    - the opening Document offers you now a menupoint 'Add-Ons', click it, select 'aksw_gDocR' and 'Metadata'
    - now you can select or write Properties into the Menu and save or cancel it.
  
  - with the first use, the add on will create a spreadsheet with a config in it: 'gDocR_configFile'. You can look for that in your Drive and manipulate the menu options in there. A little help is in there as well.
  
Coming soon:
publishing in Googles Drive Add-ons Shop.
