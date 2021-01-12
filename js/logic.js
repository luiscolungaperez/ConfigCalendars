const $download = document.getElementById('download');
const zip = new JSZip();
cal = ics();

(async () => {
  try {
    const response = await fetch('../data.json');
    const data = await response.json();
    let calendars = [];
    
    data.map(result => {
      result.promotor.map(item => {
        calendars = [...calendars, item];
      });
    });

    $download.addEventListener('click', ()=> {
      calendars.map(calendar => {
        zip.file(`${calendar.name}.ics`, cal.addEvent(calendar.name, calendar.description, calendar.place, `${calendar.start} 12:00`, `${calendar.end} 13:00`));
      });

      zip.generateAsync({ type: 'blob'})
        .then((content) => {
          saveAs(content, 'Calendarios.zip');
        });
      
    });

  } catch (error) {
    console.error(error);
  }
})();
