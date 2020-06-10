<div style="text-align:center"><img src="images/Banner_Cil.jpeg" /></div>

# Introduction
CircularLoopstation is a web application developed for musician and composers that aims to assist them in the visualization of complex polyrhythmic structures through the design of an innovative loopstation. The application comes with various controls and graphic features that give to the user a large number of possibilities in the construction of his own loop.

The application is developed by Gioele Greco and Luca Torelli, as part of the Advanced Coding Tools & Methodologies course at Politecnico di Milano, Italy.

- CircularLoopstation is available at: https://circloopstation.surge.sh/
- Link to CodePen: https://codepen.io/Torelli/pen/mdVVwpp

# Behind the concept
Everyone says "music is made of rhythmic sound", so what is rhythm?

Rhythm in music is characterized by a repeating sequence of stressed (strong) and unstressed (weak) beats, and it's divided into bars organized by time signature and tempo indications.

Time signature is a notational convention used to specify how many beats are contained in each measure, and which note value is equivalent to a beat.
Tempo indication denotes how long is the beat distance. It's defined in beat per minutes and tipically it is associated to the ♩ (1/4). *(For example ♩=60bpm means that there is 1 ♩ every second)*

Time signature, normally, is based on fraction of 2 or 3. It's common to read on partitures quavers, triplets (3 notes played in the time of 2 equivalent notes), or multiple and submultiples of 2 and 3.

Since XX century, expecially in contempourary music and following in jazz and other genres, the composers decides to use more complex rhythms, like 13/16 or 7/13 and so on, played simultaneously. This to create an extraordinary exotic effect of cycles in cycles that can create changing harmonies with the same material. Today this technique is well known to mathphilus composers, who write their music without be anchored to the same metric subdivision.

This composing technique is called ***"polyrhythmic"*** and its meter is called polymeter.

# The loopstation
CircularLoopstation allows the visualization of the rythmic structure thanks to a clock-like graphic component that follows the progression of the loop and shows the alternation of all the audio tracks that have been uploaded into the loop. The loopstation is designed to be able to manage and visualize different signatures and durations at the same time, ensuring a simple but powerful understanding of the underlying structure of the cycle.

## Graphic components
### The Circle

### Control box

### Lateral panel
<img align="left" width = "150" src="images/Screenshot (201).png" />
 
 The lateral panel is the upload section, it is composed, from the top to the bottom, by:
 
 - Title (<ins>"Saved Tracks"</ins>): by clicking on it the GDrive folder that contains all the stored traks will be opened,
 - Tracks container: in this section there are all the tracks stored in Firebase, on mouse on will appear below all the rhythm       information about the selected track. When user uploads any tracks by "load files" section, the corrisponding button will change color, and on click it will import the trak in the Circle.
 -Info section: contains data messages of the selected track,
 -Load files: input that allow the user to import external files,
 -Instruction section: contains istructions about loading and advanced settings.

### Audio banners

## Tracks management
The application provides two ways for importing an audio track into the loop:

### Audio recording
The first tool that have been developed for the creation of an audio track is a simple audio recorder. The user can choose all the parameters that are necessary to compute the length of the recording (time signature, bpm, number of measures) by setting their values into the control box. Then, when the button "Record" is clicked, a metronome will start beating inside the control box according with the time settings chosen by the user. A colored circular crown sector will also appear around the clock-like structure, indicating the contribution of the recorded track to the whole loop.

After two beating measures, the recording session will start, announced by the indicator light that will turn red. The recording session will end by itself once reached the computed recording length. The user can stop the recording at any moment by pressing the "esc" button.

As the registration is ended, the application asks to the user to set a name for the recorded sound clip. After that, the audio clip will be visible as a colored banner beneath the control box.

This system allows the user to record a lot of different tracks and to visualize their superposition by simply looking at the graphic clock-like component.

### Uploading from database
CircularLoopstation can also import files into the loopstation from a database, that can be enlarged by every user by uploading tracks with the "Load on Firebase" button.

How can I import files in CircularLoopstation? *(Instructions are in the side panel)*

- Click on "Saved Traks" and download the GDrive folder or single files.

- Unzip the folder and upload it using "select file".

- If the upload is successful, the matching buttons will change color.

- Click on the track button and upload it on the Loopstation!

How can I load files into the database? *(Instructions appear into the control box)*

By clicking on the "Load on Firebase" button, the user can download the selected track and upload it on the database through the GDrive window that will appear. This way, he can both share its recordings with other users and store the files locally on his computer.

The files stored in the database are managed by the administrator, and can be deleted after some days if they are no more used.

However, it's not possible to import every kind of file into the loop, because the application, to work well, needs some parameters like duration, time signature and bpm. To do so, the trick is to record a track with the same file name and the correct parameters, click on "Load on Firebase", and upload the desired file instead of the recording. 

# Comments

## Further developements
