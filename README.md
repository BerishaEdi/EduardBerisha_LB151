# Projekt-Dokumentation

Berisha Eduard

| Datum | Version | Zusammenfassung                                              |
| ----- | ------- | ------------------------------------------------------------ |
| 6.02.2023 | 0.0.1   | Adminseite erstellt |
| 13.02.2023 | 0.0.2 | Firebase Konfigurieren, Datenbank und Authentifikation einrichten |
| 13.02.2023 | 0.0.3   | Admin Login mit Firebase eingerichtet |
| 20.02.2023 | 0.0.4   | Funktionalität für das Spiel erstellt. |
| 26.02.2023 | 0.0.4   | Leaderboard erstellt, Score wird in der Datenbank gespeichert und in der Rangliste ausgegeben | 
| 27.02.2023 | 1.0.0   | Bugs behoben |

# 0 Ihr Projekt

Ich habe React und Firebase genutzt, um das Spielprinzip der Sendung Glücksrad in diesem Projekt umzusetzen. Dieses Projekt dient als Leistungsbewertung für das Modul 151.

# 1 Analyse

* Tier 1 (Presentation): Wörte Raten Spiel, Adminseite und Login
* Tier 2 (Webserver): Eingaben Validieren
* Tier 3 (Application Server): Funktionalität des Glücksspiel
* Tier 4 (Dataserver): Benutzerdaten werden gespeichert für Leaderboard

# 2 Technologie

* Tier 1 (Presentation): React, HTML & CSS, js
* Tier 2 (Webserver): Firebase
* Tier 3 (Application Server): Firebase
* Tier 4 (Dataserver): Firestore

# 3 Datenbank

Die Datenbank in diesem Codebeispiel wird in Firebase gehostet. Die Firebase-Authentifizierung und -Datenbank werden über das firebase -Modul importiert und initialisiert.
Die Firestore-Datenbank ist als NoSQL-Datenbank aufgebaut und speichert Daten in Form von Dokumenten und Sammlungen. 
Das Interface zur Interaktion mit der Datenbank wird in diesem Beispiel durch die Verwendung von Firestore-API-Methoden wie get(), set(), update(), doc() und collection() bereitgestellt.

# 4.1 User Stories

| Nr | Verbindlichkeit | Typ  | Beschreibung                       |
| ---- | --------------- | ---- | ---------------------------------- |
| 1  | Muss | Funktional | Als Administrator möchte ich mich mit meinem Benutzernamen und Passwort anmelden können, um auf die geschützten Funktionen der Anwendung zugreifen zu können. | 
| 2  | Muss | Funktional | Als Administrator möchte ich die Möglichkeit haben, neue Phrasen und Rätselwörter zu erstellen, bestehende zu bearbeiten und zu löschen, um die Fragen und Rätsel des Spiels zu verwalten und zu aktualisieren. |
| 3  | Muss | Funktional | Als Administrator möchte ich in der Lage sein, Kategorien anzulegen und jedem Wort oder jeder Frage einer Kategorie zuzuordnen, um die Verwaltung der Spielfragen zu erleichtern. |
| 4  | Muss | Funktional | Als Administrator möchte ich in der Lage sein, einzelne Einträge der Highscore-Liste zu löschen, damit ich die Highscore-Liste verwalten kann. |
| 5  | Muss | Funktional | Als Kandidat/in möchte ich in der Lage sein, einen Namen einzugeben, damit dieser auf der Highscore-Liste angezeigt wird. |
| 6  | Muss | Funktional | Als Kandidat/in möchte ich jederzeit meinen Kontostand einsehen können, um über meine finanzielle Situation im Spiel informiert zu sein. |
| 7  | Muss | Funktional | Als Kandidat möchte ich jederzeit die Anzahl meiner verbleibenden Lebenspunkte sehen können, um zu wissen, wie viele falsche Antworten ich noch geben kann, bevor das Spiel vorbei ist. |
| 8  | Muss | Funktional | Als Kandidat möchte ich nachdem ich einen Buchstaben geraten habe, erfahren, ob dieser im Wort enthalten ist oder nicht, um meine weiteren Rateversuche besser planen zu können und mein Rätselraten zu verbessern. |
| 9  | Muss | Funktional |Als Kandidat möchte ich die Highscore-Liste nach Rang aufsteigend sortiert sehen, wobei der Rang durch die Höhe des Geldbetrags bestimmt wird, um zu wissen, wo ich im Vergleich zu anderen Spielern stehe. |
| 10  | Muss | Funktional | Als Spieler möchte ich keine wiederholten Rätselwörter oder Phrasen im Spiel haben, um eine abwechslungsreiche Erfahrung zu haben. |
| 11  | Muss | Funktional | Als Kandidat möchte ich die Möglichkeit haben, jederzeit das Spiel zu beenden und meinen aktuellen Gewinn in die Highscore-Liste zu übernehmen, oder das Spiel fortzusetzen, um einen höheren Gewinn zu erzielen. |
| 12 | Muss | Funktional |Als Kandidat möchte ich, das meine Spielrunden gezählt werden, um zu sehen wie viele Runden ich effektiv gebraucht habe um meine Geldsumme zu erspielen. |
| 13 | Muss | Rand | Als Administrator möchte ich eine bestimmte Anzahl von Wörtern und Fragen in das Spiel einfügen können, um sicherzustellen, dass genug Inhalt vorhanden ist, um das Spiel interessant und unterhaltsam zu machen |
 

# 4.2 Testfälle

| Tc-Nr | Vorbereitung | Eingabe  | Erwartete Ausgabe                       |
| ---- | --------------- | ---- | ---------------------------------- |
| 1.1  | Der Admin Account existiert | Email und Passwort | Weiterleitung zur Adminseite. | 
| 1.2  | Der Admin Account existiert | Neues Rätselwort Hinzugügen | Erfolgreiches Hinzufügen des Rätselwortes. |
| 1.4  | Highscoreliste enthätl Spielerdaten |  | Der Highscore wird gelöscht. |
| 1.5  | Das Spiel Starten | Den Namen eingeben | Der Name wird in der Datenbank gepseichert und im Leaderboard angezeigt. |
| 1.6  | Man befindet sich im Spiel | - | Der Kontostand wird dauerhaft auf dem neusten Stand angezeigt. |
| 1.7  | Man befindet sich im Spiel | - | Der Lebenstand wird dauerhaft auf dem neusten Stand angezeigt. |
| 1.9  | Man befindet sich auf der Leaderboardseite | - | Es wird der Leaderboard mit allen Spielern angezeigt nach Guthaben sortiert. |
| 1.11  | Man befindet sich im Spiel | Man drückt den Knopf auszahlen | Man wird auf die Startseite zurückgelitet und der Score wird im Leaderboard gezeigt |


# 5 Prototyp
Quiz-Seite:

![alt text](https://github.com/BerishaEdi/lb151/blob/master/quiz-gui.PNG)



Admin-Interface

![alt text](https://github.com/BerishaEdi/lb151/blob/master/Admin-gui.PNG)


# 6 Implementation

✍️ Halten Sie fest, wann Sie welche User Story bearbeitet haben

| User Story | Datum | Beschreibung |
| ---------- | ----- | ------------ |
| ...        |       |              |

# 7 Projektdokumentation

| US-№ | Erledigt? | Entsprechende Code-Dateien oder Erklärung |
| ---- | --------- | ----------------------------------------- |
| 1    | ja / nein |                                           |
| ...  |           |                                           |

# 8 Testprotokoll

✍️ Fügen Sie hier den Link zu dem Video ein, welches den Testdurchlauf dokumentiert.

| User Story | Datum | Beschreibung |
| ---- | ------| -------- |
| 1.1  | 13.02.2023 | erfolgreich implementiert |       
| 1.2  | 20.02.2023 | erfolgreich implementiert |
| 1.3  | ---- | implementation hat nicht funktioniert |       
| 1.4  | 20.02.2023 | teilweise implementiert |   
| 1.5  | 20.02.2023 | erfolgreich implementiert |       
| 1.6  | 13.02.2023 | erfolgreich implementiert |   
| 1.7  | 27.02.2023 | implementiert jedoch fehlerhaft |       
| 1.8  | 13.02.2023 | nicht implementiert |
| 1.9  | 27.02.2023 | erfolgreich implementiert |       
| 1.10 | 20.02.2023 | teilweise implementiert(es kann zwei mal das gleiche kommen) |  
| 1.11 | 20.02.2023 | erfolgreich implementiert |       
| 1.12 | 20.02.2023 | nicht implementiert |  
| 1.12 | 20.02.2023 | erfolgreich implementiert |

Fazit:
Die meisten Testfälle sind erfolgreich und das Grundprinzip des Spieles funktionert jedoch fehlen vereinzelte Funktionen im grossen und ganzen jedoch ist das Spiel anwendbar.

# 9 `README.md`

✍️ Beschreiben Sie ausführlich in einer README.md, wie Ihre Applikation gestartet und ausgeführt wird. Legen Sie eine geeignete Möglichkeit (Skript, Export, …) bei, Ihre Datenbank wiederherzustellen.

# 10 Allgemeines

- [ ] Ich habe die Rechtschreibung überprüft
- [ ] Ich habe überprüft, dass die Nummerierung von Testfällen und User Stories übereinstimmen
- [ ] Ich habe alle mit ✍️ markierten Teile ersetzt

