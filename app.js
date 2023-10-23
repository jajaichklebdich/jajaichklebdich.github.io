// Überprüfe, ob der Browser Benachrichtigungen unterstützt
if ('Notification' in window) {
  // Erlaube Benachrichtigungen, wenn noch nicht erlaubt
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

// Funktion zum Auslösen des Alarms
function triggerAlarm() {
  var notification = new Notification('Uhrzeit', {
    body: 'Es ist Zeit für deinen Alarm!',
  });

  // Hier könntest du zusätzliche Aktionen hinzufügen, wenn die Benachrichtigung angeklickt wird, etc.
}

// Funktion zum Anzeigen der aktuellen Uhrzeit
function showTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Füge führende Nullen hinzu, wenn nötig
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  var timeString = hours + ':' + minutes + ':' + seconds;

  document.getElementById('time').textContent = timeString;

  // Beispiel: Alarm um 12:34 Uhr auslösen
  if (hours == 12 && minutes == 34 && seconds == 0) {
    triggerAlarm();
  }
}

// Aktualisiere die Uhrzeit alle 1000 ms (1 Sekunde)
setInterval(showTime, 1000);

// Initialisiere die Uhrzeit beim Laden der Seite
showTime();
